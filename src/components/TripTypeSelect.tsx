import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { CompareArrowsOutlined } from '@mui/icons-material';

const TripTypeSelect = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selected, setSelected] = useState('Round trip');
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option?: string) => {
        if (option) setSelected(option);
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                startIcon={<CompareArrowsOutlined fontSize="small" />}
                sx={{
                    textTransform: 'none',
                    color: '#666',
                    '&:hover': {
                        backgroundColor: '#e8f0fe',
                        color: '#333',
                    }
                }}
            >
                {selected}
            </Button>
            <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                {['Round trip', 'One-way', 'Multi-city'].map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)}>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default TripTypeSelect;