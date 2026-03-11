export interface Author {
  id: string;
  name: string;
  title: string;
  avatar?: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  icon?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: Category;
  metaDescription:string;
  author: Author;
  coverImage: string;
  images?: string[];
  date: string; // ISO date
  updatedAt?: string;
  readTime: number; // بالدقائق
  tags: string[];
  featured: boolean;
  views: number;
  city?: City;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  region: string;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalPosts: number;
  postsPerPage: number;
}

export interface PostsResponse {
  posts: BlogPost[];
  pagination: PaginationData;
}

export interface SearchFilters {
  category?: string;
  city?: string;
  tag?: string;
  author?: string;
  query?: string;
  page: number;
}
