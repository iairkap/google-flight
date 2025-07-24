import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
import { AccessTime } from '@mui/icons-material';
import { flightDetailsStyles } from '@/styles/flightResults.styles';
import type { FlightResult } from '@/store/flightStore';

interface FlightDetailsInfoProps {
  flight: FlightResult;
}

export const FlightDetailsInfo: React.FC<FlightDetailsInfoProps> = ({
  flight
}) => {
  return (
    <Box sx={flightDetailsStyles}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <AccessTime sx={{ mr: 0.5, fontSize: 16, color: '#666' }} />
        <Typography variant="body2" color="textSecondary">
          {flight.duration}
        </Typography>
      </Box>
      <Chip
        label={flight.stops === 0 ? 'Direct' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
        size="small"
        color={flight.stops === 0 ? 'success' : 'default'}
        variant="outlined"
      />
    </Box>
  );
};
