import { useFlightStore } from "@/store/flightStore";
import type { UserLocation } from "@/store/flightStore";

export const useUserLocation = () => {
  const { userLocation, detectUserLocation, setUserLocation } =
    useFlightStore();

  return {
    userLocation,
    detectUserLocation,
    setUserLocation,
    isLocationAvailable: Boolean(userLocation),
  };
};

export const useLocationTitle = (
  userLocation: UserLocation | null,
  defaultText = "anywhere"
) => {
  if (!userLocation) return defaultText;
  return `${userLocation.city}`;
};
