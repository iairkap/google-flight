// src/components/LocationSelector.tsx
import React, { useRef } from 'react';
import { Box } from '@mui/material';
import LocationField from './LocationSelector/LocationField';
import SwapButton from './LocationSelector/SwapButton';
import LocationPopup from './LocationSelector/LocationPopup';
import { useLocationSelector } from '@/hooks/useLocationSelector';
import { locationSelectorContainerStyles } from '@/styles/LocationSelector';

interface LocationSelectorProps {
    origin: string;
    destination: string;
    onOriginChange: (value: string) => void;
    onDestinationChange: (value: string) => void;
    onSwapLocations: () => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
    origin,
    destination,
    onOriginChange,
    onDestinationChange,
    onSwapLocations,
}) => {
    const { state, actions } = useLocationSelector();
    const originFieldRef = useRef<HTMLDivElement>(null);
    const destinationFieldRef = useRef<HTMLDivElement>(null);

    const handleOriginClick = () => {
        actions.openOriginPopup();
    };

    const handleDestinationClick = () => {
        actions.openDestinationPopup();
    };

    const handleOriginSelect = (location: string) => {
        onOriginChange(location);
        actions.closePopups();
    };

    const handleDestinationSelect = (location: string) => {
        onDestinationChange(location);
        actions.closePopups();
    };

    return (
        <Box sx={locationSelectorContainerStyles}>
            {/* Origin Field */}
            <Box ref={originFieldRef} sx={{ position: 'relative', flex: 1, }}>
                <LocationField
                    type="origin"
                    value={origin}
                    placeholder="Where from?"
                    onClick={handleOriginClick}
                />

                <LocationPopup
                    isOpen={state.isOriginPopupOpen}
                    placeholder="Where from?"
                    query={state.originQuery}
                    suggestions={state.suggestions}
                    isLoading={state.isLoading}
                    onQueryChange={actions.setOriginQuery}
                    onLocationSelect={handleOriginSelect}
                    onClose={actions.closePopups}
                    anchorElement={originFieldRef.current}
                />
            </Box>

            {/* Swap Button Container */}
            <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', zIndex: 100 }}>
                <SwapButton onClick={onSwapLocations} />
            </Box>

            {/* Destination Field */}
            <Box ref={destinationFieldRef} sx={{ position: 'relative', flex: 1 }}>
                <LocationField
                    type="destination"
                    value={destination}
                    placeholder="Where to?"
                    onClick={handleDestinationClick}
                />

                <LocationPopup
                    isOpen={state.isDestinationPopupOpen}
                    placeholder="Where to?"
                    query={state.destinationQuery}
                    suggestions={state.suggestions}
                    isLoading={state.isLoading}
                    onQueryChange={actions.setDestinationQuery}
                    onLocationSelect={handleDestinationSelect}
                    onClose={actions.closePopups}
                    anchorElement={destinationFieldRef.current}
                />
            </Box>
        </Box>
    );
};

export default LocationSelector;
