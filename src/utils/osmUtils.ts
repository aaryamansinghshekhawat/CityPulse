// OSM Utility Functions for CityPulse

export interface OSMNode {
  id: number;
  lat: number;
  lon: number;
  tags?: Record<string, string>;
}

export interface OSMWay {
  id: number;
  nodes: number[];
  tags?: Record<string, string>;
}

export interface OSMRelation {
  id: number;
  members: Array<{
    type: 'node' | 'way' | 'relation';
    ref: number;
    role: string;
  }>;
  tags?: Record<string, string>;
}

export interface OSMData {
  elements: Array<OSMNode | OSMWay | OSMRelation>;
}

// Simple GeoJSON type definitions to avoid external dependencies
interface GeoJSONFeature {
  type: 'Feature';
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon';
    coordinates: number[] | number[][] | number[][][];
  };
  properties: Record<string, string | number | boolean | undefined>;
}

interface GeoJSONFeatureCollection {
  type: 'FeatureCollection';
  features: GeoJSONFeature[];
}

// Common Overpass queries for city data
export const OVERPASS_QUERIES = {
  // Get all roads in a bounding box
  roads: (bbox: string) => `
    [out:json][timeout:25];
    (
      way["highway"~"^(motorway|trunk|primary|secondary|tertiary|residential|service)$"](${bbox});
    );
    out body;
    >;
    out skel qt;
  `,

  // Get all buildings in a bounding box
  buildings: (bbox: string) => `
    [out:json][timeout:25];
    (
      way["building"](${bbox});
    );
    out body;
    >;
    out skel qt;
  `,

  // Get traffic signals and signs
  trafficSignals: (bbox: string) => `
    [out:json][timeout:25];
    (
      node["highway"="traffic_signals"](${bbox});
      node["traffic_sign"](${bbox});
    );
    out body;
  `,

  // Get public transport stops
  publicTransport: (bbox: string) => `
    [out:json][timeout:25];
    (
      node["public_transport"](${bbox});
      node["highway"="bus_stop"](${bbox});
    );
    out body;
  `,

  // Get road closures and construction
  roadClosures: (bbox: string) => `
    [out:json][timeout:25];
    (
      way["highway"]["access"="no"](${bbox});
      way["highway"]["construction"](${bbox});
      way["highway"]["barrier"](${bbox});
    );
    out body;
    >;
    out skel qt;
  `
};

// Helper function to create bounding box string
export function createBoundingBox(
  south: number,
  west: number,
  north: number,
  east: number
): string {
  return `${south},${west},${north},${east}`;
}

// Helper function to fetch OSM data using Overpass API
export async function fetchOSMData(query: string): Promise<OSMData> {
  const response = await fetch('/api/osm?type=overpass', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: query,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch OSM data: ${response.status}`);
  }

  return response.json();
}

// Helper function to get roads in a specific area
export async function getRoadsInArea(
  south: number,
  west: number,
  north: number,
  east: number
): Promise<OSMData> {
  const bbox = createBoundingBox(south, west, north, east);
  const query = OVERPASS_QUERIES.roads(bbox);
  return fetchOSMData(query);
}

// Helper function to get traffic signals in an area
export async function getTrafficSignalsInArea(
  south: number,
  west: number,
  north: number,
  east: number
): Promise<OSMData> {
  const bbox = createBoundingBox(south, west, north, east);
  const query = OVERPASS_QUERIES.trafficSignals(bbox);
  return fetchOSMData(query);
}

// Helper function to get road closures in an area
export async function getRoadClosuresInArea(
  south: number,
  west: number,
  north: number,
  east: number
): Promise<OSMData> {
  const bbox = createBoundingBox(south, west, north, east);
  const query = OVERPASS_QUERIES.roadClosures(bbox);
  return fetchOSMData(query);
}

// Helper function to convert OSM data to GeoJSON format
export function osmToGeoJSON(osmData: OSMData): GeoJSONFeatureCollection {
  const features: GeoJSONFeature[] = [];

  osmData.elements.forEach((element) => {
    if ('lat' in element && 'lon' in element) {
      // Node
      features.push({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [element.lon, element.lat],
        },
        properties: {
          id: element.id,
          type: 'node',
          ...element.tags,
        },
      });
    } else if ('nodes' in element) {
      // Way - simplified as line (you'd need to resolve node coordinates)
      features.push({
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: [], // Would need to resolve node coordinates
        },
        properties: {
          id: element.id,
          type: 'way',
          ...element.tags,
        },
      });
    }
  });

  return {
    type: 'FeatureCollection',
    features,
  };
}

// Helper function to get OSM tile configuration
export async function getOSMTileConfig() {
  const response = await fetch('/api/osm?type=tiles');
  if (!response.ok) {
    throw new Error(`Failed to fetch OSM tile config: ${response.status}`);
  }
  return response.json();
}
