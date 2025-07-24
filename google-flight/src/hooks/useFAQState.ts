import { useState } from "react";
import type { FAQState, FAQActions } from "@/types/faq.types";

export const useFAQState = (): FAQState & FAQActions => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded((prev) => ({
        ...prev,
        [panel]: isExpanded,
      }));
    };

  return {
    expanded,
    handleChange,
  };
};
