import { Box, Typography, IconButton } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useRef, useState } from 'react';
import { getPopularDestinations } from '@/utils/mockFlightData';
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from '@/constants/styles';

const PopularDestinations: React.FC = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);
    const destinations = getPopularDestinations();

    const handleWheel = (e: React.WheelEvent) => {
        if (scrollRef.current) {
            e.preventDefault();
            scrollRef.current.scrollLeft += e.deltaY;
            updateArrowVisibility();
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            setTimeout(updateArrowVisibility, 300);
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            setTimeout(updateArrowVisibility, 300);
        }
    };

    const updateArrowVisibility = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 0);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
        }
    };

    const handleScroll = () => {
        updateArrowVisibility();
    };

    return (
        <Box sx={{ width: '100%', py: 6, px: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
                variant="h4"
                sx={{
                    fontFamily: GOOGLE_FONTS.primary,
                    fontSize: TYPOGRAPHY.fontSizes.xl,
                    fontWeight: TYPOGRAPHY.fontWeights.medium,
                    color: COLORS.text.primary,
                    mb: 4,
                    textAlign: 'left'
                }}
            >
                Popular destinations from Buenos Aires
            </Typography>

            <Box sx={{ position: 'relative' }}>
                {/* Left Arrow */}
                {showLeftArrow && (
                    <IconButton
                        onClick={scrollLeft}
                        sx={{
                            position: 'absolute',
                            left: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            backgroundColor: 'white',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                    >
                        <ChevronLeft />
                    </IconButton>
                )}

                {/* Right Arrow */}
                {showRightArrow && (
                    <IconButton
                        onClick={scrollRight}
                        sx={{
                            position: 'absolute',
                            right: -20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 2,
                            backgroundColor: 'white',
                            boxShadow: 2,
                            '&:hover': { backgroundColor: '#f5f5f5' }
                        }}
                    >
                        <ChevronRight />
                    </IconButton>
                )}

                {/* Horizontal Scrollable Container */}
                <Box
                    ref={scrollRef}
                    onWheel={handleWheel}
                    onScroll={handleScroll}
                    sx={{
                        display: 'flex',
                        gap: 2,
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        scrollBehavior: 'smooth',
                        pb: 1,
                        scrollbarWidth: 'none', // Firefox
                        '&::-webkit-scrollbar': {
                            display: 'none', // Chrome, Safari, Edge
                        },
                        '&::-webkit-scrollbar-track': {
                            display: 'none',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            display: 'none',
                        },
                    }}
                >
                    {destinations.map((destination) => (
                        <Box
                            key={destination.id}
                            sx={{
                                flex: '0 0 auto',
                                width: 150,
                                height: 100,
                                position: 'relative',
                                borderRadius: 2,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                '&:hover': {
                                    transform: 'scale(1.02)',
                                    transition: 'transform 0.2s ease'
                                }
                            }}
                        >
                            <Box
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: `url(${destination.image || 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    position: 'relative'
                                }}
                            >
                                {/* Overlay */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        inset: 0,
                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        p: 1.5
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: 'white',
                                            fontFamily: GOOGLE_FONTS.primary,
                                            fontSize: TYPOGRAPHY.fontSizes.sm,
                                            fontWeight: TYPOGRAPHY.fontWeights.medium,
                                            textShadow: '0 2px 4px rgba(0,0,0,0.7)',
                                            lineHeight: 1.2
                                        }}
                                    >
                                        {destination.city}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default PopularDestinations;