import React from 'react';
import { Box, Alert } from '@mui/material';
import { useFlightStore } from '@/store/flightStore';
import type { FlightResult } from '@/store/flightStore';
import {
    FlightResultsLoading,
    FlightResultsHeader,
    FlightResultsList
} from './FlightResults/index';
import { flightResultsContainerStyles } from '@/styles/flightResults.styles';
import type { FlightResultsProps } from '@/types/flightResults.types';

const FlightResults: React.FC<FlightResultsProps> = ({ className }) => {
    const { results, isLoading, error } = useFlightStore();

    const handleFlightSelect = (_flight: FlightResult) => {
        // Handle flight selection logic here
        // Could navigate to details page or show booking options
    };

    if (isLoading) {
        return <FlightResultsLoading />;
    }

    if (error) {
        return (
            <Alert severity="error" sx={{ mt: 2 }}>
                {error}
            </Alert>
        );
    }

    if (results.length === 0) {
        return null; // Don't show anything if no search has been made
    }

    return (
        <Box sx={flightResultsContainerStyles} className={className}>
            <FlightResultsHeader resultsCount={results.length} />
            <FlightResultsList
                flights={results}
                onFlightSelect={handleFlightSelect}
            />
        </Box>
    );
};

export default FlightResults;
