# gethookd-agent

**mines proven ecommerce ads from any niche and hands you a viral swipe file for your brand to steal**

built by [@gethookdai](https://x.com/gethookdai). feed it a search query, 90 seconds later you've got a markdown swipe file of ads that already printed millions in your category.

## what it does

- pulls live ad data from the [gethookd.ai](https://gethookd.ai) database (6M+ indexed ads, no scraping, no cookies, no captchas)
- searches by niche, product, angle, or brand name
- extracts hooks, angles, offers, CTAs, testimonials from every ad
- outputs one clean `swipe-file.md` — drop into Claude/GPT and generate new ad scripts instantly
- ships as an MCP server so Claude Code, Cursor, and Hermes drive it natively
- runs 100% local, one command, your own API key

cheaper than any single spytool subscription. no more copy-pasting from ad libraries. no more scraping that breaks every 3 weeks.

## install

```bash
npx -y gethookd-agent init
```

wizard walks you through:
1. paste your gethookd api key (grab from your account at [gethookd.ai](https://gethookd.ai))
2. default search query (supplements, beauty, skincare, pets, etc.)

output lands at `./swipe-file.md`.

## use it

```bash
# build a swipe file for any query
gethookd-agent build --query "gut health"
gethookd-agent build --query "collagen" --limit 100
gethookd-agent build --query "AG1" --out ag1-teardown.md
```

## use with claude code / cursor / hermes (MCP)

```bash
gethookd-agent mcp
```

then add to your MCP config:

```json
{
  "mcpServers": {
    "gethookd": { "command": "gethookd-agent", "args": ["mcp"] }
  }
}
```

trigger phrases: `build a swipe file for [query]`, `pull viral ads for [product]`, `teardown [brand name]`.

## pricing

this CLI is free and open source (MIT). the [gethookd.ai](https://gethookd.ai) API requires a paid plan — starts at $79/mo with a **7-day free trial**. cheaper than any single ad spytool subscription. see [gethookd.ai/api/](https://www.gethookd.ai/api/) for full API reference.

## license

MIT — do whatever you want.

## credits

built by [alex fedotoff](https://x.com/alexfedotofff) and the gethookd team.
