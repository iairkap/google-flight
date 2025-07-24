import React from 'react';
import { Box, Typography } from '@mui/material';
import { Schedule } from '@mui/icons-material';
import { flightRouteStyles } from '@/styles/flightResults.styles';
import type { FlightResult } from '@/store/flightStore';

interface FlightRouteInfoProps {
  flight: FlightResult;
}

export const FlightRouteInfo: React.FC<FlightRouteInfoProps> = ({
  flight
}) => {
  return (
    <Box sx={flightRouteStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Schedule sx={{ mr: 0.5, fontSize: 16, color: '#666' }} />
        <Typography variant="body2">
          {flight.departure.time} ({flight.departure.airport})
        </Typography>
      </Box>
      <Typography sx={{ mx: 2, color: '#666' }}>→</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Schedule sx={{ mr: 0.5, fontSize: 16, color: '#666' }} />
        <Typography variant="body2">
          {flight.arrival.time} ({flight.arrival.airport})
        </Typography>
      </Box>
    </Box>
  );
};
