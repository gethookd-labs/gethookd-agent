import fetch from 'node-fetch';
const BASE = 'https://app.gethookd.ai/api/v1';

export async function fetchAds({ apiKey, query, limit = 50 }) {
  const url = `${BASE}/explore?query=${encodeURIComponent(query)}&limit=${limit}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
      'User-Agent': 'gethookd-agent/0.1.1'
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`gethookd api ${res.status}: ${body.slice(0, 200)}`);
  }
  const json = await res.json();
  if (json.errors) throw new Error(`gethookd api error: ${json.message || 'unknown'}`);
  return json.data || [];
}
