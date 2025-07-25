import React, { useRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
    Box,
    TextField,
    List,
    ListItem,
    Typography,
    CircularProgress,
    InputAdornment,
    ClickAwayListener,
} from '@mui/material';
import { SearchOutlined, FlightTakeoffOutlined, LocationCityOutlined } from '@mui/icons-material';
import type { LocationSuggestion } from '@/types/airport';
import { COLORS } from '@/constants/styles';

// Styles
const locationIconStyles = {
    fontSize: "20px",
    color: "#666",
};

const suggestionTextContainerStyles = {
    display: "flex",
    flexDirection: "column",
    gap: 0.5,
};

const suggestionPrimaryTextStyles = {
    fontSize: "16px",
    fontWeight: 500,
    color: "#1a1a1a",
};

const suggestionSecondaryTextStyles = {
    fontSize: "14px",
    color: "#666",
};

export interface LocationPopupProps {
    isOpen: boolean;
    suggestions: LocationSuggestion[];
    onClose: () => void;
    onLocationSelect: (location: string) => void;
    placeholder: string;
    query: string;
    onQueryChange: (query: string) => void;
    isLoading: boolean;
    anchorElement?: HTMLDivElement | null;
}

const LocationPopup: React.FC<LocationPopupProps> = ({
    isOpen,
    suggestions,
    onClose,
    onLocationSelect,
    placeholder,
    query,
    onQueryChange,
    isLoading,
    anchorElement,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0, width: 0 });

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    useEffect(() => {
        if (isOpen && anchorElement) {
            let rafId: number;
            let isUpdating = false;

            const updatePosition = () => {
                // Obtener la posición del elemento ancla en tiempo real
                const rect = anchorElement.getBoundingClientRect();

                // Verificar si el elemento ancla está visible en el viewport
                const topBarHeight = 64; // Altura del GoogleTopBar
                const isAnchorVisible = rect.top >= topBarHeight && rect.bottom <= window.innerHeight;

                // Si el elemento ancla no está visible, cerrar el popup
                if (!isAnchorVisible) {
                    onClose();
                    return;
                }

                // Verificar si hay suficiente espacio debajo o si se superpone con el TopBar
                const popupHeight = 400; // Altura máxima del popup
                const viewportHeight = window.innerHeight;

                let top = rect.bottom + 8;

                // Si el popup se saldría de la pantalla por abajo, posicionarlo arriba del campo
                if (top + popupHeight > viewportHeight) {
                    top = rect.top - popupHeight - 8;
                }

                // Si se superpone con el TopBar, ajustar posición
                if (top < topBarHeight) {
                    top = topBarHeight + 8;
                }

                setPopupPosition({
                    top,
                    left: rect.left,
                    width: rect.width,
                });
                isUpdating = false;
            };

            // Actualizar posición inicial
            updatePosition();

            // Throttled update usando requestAnimationFrame
            const scheduleUpdate = () => {
                if (!isUpdating) {
                    isUpdating = true;
                    rafId = requestAnimationFrame(updatePosition);
                }
            };

            // Agregar listeners con throttling
            window.addEventListener('scroll', scheduleUpdate, { passive: true });
            window.addEventListener('resize', scheduleUpdate, { passive: true });

            // Cleanup
            return () => {
                if (rafId) {
                    cancelAnimationFrame(rafId);
                }
                window.removeEventListener('scroll', scheduleUpdate);
                window.removeEventListener('resize', scheduleUpdate);
            };
        }
    }, [isOpen, anchorElement, onClose]);

    if (!isOpen) return null;

    const handleSuggestionClick = (suggestion: LocationSuggestion) => {
        const locationValue = suggestion.type === 'city' ? suggestion.city : suggestion.code;
        onLocationSelect(locationValue);
        onClose();
    };

    const renderSuggestionIcon = (suggestion: LocationSuggestion) => {
        return suggestion.type === 'city' ? (
            <LocationCityOutlined sx={locationIconStyles} />
        ) : (
            <FlightTakeoffOutlined sx={locationIconStyles} />
        );
    };

    const renderSuggestionText = (suggestion: LocationSuggestion) => {
        if (suggestion.type === 'city') {
            return (
                <Box sx={suggestionTextContainerStyles}>
                    <Typography sx={suggestionPrimaryTextStyles}>
                        {suggestion.city}
                    </Typography>
                    <Typography sx={suggestionSecondaryTextStyles}>
                        {suggestion.country}
                    </Typography>
                </Box>
            );
        }

        return (
            <Box sx={suggestionTextContainerStyles}>
                <Typography sx={suggestionPrimaryTextStyles}>
                    {suggestion.name}
                </Typography>
                <Typography sx={suggestionSecondaryTextStyles}>
                    {suggestion.city}, {suggestion.country} · {suggestion.code}
                </Typography>
            </Box>
        );
    };

    // Contenido del popup
    const popupContent = (
        <ClickAwayListener onClickAway={onClose}>
            <Box
                sx={{
                    position: "fixed",
                    top: popupPosition.top,
                    left: popupPosition.left,
                    width: popupPosition.width,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                    zIndex: 999999999,
                    maxHeight: "400px",
                    minWidth: "300px",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    transform: "translateZ(0)",
                    isolation: "isolate",
                    transition: "none",
                    willChange: "transform",
                }}
            >
                {/* Search Header */}
                <Box sx={{ p: 2, borderBottom: `1px solid ${COLORS.border.light}`, flexShrink: 0 }}>
                    <TextField
                        ref={inputRef}
                        fullWidth
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => onQueryChange(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchOutlined sx={locationIconStyles} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f8f9fa",
                                fontSize: "16px",
                                "& .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    border: "none",
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    border: `2px solid #1976d2`,
                                },
                            },
                        }}
                    />
                </Box>

                {/* Loading State */}
                {isLoading && (
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress size={24} />
                    </Box>
                )}

                {/* Suggestions List */}
                {!isLoading && suggestions.length > 0 && (
                    <Box sx={{ flex: 1, overflow: 'auto' }}>
                        <List sx={{ p: 0 }}>
                            {suggestions.map((suggestion, index) => (
                                <ListItem
                                    key={`${suggestion.code}-${index}`}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 2,
                                        cursor: "pointer",
                                        borderBottom: `1px solid ${COLORS.border.light}`,
                                        "&:hover": {
                                            backgroundColor: "#e3f2fd",
                                        },
                                        "&:last-child": {
                                            borderBottom: "none",
                                        },
                                    }}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {renderSuggestionIcon(suggestion)}
                                    {renderSuggestionText(suggestion)}
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}

                {/* No Results */}
                {!isLoading && query.trim() && suggestions.length === 0 && (
                    <Box sx={{ p: 2, textAlign: 'center', color: '#666' }}>
                        <Typography>No se encontraron ubicaciones para "{query}"</Typography>
                    </Box>
                )}
            </Box>
        </ClickAwayListener>
    );

    // Renderizar usando Portal para estar por encima de TODO
    return ReactDOM.createPortal(popupContent, document.body);
};

export default LocationPopup;
