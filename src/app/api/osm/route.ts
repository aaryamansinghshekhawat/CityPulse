import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'tiles';

    switch (type) {
      case 'tiles':
        // Return OSM tile configuration for the map component
        const osmConfig = {
          tile_url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19,
          subdomains: ['a', 'b', 'c']
        };
        return NextResponse.json(osmConfig);

      case 'capabilities':
        // Fetch OSM API capabilities
        const response = await fetch("https://api.openstreetmap.org/api/0.6/capabilities", {
          method: "GET",
          headers: {
            "Content-Type": "application/xml"
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch OSM capabilities: ${response.status}`);
        }

        const capabilities = await response.text();
        return NextResponse.json({ capabilities });

      case 'overpass':
        // For complex queries, you might want to use Overpass API
        const overpassUrl = "https://overpass-api.de/api/interpreter";
        return NextResponse.json({ 
          overpass_url: overpassUrl,
          note: "Use POST requests with Overpass QL queries to this endpoint"
        });

      default:
        return NextResponse.json(
          { error: 'Invalid type parameter. Use: tiles, capabilities, or overpass' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error in OSM API route:', error);
    return NextResponse.json(
      { error: 'Failed to load OSM configuration', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Handle POST requests for Overpass queries
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    if (type === 'overpass') {
      const body = await request.text();
      
      const response = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `data=${encodeURIComponent(body)}`
      });

      if (!response.ok) {
        throw new Error(`Overpass API error: ${response.status}`);
      }

      const data = await response.json();
      return NextResponse.json(data);
    }

    return NextResponse.json(
      { error: 'POST requests only supported for overpass queries' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in OSM API POST route:', error);
    return NextResponse.json(
      { error: 'Failed to process OSM query', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
