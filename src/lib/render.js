export function renderSwipeFile({ query, ads, meta = {} }) {
  const lines = [];
  lines.push(`# Swipe File: ${query}`);
  lines.push('');
  const total = meta.total ? ` of ${meta.total.toLocaleString()} matching in the gethookd DB` : '';
  lines.push(`_${ads.length} proven ads${total} — pulled from gethookd.ai_`);
  lines.push('');
  for (const [i, ad] of ads.entries()) {
    const brand = ad.brand?.name?.trim() || 'Unknown Brand';
    const perf = ad.performance_score ?? '?';
    const perfLabel = ad.performance_score_title ? ` (${ad.performance_score_title})` : '';
    const daysActive = ad.days_active ? ` · ${ad.days_active}d active` : '';
    const format = ad.display_format ? ` · ${ad.display_format}` : '';
    lines.push(`## ${i + 1}. ${brand} — perf ${perf}${perfLabel}${daysActive}${format}`);
    lines.push('');
    if (ad.title) lines.push(`**Hook:** ${ad.title}`);
    if (ad.body) {
      const body = String(ad.body).trim().split('\n').join('\n> ');
      lines.push(`\n**Copy:**\n> ${body}`);
    }
    if (ad.cta_text) lines.push(`\n**CTA:** ${ad.cta_text}${ad.cta_type ? ` (${ad.cta_type})` : ''}`);
    if (ad.landing_page) lines.push(`**Landing:** ${ad.landing_page}`);
    if (ad.share_url) lines.push(`\n[view on gethookd](${ad.share_url})`);
    lines.push('\n---\n');
  }
  return lines.join('\n');
}
