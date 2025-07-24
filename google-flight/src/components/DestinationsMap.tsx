// src/components/DestinationsMap.tsx
import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Typography } from '@mui/material';
import L, { LatLngBounds } from 'leaflet';
import { useFlightStore } from '@/store/flightStore';
import type { FavoriteDestination } from '@/store/flightStore';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

// Componente para ajustar automáticamente el zoom del mapa
const FitBoundsToMarkers: React.FC<{ destinations: FavoriteDestination[]; userLocation?: { coordinates?: [number, number] } | null }> = ({ destinations, userLocation }) => {
    const map = useMap();

    useEffect(() => {
        if (destinations.length > 0) {
            const allCoordinates = destinations.map(dest => dest.coordinates as [number, number]);

            // Agregar la ubicación del usuario si está disponible
            if (userLocation?.coordinates) {
                allCoordinates.push(userLocation.coordinates);
            }

            const bounds = new LatLngBounds(allCoordinates);
            map.fitBounds(bounds, { padding: [50, 50] }); // Más padding para mejor vista
        }
    }, [destinations, userLocation, map]);

    return null;
};

// Icono personalizado para los marcadores (estilo Google Flights)
const createCustomIcon = (price?: number) => {
    const priceText = price ? `$${price}` : '';

    return L.divIcon({
        html: `
      <div style="
        background: #1976d2;
        color: white;
        border-radius: 20px;
        width: ${priceText ? '60px' : '20px'};
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 500;
        font-family: 'Google Sans', Roboto, Arial, sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        border: 2px solid white;
      ">
        ${priceText}
      </div>
    `,
        className: 'custom-marker',
        iconSize: [priceText ? 60 : 20, 20],
        iconAnchor: [priceText ? 30 : 10, 20],
    });
};

interface DestinationsMapProps {
    height?: string;
    showPrices?: boolean;
}

const DestinationsMap: React.FC<DestinationsMapProps> = ({
    height = '400px',
    showPrices = false
}) => {
    const { favoriteDestinations, userLocation } = useFlightStore();
    const mapRef = useRef<L.Map>(null);
    const getRandomPrice = () => Math.floor(Math.random() * 800) + 200;

    const getMapCenter = (): [number, number] => {
        if (userLocation?.coordinates) {
            return userLocation.coordinates;
        }
        return [-34.6118, -58.3960];
    };

    return (
        <Box sx={{ width: '100%', height, padding: "0 16px" }}>
            <Box sx={{ width: 'calc(100% - 32px)', height: '100%', borderRadius: 2, overflow: 'hidden' }}>
                <MapContainer
                    ref={mapRef}
                    center={getMapCenter()} // Centrado en la ubicación del usuario o Buenos Aires
                    zoom={3} // Zoom más lejano para mostrar más área
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                    zoomControl={true}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Ajustar automáticamente el zoom para mostrar todos los marcadores */}
                    <FitBoundsToMarkers destinations={favoriteDestinations} userLocation={userLocation} />

                    {/* Marcadores para destinos favoritos */}
                    {favoriteDestinations.map((destination) => (
                        <Marker
                            key={destination.id}
                            position={destination.coordinates as [number, number]}
                            icon={createCustomIcon(showPrices ? getRandomPrice() : undefined)}
                        >
                            <Popup>
                                <Box sx={{ minWidth: 200 }}>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                                            fontWeight: 500,
                                            mb: 1,
                                        }}
                                    >
                                        {destination.city}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                                            mb: 1,
                                        }}
                                    >
                                        {destination.country}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                                            fontSize: '0.875rem',
                                        }}
                                    >
                                        {destination.description}
                                    </Typography>
                                    {showPrices && (
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                                                fontWeight: 600,
                                                color: '#1976d2',
                                                mt: 1,
                                            }}
                                        >
                                            desde ${getRandomPrice()}
                                        </Typography>
                                    )}
                                </Box>
                            </Popup>
                        </Marker>
                    ))}

                    {/* Marcador para ubicación del usuario (si está disponible) */}
                    {userLocation && (
                        <Marker
                            position={
                                userLocation.coordinates ||
                                (userLocation.city === 'Buenos Aires' ? [-34.6118, -58.3960] : [0, 0])
                            }
                            icon={L.divIcon({
                                html: `
                <div style="
                  background: #ff5722;
                  color: white;
                  border-radius: 50%;
                  width: 16px;
                  height: 16px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 10px;
                  font-weight: bold;
                  border: 2px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                ">
                  📍
                </div>
              `,
                                className: 'user-location-marker',
                                iconSize: [16, 16],
                                iconAnchor: [8, 16],
                            })}
                        >
                            <Popup>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                                    }}
                                >
                                    Tu ubicación: {userLocation.city}, {userLocation.country}
                                </Typography>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </Box>
        </Box>
    );
};

export default DestinationsMap;
