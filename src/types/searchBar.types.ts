export interface SearchBarProps {
  className?: string;
  onSearch?: (searchData: SearchData) => void;
}

export interface SearchData {
  origin?: string;
  destination?: string;
  departureDate?: Date;
  returnDate?: Date;
  passengers?: number;
  travelClass?: string;
  tripType?: "roundtrip" | "oneway" | "multicity";
}
