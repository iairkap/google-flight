import { useState } from 'react';
import { Box, MenuItem, TextField } from '@mui/material';
import { ExpandMoreOutlined } from '@mui/icons-material';

const travelClasses = ['Economy', 'Premium Economy', 'Business', 'First'];

const TravelClassSelect = () => {
    const [travelClass, setTravelClass] = useState('Economy');

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <TextField
                select
                variant="standard"
                value={travelClass}
                onChange={(e) => setTravelClass(e.target.value)}
                InputProps={{
                    endAdornment: <ExpandMoreOutlined fontSize="small" />,
                }}
                sx={{
                    width: 140,
                    '& .MuiInput-underline:before': {
                        borderBottom: 'none',
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none',
                    },
                    '& .MuiInput-underline:after': {
                        borderBottom: 'none',
                    },
                    '& .MuiInputBase-input': {
                        color: '#666',
                    },
                    '& .MuiSvgIcon-root': {
                        color: '#666',
                    }
                }}
            >
                {travelClasses.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    );
};

export default TravelClassSelect;
