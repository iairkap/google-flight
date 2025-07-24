import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { flightResultsLoadingStyles } from '@/styles/flightResults.styles';

interface FlightResultsLoadingProps {
  message?: string;
}

export const FlightResultsLoading: React.FC<FlightResultsLoadingProps> = ({
  message = "Searching for flights..."
}) => {
  return (
    <Box sx={flightResultsLoadingStyles}>
      <CircularProgress size={40} />
      <Typography sx={{ ml: 2 }}>{message}</Typography>
    </Box>
  );
};
