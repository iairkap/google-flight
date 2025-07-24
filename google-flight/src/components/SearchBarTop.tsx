import React from 'react';
import { Box } from '@mui/material';
import PassengerSelector from '@/components/PassangerSelector';
import TripTypeSelect from '@/components/TripTypeSelect';
import TravelClassSelect from '@/components/TravelClassSelect';
import { searchBarTopContainerStyles } from '@/styles/searchBarTop.styles';
import type { SearchBarTopProps } from '@/types/searchBarTop.types';

const SearchBarTop: React.FC<SearchBarTopProps> = ({ className }) => {
  return (
    <Box sx={searchBarTopContainerStyles} className={className}>
      <TripTypeSelect />
      <PassengerSelector />
      <TravelClassSelect />
    </Box>
  );
};

export default SearchBarTop;