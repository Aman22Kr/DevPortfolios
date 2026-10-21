import rawData from './portfolios.json';
import { Portfolio } from '../types/portfolio';
import { getCustomPortfolios } from '../utils/storage';

export const INITIAL_PORTFOLIOS: Portfolio[] = rawData as Portfolio[];

export function getAllPortfolios(): Portfolio[] {
  const custom = getCustomPortfolios();
  if (!custom || custom.length === 0) {
    return INITIAL_PORTFOLIOS;
  }
  // Custom user-submitted portfolios appear first with special indicator
  return [...custom, ...INITIAL_PORTFOLIOS];
}

export function getPortfolioBySlug(slug: string): Portfolio | undefined {
  const all = getAllPortfolios();
  return all.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
}

export function getPortfolioById(id: string): Portfolio | undefined {
  const all = getAllPortfolios();
  return all.find((p) => p.id === id);
}

export function getLettersWithCounts(): { letter: string; count: number }[] {
  const all = getAllPortfolios();
  const counts: Record<string, number> = {};

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  alphabet.forEach((l) => {
    counts[l] = 0;
  });
  counts['#'] = 0;

  all.forEach((p) => {
    const l = p.firstLetter;
    if (counts[l] !== undefined) {
      counts[l]++;
    } else {
      counts['#'] = (counts['#'] || 0) + 1;
    }
  });

  const list = alphabet.map((l) => ({ letter: l, count: counts[l] || 0 }));
  list.push({ letter: '#', count: counts['#'] || 0 });
  return list;
}

export function getPlatforms(): string[] {
  const all = getAllPortfolios();
  const set = new Set<string>();
  all.forEach((p) => {
    if (p.platform) set.add(p.platform);
  });
  return Array.from(set).sort();
}

export function getRandomPortfolios(count: number, excludeId?: string): Portfolio[] {
  const all = getAllPortfolios().filter((p) => p.id !== excludeId);
  const shuffled = [...all].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
