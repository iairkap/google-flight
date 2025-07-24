import React from 'react';
import { Box } from '@mui/material';
import LocationSelector from '@/components/LocationSelector';
import DateSelector from '@/components/DateSelector';
import { useFlightSearch } from '@/hooks/useFlightSearch';
import {
  searchBarBottomContainerStyles,
  searchBarBottomContentStyles
} from '@/styles/searchBarBottom.styles';
import type { SearchBarBottomProps } from '@/types/searchBarBottom.types';

const SearchBarBottom: React.FC<SearchBarBottomProps> = ({ className }) => {
  const {
    origin,
    destination,
    departureDate,
    returnDate,
    setOrigin,
    setDestination,
    setDepartureDate,
    setReturnDate,
    handleSwapLocations,
  } = useFlightSearch();

  return (
    <Box sx={searchBarBottomContainerStyles} className={className}>
      <Box sx={searchBarBottomContentStyles}>
        {/* Contenedor de origen y destino */}
        <LocationSelector
          origin={origin}
          destination={destination}
          onOriginChange={setOrigin}
          onDestinationChange={setDestination}
          onSwapLocations={handleSwapLocations}
        />

        {/* Selector de fechas */}
        <DateSelector
          departureDate={departureDate}
          returnDate={returnDate}
          onDepartureDateChange={setDepartureDate}
          onReturnDateChange={setReturnDate}
        />
      </Box>
    </Box>
  );
};

export default SearchBarBottom;