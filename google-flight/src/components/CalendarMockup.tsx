import { Box, Paper } from '@mui/material';
import { COLORS } from '@/constants/styles';

const CalendarMockup: React.FC = () => {
    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                borderRadius: 2,
                backgroundColor: '#f8f9fa',
                border: `1px solid ${COLORS.border.light}`,
                maxWidth: 400,
                mx: 'auto'
            }}
        >
            {/* Header row with icons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box
                    sx={{
                        width: 40,
                        height: 40,
                        backgroundColor: '#e3f2fd',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Box
                        sx={{
                            width: 16,
                            height: 16,
                            backgroundColor: '#1976d2',
                            borderRadius: '2px'
                        }}
                    />
                </Box>
                <Box sx={{ flex: 1, mx: 2 }}>
                    <Box
                        sx={{
                            height: 12,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 1,
                            mb: 1
                        }}
                    />
                    <Box
                        sx={{
                            height: 8,
                            backgroundColor: '#e0e0e0',
                            borderRadius: 1,
                            width: '70%'
                        }}
                    />
                </Box>
            </Box>

            {/* Calendar grid */}
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 1 }}>
                {Array.from({ length: 35 }, (_, index) => {
                    const isGreenStar = [5, 19, 26].includes(index);
                    const isRedX = [8, 15].includes(index);

                    return (
                        <Box
                            key={index}
                            sx={{
                                width: 32,
                                height: 32,
                                border: `1px solid ${COLORS.border.light}`,
                                borderRadius: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'white'
                            }}
                        >
                            {isGreenStar && (
                                <Box
                                    sx={{
                                        width: 16,
                                        height: 16,
                                        backgroundColor: '#4caf50',
                                        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                                    }}
                                />
                            )}
                            {isRedX && (
                                <Box
                                    sx={{
                                        color: '#f44336',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    ×
                                </Box>
                            )}
                        </Box>
                    );
                })}
            </Box>
        </Paper>
    );
};

export default CalendarMockup;
