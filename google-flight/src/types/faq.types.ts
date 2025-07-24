export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FAQProps {
  items?: FAQItem[];
  title?: string;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

export interface FAQState {
  expanded: Record<string, boolean>;
}

export interface FAQActions {
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}
