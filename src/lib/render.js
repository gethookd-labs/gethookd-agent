export function renderSwipeFile({ niche, ads }) {
  const lines = [];
  lines.push(`# Swipe File: ${niche}`);
  lines.push('');
  lines.push(`_${ads.length} proven ads pulled from gethookd.ai_`);
  lines.push('');
  for (const [i, ad] of ads.entries()) {
    lines.push(`## ${i+1}. ${ad.brand || 'Unknown'} — perf ${ad.perf_score ?? '?'}`);
    lines.push('');
    if (ad.hook) lines.push(`**Hook:** ${ad.hook}`);
    if (ad.copy) lines.push(`\n**Copy:**\n> ${ad.copy.split('\n').join('\n> ')}`);
    if (ad.cta) lines.push(`\n**CTA:** ${ad.cta}`);
    if (ad.link) lines.push(`\n[view on gethookd](${ad.link})`);
    lines.push('\n---\n');
  }
  return lines.join('\n');
}
