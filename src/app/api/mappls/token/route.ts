import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Mock response for Mappls token
    // In a real implementation, this would fetch from Mappls API
    const mockToken = {
      access_token: process.env.NEXT_PUBLIC_MAPPLS_MAP_KEY || 'mock_token',
      expires_in: 3600,
      token_type: 'Bearer'
    };
    
    return NextResponse.json(mockToken);
  } catch (error) {
    console.error('Error in Mappls token API route:', error);
    return NextResponse.json(
      { error: 'Failed to get Mappls token' },
      { status: 500 }
    );
  }
}
