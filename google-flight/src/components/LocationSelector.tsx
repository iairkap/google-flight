// src/components/LocationSelector.tsx
import {
    Box,
    TextField,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    PlaceOutlined,
    SwapHorizOutlined
} from '@mui/icons-material';
import { textFieldStyles, buttonStyles } from '@/styles/common';
import { COLORS } from '@/constants/styles';

interface LocationSelectorProps {
    origin: string;
    destination: string;
    onOriginChange: (value: string) => void;
    onDestinationChange: (value: string) => void;
    onSwapLocations: () => void;
}

const LocationSelector = ({
    origin,
    destination,
    onOriginChange,
    onDestinationChange,
    onSwapLocations
}: LocationSelectorProps) => {
    return (
        <Box
            sx={{
                display: 'flex',
                position: 'relative',
                gap: '8px',
                flex: { xs: '1 1 100%', md: '0 0 auto' },
            }}
        >
            <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Where from?"
                    value={origin}
                    onChange={(e) => onOriginChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PlaceOutlined sx={{ color: COLORS.text.light }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={textFieldStyles}
                />
            </Box>

            <Box sx={{ flex: '1 1 300px', minWidth: 250 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Where to?"
                    value={destination}
                    onChange={(e) => onDestinationChange(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PlaceOutlined sx={{ color: COLORS.text.light }} />
                            </InputAdornment>
                        ),
                    }}
                    sx={textFieldStyles}
                />
            </Box>

            <IconButton
                onClick={onSwapLocations}
                sx={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: '#fff',
                    border: '1px solid',
                    borderColor: COLORS.border.light,
                    borderRadius: '50%',
                    width: 40,
                    height: 40,
                    zIndex: 10,
                    ...buttonStyles.secondary,
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: '-4px',
                        bottom: '-4px',
                        left: '50%',
                        width: '8px',
                        backgroundColor: '#fff',
                        transform: 'translateX(-50%)',
                        zIndex: -1,
                    }
                }}
            >
                <SwapHorizOutlined sx={{ color: COLORS.text.light, fontSize: 20 }} />
            </IconButton>
        </Box>
    );
};

export default LocationSelector;
