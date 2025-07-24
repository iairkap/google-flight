// src/components/SearchBarBottom.tsx
import { Box } from '@mui/material';
import LocationSelector from '@/components/LocationSelector';
import DateSelector from '@/components/DateSelector';
import { useFlightSearch } from '@/hooks/useFlightSearch';

const SearchBarBottom = () => {
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
        <Box sx={{ padding: 0 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    gap: 0,
                    position: 'relative',
                }}
            >
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