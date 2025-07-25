import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useFlightStore } from '@/store/flightStore';
import { searchButtonStyles } from '@/styles/searchButton.styles';
import type { SearchButtonProps } from '@/types/searchButton.types';

const SearchButton: React.FC<SearchButtonProps> = ({
    text = "Explore",
    loadingText = "Searching...",
    onClick,
    isLoading: externalLoading,
    disabled: externalDisabled,
    className
}) => {
    const { searchFlights, isLoading: storeLoading } = useFlightStore();

    const isLoading = externalLoading ?? storeLoading;
    const isDisabled = externalDisabled ?? isLoading;

    const handleSearch = () => {
        if (onClick) {
            onClick();
        } else {
            searchFlights();
        }
    };

    return (
        <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={isDisabled}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
            sx={searchButtonStyles}
            className={className}
        >
            {isLoading ? loadingText : text}
        </Button>
    );
};

export default SearchButton;
