export interface HeroSectionProps {
  children: React.ReactNode;
  title?: string;
  backgroundImageUrl?: string;
  className?: string;
}

export interface HeroBackgroundProps {
  title: string;
  backgroundImageUrl?: string;
}

export interface HeroContentProps {
  children: React.ReactNode;
}
