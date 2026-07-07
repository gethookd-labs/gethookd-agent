# gethookd-agent

**mines 6M+ proven ads and hands you a viral swipe file for your brand to steal**

built by [@gethookdai](https://x.com/gethookdai). feed it your product + landing page + niche, 90 seconds later you've got a markdown swipe file of ads that already printed millions in your category.

## what it does

- pulls live ad data from the 6M+ ad [gethookd.ai](https://gethookd.ai) database (no scraping, no cookies, no captchas)
- filters by niche, performance score, days active, copy length, video length
- extracts hooks, angles, offers, CTAs, testimonials from every ad
- vision-classifies thumbnails (UGC vs CGI, podcast format, shock/gross)
- outputs one clean `swipe-file.md` — drop into Claude/GPT and generate new ad scripts instantly
- ships as an MCP server so Claude Code, Cursor, and Hermes drive it natively
- runs 100% local, one command, your own free gethookd api key

no more $300/mo spytool subscriptions. no more copy-pasting from ad libraries. no more scraping breaking every 3 weeks.

## install

```bash
npx -y gethookd-agent init
```

that's it. wizard walks you through:
1. paste your gethookd api key (free — sign up at [gethookd.ai](https://gethookd.ai))
2. pick a niche (supplements, beauty, skincare, pets, kids, longevity, ...)
3. optional: paste your product page URL for competitive context

output lands at `./swipe-file.md`.

## use it

```bash
# build a swipe file for a niche
gethookd-agent build --niche supplements --min-perf 80 --days-active 7

# competitive teardown against your product page
gethookd-agent teardown --url https://trybello.com/products/glow

# grep the swipe cache for a hook you half-remember
gethookd-agent search "pricing power"
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

trigger phrases: `build a swipe file for [niche]`, `teardown this landing page`, `pull viral ads for [product]`.

## why open source

we run [gethookd.ai](https://gethookd.ai) — the ad research SaaS with 6M+ ads indexed across 15+ niches. this CLI is the agent surface on top of that DB. free to use with a free api key. paid tier unlocks bigger daily quotas, video downloads, and multi-account board sync.

## license

MIT

## credits

built by [alex fedotoff](https://x.com/alexfedotofff) and the gethookd team.
