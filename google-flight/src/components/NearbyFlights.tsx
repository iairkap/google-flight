// src/components/NearbyFlights.tsx
import React, { useEffect } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    Button,
    CircularProgress,
    Alert,
    Chip,
} from '@mui/material';
import { Flight, LocationOn } from '@mui/icons-material';
import { useFlightStore } from '@/store/flightStore';

const NearbyFlights: React.FC = () => {
    const {
        nearbyFlights,
        isLoadingNearby,
        nearbyError,
        searchNearbyFlights
    } = useFlightStore();

    useEffect(() => {
        // Load nearby flights on component mount
        searchNearbyFlights();
    }, [searchNearbyFlights]);

    if (isLoadingNearby) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: 200,
                flexDirection: 'column',
                gap: 2
            }}>
                <CircularProgress />
                <Typography color="text.secondary">
                    Searching for nearby flights...
                </Typography>
            </Box>
        );
    }

    if (nearbyError) {
        return (
            <Alert severity="error" sx={{ mb: 2 }}>
                {nearbyError}
            </Alert>
        );
    }

    if (nearbyFlights.length === 0) {
        return (
            <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="h6" color="text.secondary">
                    No nearby flights found
                </Typography>
                <Button
                    onClick={searchNearbyFlights}
                    sx={{ mt: 2 }}
                    startIcon={<Flight />}
                >
                    Search Again
                </Button>
            </Box>
        );
    }

    return (
        <Box>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 3,
                justifyContent: 'space-between'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOn color="primary" />
                    <Typography variant="h5" fontWeight="600">
                        Explore destinations from your area
                    </Typography>
                </Box>
                <Button
                    onClick={searchNearbyFlights}
                    size="small"
                    startIcon={<Flight />}
                >
                    Refresh
                </Button>
            </Box>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 2
            }}>
                {nearbyFlights.map((flight) => (
                    <Card
                        key={flight.id}
                        sx={{
                            height: '100%',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 3,
                            },
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        {flight.imageUrl && (
                            <Box
                                component="img"
                                src={flight.imageUrl}
                                alt={flight.destination}
                                sx={{
                                    width: '100%',
                                    height: 150,
                                    objectFit: 'cover',
                                    borderRadius: '4px 4px 0 0',
                                }}
                            />
                        )}
                        <CardContent>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="h6" fontWeight="600" gutterBottom>
                                    {flight.destination}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {flight.airline}
                                </Typography>
                            </Box>

                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                mt: 2
                            }}>
                                <Box>
                                    <Typography variant="h6" color="primary" fontWeight="700">
                                        ${flight.price}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        per person
                                    </Typography>
                                </Box>

                                <Chip
                                    label="Today"
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                />
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                sx={{
                                    mt: 2,
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    '&:hover': {
                                        backgroundColor: 'primary.main',
                                        color: 'white',
                                    }
                                }}
                                startIcon={<Flight />}
                            >
                                Select Flight
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default NearbyFlights;
