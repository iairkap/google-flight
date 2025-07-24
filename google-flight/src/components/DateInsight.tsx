import { Box, Typography, Grid } from '@mui/material';
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from '@/constants/styles';

interface DateInsightProps {
    title: string;
    description: string;
    rightContent: React.ReactNode;
}

const DateInsight: React.FC<DateInsightProps> = ({ title, description, rightContent }) => {
    return (
        <Box sx={{ py: 6 }}>
            <Grid container spacing={4} alignItems="center">
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            fontFamily: GOOGLE_FONTS.primary,
                            fontSize: TYPOGRAPHY.fontSizes.xl,
                            fontWeight: TYPOGRAPHY.fontWeights.medium,
                            color: COLORS.text.primary,
                            mb: 2
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        sx={{
                            fontFamily: GOOGLE_FONTS.primary,
                            fontSize: TYPOGRAPHY.fontSizes.lg,
                            fontWeight: TYPOGRAPHY.fontWeights.normal,
                            color: COLORS.text.secondary,
                            lineHeight: 1.5
                        }}
                    >
                        {description}
                    </Typography>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    {rightContent}
                </Grid>
            </Grid>
        </Box>
    );
};

export default DateInsight;
