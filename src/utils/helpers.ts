export function getInitials(name: string): string {
  if (!name) return 'DP';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const GRADIENTS = [
  'from-indigo-600/30 via-purple-600/20 to-pink-600/30',
  'from-blue-600/30 via-cyan-600/20 to-teal-600/30',
  'from-violet-600/30 via-fuchsia-600/20 to-indigo-600/30',
  'from-emerald-600/30 via-teal-600/20 to-sky-600/30',
  'from-amber-600/30 via-orange-600/20 to-rose-600/30',
  'from-rose-600/30 via-pink-600/20 to-purple-600/30',
];

export function getAvatarGradient(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % GRADIENTS.length;
  return GRADIENTS[index];
}

export function cleanUrlDisplay(url: string): string {
  try {
    const parsed = new URL(url);
    const path = parsed.pathname === '/' ? '' : parsed.pathname;
    return (parsed.hostname.replace(/^www\./, '') + path).slice(0, 32);
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 32);
  }
}
