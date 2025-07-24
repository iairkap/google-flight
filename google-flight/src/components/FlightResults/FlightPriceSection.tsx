import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { AttachMoney } from '@mui/icons-material';
import {
  flightPriceSectionStyles,
  flightPriceDisplayStyles,
  flightPriceTextStyles,
  flightSelectButtonStyles
} from '@/styles/flightResults.styles';
import type { FlightResult } from '@/store/flightStore';

interface FlightPriceSectionProps {
  flight: FlightResult;
  onSelect?: (flight: FlightResult) => void;
}

export const FlightPriceSection: React.FC<FlightPriceSectionProps> = ({
  flight,
  onSelect
}) => {
  const handleSelect = () => {
    onSelect?.(flight);
  };

  return (
    <Box sx={flightPriceSectionStyles}>
      <Box sx={flightPriceDisplayStyles}>
        <AttachMoney sx={{ color: '#1976d2', fontSize: 20 }} />
        <Typography variant="h5" sx={flightPriceTextStyles}>
          {flight.price}
        </Typography>
      </Box>
      <Button
        variant="contained"
        size="small"
        sx={flightSelectButtonStyles}
        onClick={handleSelect}
      >
        Select
      </Button>
    </Box>
  );
};
