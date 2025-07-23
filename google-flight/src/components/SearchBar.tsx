import SearchBarTop from "@/components/SearchBarTop";
import SearchBarBottom from "@/components/SearchBarBottom";
import SearchButton from "@/components/SearchButton";
import { Box, FormControlLabel, Switch, Typography } from '@mui/material';
import { useFlightStore } from "@/store/flightStore";

const SearchBar = () => {
    const { useMockData, setUseMockData } = useFlightStore();

    return (
        <Box
            sx={{
                position: 'relative', // Para que el botón se posicione relativo a este container
                borderRadius: 3,
                boxShadow: 2,
                backgroundColor: '#fff',
                padding: "8px 16px 48px",
                marginBottom: '50px', // Espacio para el botón que sobresale
            }}
        >
            {/* Toggle para alternar entre API y Mock Data */}
            {/*   <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={useMockData}
                            onChange={(e) => setUseMockData(e.target.checked)}
                            color="primary"
                        />
                    }
                    label={
                        <Typography variant="body2" color="textSecondary">
                            {useMockData ? "Usando datos de prueba (Mock)" : "Usando API real (Limitada)"}
                        </Typography>
                    }
                />
                <Typography variant="caption" color="textSecondary" display="block">
                    {useMockData
                        ? "💡 Datos simulados para ahorrar límites de API"
                        : "⚠️ Consumirá cuota de API real"
                    }
                </Typography>
            </Box> */}
            <SearchBarTop />
            <SearchBarBottom />
            <SearchButton />
        </Box>
    );
};

export default SearchBar;