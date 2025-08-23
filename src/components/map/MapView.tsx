"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getOSMTileConfig } from "@/utils/osmUtils";

// Import Leaflet CSS
import "leaflet/dist/leaflet.css";

// Dynamically import Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Location {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface LocationInfo {
  city?: string;
  state?: string;
  country?: string;
  address?: string;
}

interface OSMConfig {
  tile_url: string;
  attribution: string;
  maxZoom: number;
  subdomains?: string[];
}

export default function MapView() {
  const [osmConfig, setOsmConfig] = useState<OSMConfig | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    const loadMapData = async () => {
      try {
        setLoading(true);
        
        // Load OSM tile configuration
        const config = await getOSMTileConfig();
        setOsmConfig(config);
        setLoading(false);
      } catch (err) {
        console.error('Error loading map data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load map data');
        setLoading(false);
      }
    };

    loadMapData();
  }, []);

  // Set map as ready after component mounts and fix Leaflet icon issue
  useEffect(() => {
    const timer = setTimeout(() => {
      // Fix Leaflet default icon issue
      if (typeof window !== 'undefined') {
        import('leaflet').then((L) => {
          delete L.default.Icon.Default.prototype._getIconUrl;
          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
          });
        });
      }
      setMapReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    try {
      console.log('Requesting geolocation...');
      
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        const successCallback = (position: GeolocationPosition) => {
          console.log('Geolocation success:', position);
          resolve(position);
        };
        
        const errorCallback = (error: GeolocationPositionError) => {
          console.log('Geolocation error:', error);
          reject(error);
        };
        
        const options = {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        };
        
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
      });

      const location: Location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        accuracy: position.coords.accuracy
      };

      console.log('Location obtained:', location);
      setUserLocation(location);
      
      // Get location information using reverse geocoding
      await getLocationInfo(location);
      
    } catch (err) {
      console.error('Error getting location:', err);
      console.error('Error type:', typeof err);
      console.error('Error constructor:', (err as Error)?.constructor?.name);
      console.error('Error message:', (err as Error)?.message);
      console.error('Error code:', (err as GeolocationPositionError)?.code);
      
      if (err instanceof GeolocationPositionError) {
        console.log('Handling GeolocationPositionError...');
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setLocationError('Location permission denied. Please enable location access in your browser settings.');
            break;
          case err.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable. Please check your device location settings.');
            break;
          case err.TIMEOUT:
            setLocationError('Location request timed out. Please try again.');
            break;
          default:
            setLocationError(`Geolocation error (code ${err.code}): ${err.message || 'Unknown error'}`);
        }
      } else if (err && typeof err === 'object' && 'code' in err) {
        // Handle other geolocation-like errors
        const errorCode = (err as GeolocationPositionError).code;
        const errorMessage = (err as GeolocationPositionError).message || 'Unknown geolocation error';
        
        switch (errorCode) {
          case 1:
            setLocationError('Location permission denied. Please enable location access.');
            break;
          case 2:
            setLocationError('Location information unavailable.');
            break;
          case 3:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError(`Location error: ${errorMessage}`);
        }
      } else {
        // Generic error handling
        const errorMessage = err instanceof Error ? err.message : 'Failed to get current location';
        setLocationError(`Location error: ${errorMessage}`);
      }
    } finally {
      setLocationLoading(false);
    }
  };

  const getLocationInfo = async (location: Location) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.latitude}&lon=${location.longitude}&zoom=10&addressdetails=1`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch location info');
      }

      const data = await response.json();
      const address = data.address;
      
      setLocationInfo({
        city: address.city || address.town || address.village,
        state: address.state,
        country: address.country,
        address: data.display_name
      });
    } catch (err) {
      console.error('Error getting location info:', err);
      // Don't set error here as we still have coordinates
    }
  };

  const requestLocationPermission = () => {
    getCurrentLocation();
  };

  // Default location (Jodhpur, India)
  const defaultLocation = [26.3, 73.0];
  const currentLocation = userLocation 
    ? [userLocation.latitude, userLocation.longitude] 
    : defaultLocation;

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-red-600">
        <p>Error loading map: {error}</p>
      </div>
    </div>
  );
  
  if (!osmConfig) return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center text-gray-600">
        <p>No map configuration available</p>
      </div>
    </div>
  );

  return (
    <div className="h-full w-full flex flex-col">
      {/* Location Controls */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <span className="mr-2">📍</span>
          Your Location
        </h3>
        
        {!userLocation && !locationLoading && !locationError && (
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">
              Get your current location to see it on the map and determine your locality.
            </p>
            <div className="bg-blue-50 p-2 rounded border border-blue-200 mb-2">
              <p className="text-xs text-blue-800">
                💡 <strong>Tip:</strong> Make sure location permissions are enabled in your browser settings. 
                If you&apos;re using HTTPS, location access should work automatically.
              </p>
            </div>
            <button
              onClick={requestLocationPermission}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              📍 Get My Location
            </button>
          </div>
        )}

        {locationLoading && (
          <div className="mb-3">
            <p className="text-sm text-green-600">🔄 Getting your location...</p>
          </div>
        )}

        {locationError && (
          <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600 mb-2">⚠️ {locationError}</p>
            <div className="flex gap-2">
              <button
                onClick={requestLocationPermission}
                className="px-3 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => {
                  setLocationError(null);
                  setUserLocation({ latitude: 26.3, longitude: 73.0 });
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 transition-colors"
              >
                Use Default Location
              </button>
            </div>
          </div>
        )}

        {userLocation && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">📍 Current Location</h4>
            
            <div className="text-sm text-gray-700 mb-2">
              <p><strong>Coordinates:</strong> {userLocation.latitude.toFixed(6)}, {userLocation.longitude.toFixed(6)}</p>
              {userLocation.accuracy && (
                <p><strong>Accuracy:</strong> ±{Math.round(userLocation.accuracy)} meters</p>
              )}
            </div>

            {locationInfo && (
              <div className="bg-blue-50 p-2 rounded border border-blue-200">
                <h5 className="font-medium text-blue-900 mb-1">📍 Location Details</h5>
                {locationInfo.city && (
                  <p className="text-xs text-blue-800"><strong>City:</strong> {locationInfo.city}</p>
                )}
                {locationInfo.state && (
                  <p className="text-xs text-blue-800"><strong>State:</strong> {locationInfo.state}</p>
                )}
                {locationInfo.country && (
                  <p className="text-xs text-blue-800"><strong>Country:</strong> {locationInfo.country}</p>
                )}
              </div>
            )}

            <button
              onClick={requestLocationPermission}
              className="mt-2 px-3 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 transition-colors"
            >
              🔄 Refresh Location
            </button>
          </div>
        )}
      </div>

      {/* Map Container */}
      <div className="flex-1 relative">
        {mapReady ? (
          <MapContainer
            center={currentLocation as [number, number]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            className="z-10"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {userLocation && (
              <Marker position={[userLocation.latitude, userLocation.longitude]}>
                <Popup>
                  <div>
                    <h3 className="font-semibold">📍 Your Location</h3>
                    <p className="text-sm">
                      {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
                    </p>
                    {locationInfo?.city && (
                      <p className="text-sm text-gray-600">{locationInfo.city}</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            )}
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>

      {/* Map Status */}
      <div className="bg-white border-t border-gray-200 p-2">
        <p className="text-xs text-gray-500 text-center">
          {userLocation ? (
            <>📍 Your location: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}</>
          ) : (
            <>📍 Default location: Jodhpur, India (26.3, 73.0)</>
          )}
        </p>
      </div>
    </div>
  );
}
