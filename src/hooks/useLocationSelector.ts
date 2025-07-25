// src/hooks/useLocationSelector.ts
import { useState, useCallback, useEffect, useRef } from "react";
import type { LocationSelectorState } from "@/types/airport";
import { searchAirports, getPopularAirports } from "@/utils/airportData";

export const useLocationSelector = () => {
  const [state, setState] = useState<LocationSelectorState>({
    isOriginPopupOpen: false,
    isDestinationPopupOpen: false,
    originQuery: "",
    destinationQuery: "",
    suggestions: [],
    isLoading: false,
  });

  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openOriginPopup = useCallback(() => {
    const popularAirports = getPopularAirports();
    setState((prev) => ({
      ...prev,
      isOriginPopupOpen: true,
      isDestinationPopupOpen: false,
      originQuery: "",
      suggestions: popularAirports,
      isLoading: false,
    }));
  }, []);

  const openDestinationPopup = useCallback(() => {
    const popularAirports = getPopularAirports();
    setState((prev) => ({
      ...prev,
      isDestinationPopupOpen: true,
      isOriginPopupOpen: false,
      destinationQuery: "",
      suggestions: popularAirports,
      isLoading: false,
    }));
  }, []);

  const closePopups = useCallback(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    setState((prev) => ({
      ...prev,
      isOriginPopupOpen: false,
      isDestinationPopupOpen: false,
      suggestions: [],
      originQuery: "",
      destinationQuery: "",
      isLoading: false,
    }));
  }, []);

  const setOriginQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, originQuery: query }));
  }, []);

  const setDestinationQuery = useCallback((query: string) => {
    setState((prev) => ({ ...prev, destinationQuery: query }));
  }, []);

  const searchLocations = useCallback(async (query: string) => {
    if (!query.trim()) {
      setState((prev) => ({ ...prev, suggestions: [], isLoading: false }));
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setState((prev) => ({ ...prev, isLoading: true }));

    // Debounce search to avoid too many API calls
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const results = await searchAirports(query);
        setState((prev) => ({
          ...prev,
          suggestions: results,
          isLoading: false,
        }));
      } catch {
        setState((prev) => ({
          ...prev,
          suggestions: [],
          isLoading: false,
        }));
      }
    }, 150); // Reduced debounce time to 150ms for better responsiveness
  }, []);

  // Search when query changes, but only if popup is open
  useEffect(() => {
    if (state.isOriginPopupOpen && state.originQuery) {
      searchLocations(state.originQuery);
    } else if (state.isDestinationPopupOpen && state.destinationQuery) {
      searchLocations(state.destinationQuery);
    }
  }, [
    state.originQuery,
    state.destinationQuery,
    state.isOriginPopupOpen,
    state.isDestinationPopupOpen,
    searchLocations,
  ]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return {
    state,
    actions: {
      openOriginPopup,
      openDestinationPopup,
      closePopups,
      setOriginQuery,
      setDestinationQuery,
      searchLocations,
    },
  };
};
