import { Box, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Apps, AccountCircle } from '@mui/icons-material';
import { COLORS, GOOGLE_FONTS } from '@/constants/styles';

const GoogleTopBar = () => {
    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                backgroundColor: '#fff',
                borderBottom: `1px solid ${COLORS.border.light}`,
                height: '64px',
                justifyContent: 'center',
                top: 0,
                zIndex: 1100
            }}
        >
            <Toolbar sx={{ minHeight: '64px !important', px: 3 }}>
                {/* Logo de Google */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <Box
                        component="img"
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
                        alt="Google"
                        sx={{
                            height: 24,
                            mr: 1
                        }}
                    />
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: GOOGLE_FONTS.primary,
                            fontSize: '20px',
                            fontWeight: 400,
                            color: COLORS.text.secondary,
                            ml: 1
                        }}
                    >
                        Flights
                    </Typography>
                </Box>

                {/* Iconos de la derecha */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                        size="small"
                        sx={{
                            color: COLORS.text.light,
                            '&:hover': {
                                backgroundColor: COLORS.background.hover,
                            }
                        }}
                    >
                        <Apps />
                    </IconButton>
                    <IconButton
                        size="small"
                        sx={{
                            color: COLORS.text.light,
                            '&:hover': {
                                backgroundColor: COLORS.background.hover,
                            }
                        }}
                    >
                        <AccountCircle />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default GoogleTopBar;
