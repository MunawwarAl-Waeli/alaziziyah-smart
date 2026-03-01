// data/types.ts
export interface SubService {
  id: string;
  name: string;
  description: string;
  image?: string;
  popular?: boolean;
}

export interface ServiceSpecs {
  materials: string[];
  sizes: string[];
  warranty: string;
  installationTime: string;
}

export interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription?: string;
  icon: string;
  categoryId: number;
  subcategoryId?: number;
  subServices?: SubService[];
  specifications?: ServiceSpecs;
  features: string[];
  images?: {
    main: string;
    gallery?: string[];
  };
  stats: {
    projects: number;
    yearsExperience?: number;
  };
  pricing?: {
    min: string;
    max?: string;
    unit?: string;
  };
  popular?: boolean;
  new?: boolean;
  discount?: number;
  keywords: string[];
  seo?: {
    title: string;
    description: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  image: string;
  serviceCount: number;
}

export interface Subcategory {
  id: number;
  name: string;
  categoryId: number;
  description: string;
  slug: string;
}