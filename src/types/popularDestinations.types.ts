export interface PopularDestination {
  id: string;
  city: string;
  country: string;
  imageUrl?: string;
  image?: string; // For compatibility with existing data
  name?: string;
  code?: string;
  description?: string;
  coordinates?: [number, number];
  price?: number;
}

export interface PopularDestinationsProps {
  destinations?: PopularDestination[];
  title?: string;
  showPrices?: boolean;
}

export interface PopularDestinationsState {
  showLeftArrow: boolean;
  showRightArrow: boolean;
}

export interface PopularDestinationsActions {
  handleWheel: (e: React.WheelEvent) => void;
  scrollLeft: () => void;
  scrollRight: () => void;
  updateArrowVisibility: () => void;
  handleScroll: () => void;
}
