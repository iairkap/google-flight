import type { UserLocation } from "@/store/flightStore";

export interface BaseComponentProps {
  className?: string;
}

export interface HeaderProps extends BaseComponentProps {
  userLocation: UserLocation;
  title?: string;
}

export interface GridProps<T> extends BaseComponentProps {
  items: T[];
  onItemClick: (item: T) => void;
}

export interface LoaderProps extends BaseComponentProps {
  fullScreen?: boolean;
  message?: string;
}

export interface MapProps extends BaseComponentProps {
  height?: string;
  showPrices?: boolean;
}

export interface SelectorProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
