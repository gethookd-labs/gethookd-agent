import fetch from 'node-fetch';
const BASE = 'https://app.gethookd.ai/api/v1';

export async function fetchAds({ apiKey, query, perPage = 50, page = 1 }) {
  const url = `${BASE}/explore?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'User-Agent': 'gethookd-agent/0.1.2'
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`gethookd api ${res.status}: ${body.slice(0, 300)}`);
  }
  const json = await res.json();
  if (json.errors) throw new Error(`gethookd api error: ${json.message || 'unknown'}`);
  return { ads: json.data || [], meta: json.meta || {} };
}
