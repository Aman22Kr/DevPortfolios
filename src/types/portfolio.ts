export interface Portfolio {
  id: string;
  name: string;
  url: string;
  slug: string;
  domain: string;
  platform: string;
  firstLetter: string;
  tags?: string[];
  bio?: string;
  addedAt?: string;
  isCustom?: boolean;
}

export type SortOption = 'name-asc' | 'name-desc' | 'random' | 'newest';
export type ViewMode = 'grid' | 'compact';
