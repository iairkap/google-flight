import React from 'react';
import { Box, Typography } from '@mui/material';
import { Flight } from '@mui/icons-material';
import { flightAirlineStyles } from '@/styles/flightResults.styles';
import type { FlightResult } from '@/store/flightStore';

interface FlightAirlineInfoProps {
  flight: FlightResult;
}

export const FlightAirlineInfo: React.FC<FlightAirlineInfoProps> = ({
  flight
}) => {
  return (
    <Box sx={flightAirlineStyles}>
      <Flight sx={{ mr: 1, color: '#666' }} />
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        {flight.airline}
      </Typography>
      <Typography variant="body2" sx={{ ml: 1, color: '#666' }}>
        {flight.flightNumber}
      </Typography>
    </Box>
  );
};
