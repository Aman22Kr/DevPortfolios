import { Portfolio, ViewMode } from '../types/portfolio';

const STORAGE_KEYS = {
  BOOKMARKS: 'devportfolios_bookmarks_v1',
  RECENTLY_VIEWED: 'devportfolios_recently_viewed_v1',
  CUSTOM_PORTFOLIOS: 'devportfolios_custom_items_v1',
  SEARCH_HISTORY: 'devportfolios_search_history_v1',
  VIEW_MODE: 'devportfolios_view_mode_v1',
  CONTACT_SUBMISSIONS: 'devportfolios_contact_msgs_v1',
};

// Safe wrapper for JSON parse
function safeGet<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (err) {
    console.warn(`Error reading key "${key}" from localStorage:`, err);
    return defaultValue;
  }
}

function safeSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`Error writing key "${key}" to localStorage:`, err);
  }
}

// Bookmarks (stores array of portfolio IDs)
export function getBookmarks(): string[] {
  return safeGet<string[]>(STORAGE_KEYS.BOOKMARKS, []);
}

export function isBookmarked(portfolioId: string): boolean {
  const bookmarks = getBookmarks();
  return bookmarks.includes(portfolioId);
}

export function toggleBookmark(portfolioId: string): boolean {
  const bookmarks = getBookmarks();
  const exists = bookmarks.includes(portfolioId);
  let updated: string[];
  if (exists) {
    updated = bookmarks.filter((id) => id !== portfolioId);
  } else {
    updated = [portfolioId, ...bookmarks];
  }
  safeSet(STORAGE_KEYS.BOOKMARKS, updated);
  // Dispatch custom storage event for sync across components
  window.dispatchEvent(new Event('devportfolios_bookmarks_updated'));
  return !exists;
}

export function clearAllBookmarks(): void {
  safeSet(STORAGE_KEYS.BOOKMARKS, []);
  window.dispatchEvent(new Event('devportfolios_bookmarks_updated'));
}

// Custom Portfolios (submitted by user)
export function getCustomPortfolios(): Portfolio[] {
  return safeGet<Portfolio[]>(STORAGE_KEYS.CUSTOM_PORTFOLIOS, []);
}

export function addCustomPortfolio(portfolio: Portfolio): void {
  const existing = getCustomPortfolios();
  const updated = [portfolio, ...existing];
  safeSet(STORAGE_KEYS.CUSTOM_PORTFOLIOS, updated);
  window.dispatchEvent(new Event('devportfolios_data_updated'));
}

// Recently Viewed (stores array of portfolio IDs, max 20)
export function getRecentlyViewed(): string[] {
  return safeGet<string[]>(STORAGE_KEYS.RECENTLY_VIEWED, []);
}

export function addRecentlyViewed(portfolioId: string): void {
  const recent = getRecentlyViewed().filter((id) => id !== portfolioId);
  const updated = [portfolioId, ...recent].slice(0, 24);
  safeSet(STORAGE_KEYS.RECENTLY_VIEWED, updated);
}

// Search History
export function getSearchHistory(): string[] {
  return safeGet<string[]>(STORAGE_KEYS.SEARCH_HISTORY, []);
}

export function addSearchTerm(term: string): void {
  const clean = term.trim();
  if (!clean || clean.length < 2) return;
  const history = getSearchHistory().filter((t) => t.toLowerCase() !== clean.toLowerCase());
  const updated = [clean, ...history].slice(0, 10);
  safeSet(STORAGE_KEYS.SEARCH_HISTORY, updated);
}

export function clearSearchHistory(): void {
  safeSet(STORAGE_KEYS.SEARCH_HISTORY, []);
}

// View Mode preference
export function getSavedViewMode(): ViewMode {
  const val = safeGet<ViewMode>(STORAGE_KEYS.VIEW_MODE, 'grid');
  return val === 'compact' ? 'compact' : 'grid';
}

export function saveViewMode(mode: ViewMode): void {
  safeSet(STORAGE_KEYS.VIEW_MODE, mode);
}

// Contact messages
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

export function saveContactSubmission(msg: ContactMessage): void {
  const existing = safeGet<ContactMessage[]>(STORAGE_KEYS.CONTACT_SUBMISSIONS, []);
  safeSet(STORAGE_KEYS.CONTACT_SUBMISSIONS, [msg, ...existing]);
}
