import React from 'react';
import { Card, CardContent, Box } from '@mui/material';
import { FlightAirlineInfo } from './FlightAirlineInfo';
import { FlightRouteInfo } from './FlightRouteInfo';
import { FlightDetailsInfo } from './FlightDetailsInfo';
import { FlightPriceSection } from './FlightPriceSection';
import {
  flightCardStyles,
  flightCardContentStyles,
  flightInfoSectionStyles
} from '@/styles/flightResults.styles';
import type { FlightResult } from '@/store/flightStore';

interface FlightCardProps {
  flight: FlightResult;
  onSelect?: (flight: FlightResult) => void;
}

export const FlightCard: React.FC<FlightCardProps> = ({
  flight,
  onSelect
}) => {
  return (
    <Card sx={flightCardStyles}>
      <CardContent sx={flightCardContentStyles}>
        {/* Flight Info */}
        <Box sx={flightInfoSectionStyles}>
          <FlightAirlineInfo flight={flight} />
          <FlightRouteInfo flight={flight} />
          <FlightDetailsInfo flight={flight} />
        </Box>

        {/* Price and Book Button */}
        <FlightPriceSection flight={flight} onSelect={onSelect} />
      </CardContent>
    </Card>
  );
};
