// src/components/RecommendedFlightCard.tsx
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';
import type { RecommendedFlight } from '@/hooks/useRecommendedFlights';

interface RecommendedFlightCardProps {
    flight: RecommendedFlight;
    onClick?: (flight: RecommendedFlight) => void;
}

const RecommendedFlightCard = ({ flight, onClick }: RecommendedFlightCardProps) => {
    const handleClick = () => {
        if (onClick) {
            onClick(flight);
        }
    };

    // Generar stops aleatorios para demo (esto se podría mover al hook después)
    const stops = Math.random() > 0.5 ? Math.floor(Math.random() * 3) + 1 : 0;
    const stopsText = stops === 0 ? 'Nonstop' : stops === 1 ? '1 stop' : `${stops} stops`;

    return (
        <Card
            onClick={handleClick}
            sx={{
                height: '100%',
                cursor: 'pointer',
                borderRadius: 2,
                overflow: 'hidden',
                boxShadow: 'none',
                width: "100%",
                '@media (max-width: 768px)': {
                    display: 'flex',
                    flexDirection: 'row',
                    height: 'auto'
                }
            }}
        >
            <CardMedia
                component="img"
                height="105"
                image={flight.destination.image}
                alt={flight.destination.city}
                sx={{
                    objectFit: 'cover',
                    borderRadius: '16px',
                    margin: '8px 8px 0 8px',
                    width: 'calc(100% - 16px)',
                    '@media (max-width: 768px)': {
                        width: '40%',
                        height: '120px',
                        margin: '8px',
                        flexShrink: 0
                    }
                }}
            />
            <CardContent sx={{
                p: 2,
                paddingTop: '16px',
                '@media (max-width: 768px)': {
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '16px 16px 16px 0'
                }
            }}>
                {/* Primera fila: Destino y Precio */}
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        mb: "4px"


                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: '"Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: '16px',
                            fontWeight: 500,
                            letterSpacing: '0.1px',
                            lineHeight: '20px',
                            color: '#202124'
                        }}
                    >
                        {flight.destination.city}
                    </Typography>

                    <Typography
                        sx={{
                            fontFamily: '"Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
                            fontSize: '16px',
                            fontWeight: 500,
                            letterSpacing: '0.1px',
                            lineHeight: '20px',
                            color: '#202124'
                        }}
                    >
                        ${flight.price}
                    </Typography>
                </Box>

                {/* Segunda fila: Fechas */}
                <Typography
                    sx={{
                        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        letterSpacing: '0.2px',
                        lineHeight: '20px',
                        color: '#5f6368',
                        mb: "4px"
                    }}
                >
                    {flight.dateRange}
                </Typography>

                {/* Tercera fila: Stops y Duración */}
                <Typography
                    sx={{
                        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontSize: '14px',
                        fontWeight: 400,
                        letterSpacing: '0.2px',
                        lineHeight: '20px',
                        color: '#5f6368',
                        mb: "4px"
                    }}
                >
                    {stopsText} • {flight.flightDuration}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default RecommendedFlightCard;
