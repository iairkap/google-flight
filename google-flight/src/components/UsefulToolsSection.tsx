import { Grid, Box, Typography, Fade } from '@mui/material';
import { CalendarMonth, TrendingUp, NotificationsActive } from '@mui/icons-material';
import { useState } from 'react';
import ToolCard from './ToolCard';
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from '@/constants/styles';

interface ToolData {
    icon: React.ReactNode;
    title: string;
    description: string;
    detailTitle: string;
    detailDescription: string;
    imageUrl: string;
}

const UsefulToolsSection: React.FC = () => {
    const [selectedTool, setSelectedTool] = useState(0);

    const tools: ToolData[] = [
        {
            icon: <CalendarMonth fontSize="large" />,
            title: "Find the cheapest days to fly",
            description: "The Date grid and Price graph make it easy to see the best flight deals",
            detailTitle: "Insightful tools help you choose your trip dates",
            detailDescription: "If your travel plans are flexible, use the form above to start searching for a specific trip. Then, play around with the Date grid and Price graph options on the Search page to find the cheapest days to get to your destination – and back again for round trips.",
            imageUrl: "https://www.gstatic.com/flights/app/lp/dates_benefits_light.svg"
        },
        {
            icon: <TrendingUp fontSize="large" />,
            title: "See the whole picture with price insights",
            description: "Price history and trend data show you when to book to get the best price on your flight",
            detailTitle: "Get smart insights about flight prices",
            detailDescription: "Real-time insights can tell you if a fare is lower or higher than usual, and if the fare you're seeing is a good price. So, you don't have to worry about paying too much for a flight or missing out on the cheapest time to book. On some routes, you might also see historical data that helps you better understand how flight prices vary over time.",
            imageUrl: "https://www.gstatic.com/flights/app/lp/price_insights_benefits_light.svg"
        },
        {
            icon: <NotificationsActive fontSize="large" />,
            title: "Track prices for a trip",
            description: "Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop",
            detailTitle: "Monitor flight prices and make sure you never miss a price change",
            detailDescription: "Effortlessly track prices for specific travel dates or for any dates, if your plans are flexible, to uncover the best deals. You can easily set up tracking for multiple routes while searching for flights and opt-in to receive email updates when the price changes. Once that's done, you can come back to your Tracked Flights page to monitor prices whenever you like, or relax knowing you'll never miss a flight deal.",
            imageUrl: "https://www.gstatic.com/flights/app/lp/tracking_prices_benefits_light.svg"
        }
    ];

    return (
        <Box sx={{ width: "100%", padding: 0, margin: 0 }}>
            <Box sx={{ mb: 2, px: { xs: 2, sm: 3, md: 4 } }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontFamily: GOOGLE_FONTS.primary,
                        fontSize: TYPOGRAPHY.fontSizes.xl,
                        fontWeight: TYPOGRAPHY.fontWeights.medium,
                        color: COLORS.text.primary,
                        textAlign: 'left',
                        mb: 0
                    }}
                >
                    Useful tools to help you find the best deals
                </Typography>
            </Box>

            <Grid container spacing={6} sx={{ height: '60dvh', px: { xs: 2, sm: 3, md: 4 } }}>
                <Grid size={{ xs: 12, lg: 4.8 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            gap: "16px",
                            minHeight: '188px'
                        }}
                    >
                        {tools.map((tool, index) => (
                            <Box key={index} onClick={() => setSelectedTool(index)}>
                                <ToolCard
                                    icon={tool.icon}
                                    title={tool.title}
                                    description={tool.description}
                                    isSelected={selectedTool === index}
                                />
                            </Box>
                        ))}
                    </Box>
                </Grid>

                {/* Right Column - Dynamic Content */}
                <Grid size={{ xs: 12, lg: 7.2 }}>
                    <Box
                        sx={{
                            pl: { lg: 4 },
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2
                        }}
                    >
                        <Fade
                            in={true}
                            timeout={300}
                            key={selectedTool}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 2
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontFamily: '"Google Sans", Roboto, "Helvetica Neue", Arial, sans-serif',
                                        fontSize: '24px',
                                        fontWeight: 400,
                                        letterSpacing: '0px',
                                        lineHeight: '32px',
                                        color: COLORS.text.primary
                                    }}
                                >
                                    {tools[selectedTool].detailTitle}
                                </Typography>

                                <Typography
                                    sx={{
                                        fontFamily: 'Roboto, "Helvetica Neue", Arial, sans-serif',
                                        fontSize: '14px',
                                        fontWeight: 400,
                                        letterSpacing: '0.2px',
                                        lineHeight: '20px',
                                        color: COLORS.text.secondary
                                    }}
                                >
                                    {tools[selectedTool].detailDescription}
                                </Typography>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 400,
                                    }}
                                >
                                    <img
                                        src={tools[selectedTool].imageUrl}
                                        alt={tools[selectedTool].detailTitle}
                                        style={{
                                            width: '100%',
                                            height: '400px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Fade>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}; export default UsefulToolsSection;
