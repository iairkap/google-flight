// src/components/RecommendedDestinationsHeader.tsx
import { Typography } from '@mui/material';
import { COLORS, GOOGLE_FONTS, TYPOGRAPHY } from '@/constants/styles';
import type { HeaderProps } from '@/types/components';

const RecommendedDestinationsHeader: React.FC<HeaderProps> = ({
    userLocation,
    title,
    className
}) => {
    const defaultTitle = `Explore destinations from ${userLocation.city}`;

    return (
        <Typography
            variant="h6"
            className={className}
            sx={{
                mb: 3,
                fontFamily: GOOGLE_FONTS.primary,
                fontSize: TYPOGRAPHY.fontSizes.xl,
                fontWeight: TYPOGRAPHY.fontWeights.medium,
                letterSpacing: '0px',
                lineHeight: TYPOGRAPHY.lineHeights.normal,
                color: COLORS.text.primary,
                padding: '0 16px',
                margin: '0 0 24px 0',
                alignSelf: 'flex-start',
            }}
        >
            {title || defaultTitle}
        </Typography>
    );
}; export default RecommendedDestinationsHeader;
