// components/PassengerSelector.tsx
import React, { useState } from 'react';
import {
    Button,
    Popper,
    Paper,
    ClickAwayListener,
    Box,
    Typography,
    IconButton,
} from '@mui/material';
import { PersonOutline, Add, Remove } from '@mui/icons-material';

const PassengerSelector = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [counts, setCounts] = useState({
        adults: 1,
        children: 0,
        infantsLap: 0,
        infantsSeat: 0,
    });

    const open = Boolean(anchorEl);
    const totalPassengers = Object.values(counts).reduce((a, b) => a + b, 0);

    const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleChange = (key: keyof typeof counts, delta: number) => {
        setCounts((prev) => ({
            ...prev,
            [key]: Math.max(0, prev[key] + delta),
        }));
    };

    return (
        <>
            <Button
                onClick={handleToggle}
                startIcon={<PersonOutline fontSize="small" />}
                sx={{
                    color: '#666',
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: '#e8f0fe',
                        color: '#333',
                    }
                }}
            >
                {totalPassengers}
            </Button>

            <Popper open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
                    <Paper sx={{ p: 2, width: 250 }}>
                        {[
                            { label: 'Adults', key: 'adults' },
                            { label: 'Children (2–11)', key: 'children' },
                            { label: 'Infants (on lap)', key: 'infantsLap' },
                            { label: 'Infants (on seat)', key: 'infantsSeat' },
                        ].map(({ label, key }) => (
                            <Box
                                key={key}
                                sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}
                            >
                                <Typography>{label}</Typography>
                                <Box>
                                    <IconButton
                                        onClick={() => handleChange(key as keyof typeof counts, -1)}
                                        sx={{
                                            color: '#666',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                                color: '#333',
                                            }
                                        }}
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                    <Typography component="span" sx={{ mx: 1 }}>
                                        {counts[key as keyof typeof counts]}
                                    </Typography>
                                    <IconButton
                                        onClick={() => handleChange(key as keyof typeof counts, 1)}
                                        sx={{
                                            color: '#666',
                                            '&:hover': {
                                                backgroundColor: '#f5f5f5',
                                                color: '#333',
                                            }
                                        }}
                                    >
                                        <Add fontSize="small" />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                            <Button
                                onClick={() => setAnchorEl(null)}
                                size="small"
                                sx={{
                                    color: '#666',
                                    textTransform: 'none',
                                    '&:hover': {
                                        backgroundColor: '#e8f0fe',
                                        color: '#333',
                                    }
                                }}
                            >
                                Done
                            </Button>
                        </Box>
                    </Paper>
                </ClickAwayListener>
            </Popper>
        </>
    );
};

export default PassengerSelector;