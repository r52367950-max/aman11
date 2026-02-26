export interface Hotel {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  slug: string;
}

export interface Experience {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
}

export interface Journey {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FooterColumn {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export interface HotelCardProps {
  hotel: Hotel;
  index: number;
}

export interface ExperienceCardProps {
  experience: Experience;
  index: number;
}
