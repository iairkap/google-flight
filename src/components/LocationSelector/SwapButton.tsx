// src/components/LocationSelector/SwapButton.tsx
import React from 'react';
import { IconButton } from '@mui/material';
import { SwapHorizOutlined } from '@mui/icons-material';
import {
    swapButtonStyles,
    swapIconStyles,
} from '@/styles/LocationSelector';

interface SwapButtonProps {
    onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
    return (
        <IconButton
            onClick={onClick}
            sx={swapButtonStyles}
            aria-label="Swap origin and destination"
        >
            <SwapHorizOutlined sx={swapIconStyles} />
        </IconButton>
    );
};

export default SwapButton;
