import React from 'react';
import { Typography } from '@mui/material';
import { flightResultsTitleStyles } from '@/styles/flightResults.styles';

interface FlightResultsHeaderProps {
  resultsCount: number;
}

export const FlightResultsHeader: React.FC<FlightResultsHeaderProps> = ({
  resultsCount
}) => {
  return (
    <Typography variant="h5" sx={flightResultsTitleStyles}>
      Flight Results ({resultsCount} found)
    </Typography>
  );
};
