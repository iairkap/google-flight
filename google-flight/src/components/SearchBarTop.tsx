// src/components/SearchBarTop.tsx
import { Box } from '@mui/material';
import PassengerSelector from '@/components/PassangerSelector';
import TripTypeSelect from '@/components/TripTypeSelect';
import TravelClassSelect from '@/components/TravelClassSelect';

const SearchBarTop = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                paddingBottom: 1,
                paddingX: 2,
            }}
        >

            <TripTypeSelect />
            <PassengerSelector />
            <TravelClassSelect />

        </Box>
    );
};

export default SearchBarTop;