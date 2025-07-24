import React from 'react';
import SearchBarTop from "@/components/SearchBarTop";
import SearchBarBottom from "@/components/SearchBarBottom";
import SearchButton from "@/components/SearchButton";
import { Box } from '@mui/material';
import type { SearchBarProps } from '@/types/searchBar.types';
import { searchBarContainerStyles } from '@/styles/searchBar.styles';

const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
    return (
        <Box
            sx={searchBarContainerStyles}
            className={className}

        >
            <SearchBarTop />
            <SearchBarBottom />
            <SearchButton />
        </Box>
    );
};

export default SearchBar;

