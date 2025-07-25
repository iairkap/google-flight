import { Box, Typography, Card, CardContent } from '@mui/material';
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from '@/constants/styles';

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    isSelected?: boolean;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, isSelected = false }) => {
    return (
        <Card
            sx={{
                position: 'relative',
                height: '100%',
                cursor: 'pointer',
                borderRadius: '16px',
                border: isSelected ? '1px solid #d2e3fc' : '1px solid #d2e3fc',
                backgroundColor: 'rgba(232,240,254,0.5)',
                minHeight: '188px',
                boxShadow: 'none',
                overflow: 'visible',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 1
                }
            }}
        >
            {isSelected && (
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        right: -14,
                        width: 26,
                        height: 26,
                        backgroundColor: 'rgba(232,240,254,0.5)',
                        borderTop: '1px solid #d2e3fc',
                        borderRight: '1px solid #d2e3fc',
                        borderBottom: '1px solid #d2e3fc',
                        borderLeft: 'none',
                        clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
                        transform: 'translateY(-50%) rotate(-135deg)',
                        zIndex: 2
                    }}
                />
            )}
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    padding: '24px',
                    '&:last-child': { pb: '24px' }
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                    <Box
                        sx={{
                            color: COLORS.primary,
                            mt: 0.5,
                            flexShrink: 0
                        }}
                    >
                        {icon}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: GOOGLE_FONTS.primary,
                                fontSize: TYPOGRAPHY.fontSizes.lg,
                                fontWeight: TYPOGRAPHY.fontWeights.medium,
                                color: COLORS.text.primary,
                                mb: 1,
                                lineHeight: 1.2
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: GOOGLE_FONTS.primary,
                                fontSize: TYPOGRAPHY.fontSizes.base,
                                fontWeight: TYPOGRAPHY.fontWeights.normal,
                                color: COLORS.text.secondary,
                                lineHeight: 1.4
                            }}
                        >
                            {description}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ToolCard;
