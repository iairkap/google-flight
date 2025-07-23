// src/components/FlightResults.tsx
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    CircularProgress,
    Alert
} from '@mui/material';
import {
    Flight,
    Schedule,
    AccessTime,
    AttachMoney
} from '@mui/icons-material';
import { useFlightStore } from '@/store/flightStore';

const FlightResults = () => {
    const { results, isLoading, error } = useFlightStore();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '200px'
                }}
            >
                <CircularProgress size={40} />
                <Typography sx={{ ml: 2 }}>Searching for flights...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    if (results.length === 0) {
        return null; // Don't show anything if no search has been made
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Flight Results ({results.length} found)
            </Typography>

            {results.map((flight) => (
                <Card
                    key={flight.id}
                    sx={{
                        mb: 2,
                        '&:hover': {
                            boxShadow: 3,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease'
                        }
                    }}
                >
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            {/* Flight Info */}
                            <Box sx={{ flex: 1 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Flight sx={{ mr: 1, color: '#666' }} />
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {flight.airline}
                                    </Typography>
                                    <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
                                        {flight.flightNumber}
                                    </Typography>
                                </Box>

                                {/* Departure and Arrival */}
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Schedule sx={{ mr: 0.5, fontSize: 16, color: '#666' }} />
                                        <Typography variant="body2">
                                            {flight.departure.time} ({flight.departure.airport})
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ mx: 2, color: '#666' }}>→</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Schedule sx={{ mr: 0.5, fontSize: 16, color: '#666' }} />
                                        <Typography variant="body2">
                                            {flight.arrival.time} ({flight.arrival.airport})
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Duration and Stops */}
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <AccessTime sx={{ mr: 0.5, fontSize: 16, color: '#666' }} />
                                        <Typography variant="body2" color="textSecondary">
                                            {flight.duration}
                                        </Typography>
                                    </Box>
                                    <Chip
                                        label={flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
                                        size="small"
                                        color={flight.stops === 0 ? 'success' : 'default'}
                                        variant="outlined"
                                    />
                                </Box>
                            </Box>

                            {/* Price and Book Button */}
                            <Box sx={{ textAlign: 'right', minWidth: 120 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 1 }}>
                                    <AttachMoney sx={{ color: '#1976d2', fontSize: 20 }} />
                                    <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2' }}>
                                        {flight.price}
                                    </Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{
                                        borderRadius: '20px',
                                        textTransform: 'none',
                                        fontWeight: 600
                                    }}
                                >
                                    Select
                                </Button>
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            ))}
        </Box>
    );
};

export default FlightResults;
