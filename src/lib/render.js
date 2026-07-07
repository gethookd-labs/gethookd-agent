export function renderSwipeFile({ query, ads }) {
  const lines = [];
  lines.push(`# Swipe File: ${query}`);
  lines.push('');
  lines.push(`_${ads.length} proven ads pulled from gethookd.ai_`);
  lines.push('');
  for (const [i, ad] of ads.entries()) {
    const brand = ad.brand_name || ad.brand || ad.page_name || 'Unknown';
    const perf = ad.performance_score ?? ad.perf_score ?? '?';
    lines.push(`## ${i+1}. ${brand} — perf ${perf}`);
    lines.push('');
    const hook = ad.hook || ad.headline || (ad.body_text || '').split('\n')[0];
    if (hook) lines.push(`**Hook:** ${hook}`);
    const copy = ad.body_text || ad.copy || ad.text;
    if (copy) lines.push(`\n**Copy:**\n> ${String(copy).split('\n').join('\n> ')}`);
    const cta = ad.cta || ad.call_to_action;
    if (cta) lines.push(`\n**CTA:** ${cta}`);
    const link = ad.share_url || ad.link || ad.url;
    if (link) lines.push(`\n[view on gethookd](${link})`);
    lines.push('\n---\n');
  }
  return lines.join('\n');
}
