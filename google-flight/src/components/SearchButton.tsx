// src/components/SearchButton.tsx
import { Button, CircularProgress } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useFlightStore } from '@/store/flightStore';

const SearchButton = () => {
    const { searchFlights, isLoading } = useFlightStore();

    const handleSearch = () => {
        searchFlights();
    };

    return (
        <Button
            variant="contained"
            size="large"
            onClick={handleSearch}
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Search />}
            sx={{
                position: 'absolute',
                left: '50%',
                bottom: '-25px', // Mitad afuera del container
                transform: 'translateX(-50%)',
                zIndex: 10,
                height: '40px',
                backgroundColor: '#1976d2',
                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.4)',
                borderRadius: '25px',
                fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
                fontSize: '.875rem',
                letterSpacing: '.0107142857em',
                fontWeight: 500,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#1565c0',
                    boxShadow: '0 6px 16px rgba(25, 118, 210, 0.5)',
                },
                '&:disabled': {
                    backgroundColor: '#ccc',
                    color: '#666',
                },
            }}
        >
            {isLoading ? 'Explore' : 'Explore'}
        </Button>
    );
};

export default SearchButton;
