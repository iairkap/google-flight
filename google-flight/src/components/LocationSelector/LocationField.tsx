// src/components/LocationSelector/LocationField.tsx
import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import { FlightTakeoffOutlined, PlaceOutlined } from '@mui/icons-material';
import { getLocationDisplayText } from '@/utils/airportData';
import {
    locationFieldStyles,
    locationInputStyles,
} from '@/styles/LocationSelector';
import { COLORS } from '@/constants/styles';

interface LocationFieldProps {
    type: 'origin' | 'destination';
    value: string;
    placeholder: string;
    onClick: () => void;
}

const LocationField: React.FC<LocationFieldProps> = ({
    type,
    value,
    placeholder,
    onClick,
}) => {
    const displayValue = getLocationDisplayText(value);

    return (
        <Box sx={locationFieldStyles} data-location-field={type}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={placeholder}
                value={displayValue}
                onClick={onClick}
                InputProps={{
                    readOnly: true,
                    startAdornment: (
                        <InputAdornment position="start">
                            {type === 'origin' ? (
                                <FlightTakeoffOutlined sx={{ color: COLORS.text.light }} />
                            ) : (
                                <PlaceOutlined sx={{ color: COLORS.text.light }} />
                            )}
                        </InputAdornment>
                    ),
                }}
                sx={locationInputStyles}
            />
        </Box>
    );
};

export default LocationField;
