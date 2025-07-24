import { useRef, useState } from "react";
import type {
  PopularDestinationsState,
  PopularDestinationsActions,
} from "@/types/popularDestinations.types";

export const usePopularDestinationsScroll = (): PopularDestinationsState &
  PopularDestinationsActions & {
    scrollRef: React.RefObject<HTMLDivElement | null>;
  } => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const updateArrowVisibility = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollLeft += e.deltaY;
      updateArrowVisibility();
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      setTimeout(updateArrowVisibility, 300);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      setTimeout(updateArrowVisibility, 300);
    }
  };

  const handleScroll = () => {
    updateArrowVisibility();
  };

  return {
    scrollRef,
    showLeftArrow,
    showRightArrow,
    handleWheel,
    scrollLeft,
    scrollRight,
    updateArrowVisibility,
    handleScroll,
  };
};
