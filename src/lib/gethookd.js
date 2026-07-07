import fetch from 'node-fetch';
import { franc } from 'franc-min';
const BASE = 'https://app.gethookd.ai/api/v1';

// ISO 639-3 (what franc returns) -> ISO 639-1 (what we accept)
const LANG_MAP = { eng: 'en', spa: 'es', deu: 'de', fra: 'fr', por: 'pt', ita: 'it', nld: 'nl', pol: 'pl' };

function detectLang(text) {
  if (!text || text.length < 20) return null;
  const code = franc(text, { minLength: 20 });
  return LANG_MAP[code] || code;
}

export async function fetchAds({ apiKey, query, perPage = 50, page = 1, language = 'en' }) {
  // over-fetch by 4x when filtering so we still have enough after client-side drop
  const apiPerPage = language ? Math.min(perPage * 4, 200) : perPage;
  const params = new URLSearchParams({ query, per_page: String(apiPerPage), page: String(page) });
  if (language) params.set('language', language);
  const url = `${BASE}/explore?${params.toString()}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'User-Agent': 'gethookd-agent/0.1.5'
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`gethookd api ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  if (json.errors) throw new Error(`gethookd api error: ${json.message || 'unknown'}`);
  let ads = json.data || [];

  // client-side language filter on ad.body (API filter is loose — filters by page metadata not creative)
  let dropped = 0;
  if (language) {
    const before = ads.length;
    ads = ads.filter(ad => {
      const detected = detectLang(ad.body || ad.title || '');
      // keep if detection failed (too short) or matches
      return !detected || detected === language;
    });
    dropped = before - ads.length;
  }

  // trim to requested count
  ads = ads.slice(0, perPage);
  return { ads, meta: json.meta || {}, dropped };
}
