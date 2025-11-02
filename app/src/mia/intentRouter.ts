export type Intent =
  | { type: 'WATER_CHECK' }
  | { type: 'PRUNE_COACH' }
  | { type: 'DIY_FERTILIZER' }
  | { type: 'UNKNOWN', text?: string };

export function route(text: string): Intent {
  const t = text.toLowerCase();
  if (t.includes('water')) return { type: 'WATER_CHECK' };
  if (t.includes('prune')) return { type: 'PRUNE_COACH' };
  if (t.includes('fertilizer') || t.includes('feed')) return { type: 'DIY_FERTILIZER' };
  return { type: 'UNKNOWN', text };
}
