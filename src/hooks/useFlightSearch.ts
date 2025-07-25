// src/hooks/useFlightSearch.ts
import { useFlightStore } from "@/store/flightStore";
import { Dayjs } from "dayjs";

export interface FlightSearchState {
  origin: string;
  destination: string;
  departureDate: Dayjs | null;
  returnDate: Dayjs | null;
}

export const useFlightSearch = () => {
  const { searchData, updateSearchData } = useFlightStore();

  const handleSwapLocations = () => {
    updateSearchData({
      origin: searchData.destination,
      destination: searchData.origin,
    });
  };

  const resetForm = () => {
    updateSearchData({
      origin: "",
      destination: "",
      departureDate: null,
      returnDate: null,
    });
  };

  const getSearchData = (): FlightSearchState => ({
    origin: searchData.origin,
    destination: searchData.destination,
    departureDate: searchData.departureDate,
    returnDate: searchData.returnDate,
  });

  return {
    // Current values from store
    origin: searchData.origin,
    destination: searchData.destination,
    departureDate: searchData.departureDate,
    returnDate: searchData.returnDate,

    // Setters that update the store
    setOrigin: (origin: string) => updateSearchData({ origin }),
    setDestination: (destination: string) => updateSearchData({ destination }),
    setDepartureDate: (departureDate: Dayjs | null) =>
      updateSearchData({ departureDate }),
    setReturnDate: (returnDate: Dayjs | null) =>
      updateSearchData({ returnDate }),

    // Actions
    handleSwapLocations,
    resetForm,
    getSearchData,
  };
};
