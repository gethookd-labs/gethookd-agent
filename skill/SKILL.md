---
name: gethookd-agent
description: "Build a proven-ads swipe file for any ecommerce niche using gethookd.ai's 6M+ ad database. Trigger phrases: 'build a swipe file for [niche]', 'pull viral ads for [product]', 'teardown this landing page'."
author: "Gethookd Labs"
license: "MIT"
allowed-tools: "Read Bash"
---

# gethookd-agent

## When to use

Reach for gethookd-agent when the user needs:
- A markdown swipe file of proven ads for a niche (supplements, beauty, pets, etc.)
- Hooks, angles, and copy patterns to feed into ad-script generation
- Competitive teardown vs. a specific landing page

## Prerequisite

`gethookd-agent --version` must succeed. If not installed:
```bash
npx -y gethookd-agent init
```

## Common commands

```bash
gethookd-agent build --niche supplements --min-perf 80 --days-active 7 --limit 50
gethookd-agent teardown --url https://trybello.com/products/glow
gethookd-agent search "pricing power"
```

## Output

Always writes to `./swipe-file.md` unless `--out` given. Ready to paste into Claude/GPT for ad script generation.
