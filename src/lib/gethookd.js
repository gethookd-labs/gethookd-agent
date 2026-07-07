import fetch from 'node-fetch';
const BASE = 'https://api.gethookd.ai/v1';
export async function fetchAds({ apiKey, niche, minPerf, daysActive, limit }) {
  const url = `${BASE}/ads/search?niche=${encodeURIComponent(niche)}&min_perf=${minPerf}&days_active=${daysActive}&limit=${limit}`;
  const res = await fetch(url, { headers: { 'Authorization': `Bearer ${apiKey}`, 'User-Agent': 'gethookd-agent/0.1.0' } });
  if (!res.ok) { throw new Error(`gethookd api ${res.status}: ${await res.text()}`); }
  const j = await res.json();
  return j.ads || j.results || [];
}
