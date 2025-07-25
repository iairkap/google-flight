// src/components/Loader.tsx
import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { COLORS, GOOGLE_FONTS } from '@/constants/styles';
import type { LoaderProps } from '@/types/components';

const Loader: React.FC<LoaderProps> = ({
    message = "Loading...",
    fullScreen = false,
    className
}) => {
    const commonContent = (
        <>
            <CircularProgress
                size={fullScreen ? 50 : 40}
                sx={{ color: COLORS.primary }}
            />
            {message && (
                <Typography
                    variant={fullScreen ? "body1" : "body2"}
                    sx={{
                        fontFamily: GOOGLE_FONTS.primary,
                        fontSize: fullScreen ? '1rem' : '0.875rem',
                        color: COLORS.text.secondary,
                        textAlign: 'center',
                        maxWidth: fullScreen ? '80%' : '100%'
                    }}
                >
                    {message}
                </Typography>
            )}
        </>
    );

    if (fullScreen) {
        return (
            <Box
                className={className}
                sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    zIndex: 9999,
                    gap: 3
                }}
            >
                {commonContent}
            </Box>
        );
    }

    return (
        <Box
            className={className}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '200px',
                gap: 2
            }}
        >
            {commonContent}
        </Box>
    );
};

export default Loader;