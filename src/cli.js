#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { init } from './commands/init.js';
import { build } from './commands/build.js';
import { teardown } from './commands/teardown.js';
import { search } from './commands/search.js';
import { mcp } from './commands/mcp.js';

const program = new Command();
program
  .name('gethookd-agent')
  .description('mines 6M+ proven ads and outputs a viral swipe file for your brand')
  .version('0.1.3');

program.command('init').description('one-time setup: api key, niche, defaults').action(init);
program.command('build')
  .description('build a swipe file for a search query (niche, product, angle, brand)')
  .option('--query <q>', 'search term (e.g. "supplements", "collagen", "gut health")')
  .option('--limit <n>', 'max ads to pull', '50')
  .option('--lang <code>', 'language filter (en, es, de, nl, ... or "all")', 'en')
  .option('--out <path>', 'output path', './swipe-file.md')
  .action(build);
program.command('teardown')
  .description('competitive teardown against a product/landing page')
  .option('--url <url>', 'your landing page URL')
  .option('--out <path>', 'output path', './teardown.md')
  .action(teardown);
program.command('search')
  .description('grep your local swipe cache (FTS)')
  .argument('<query>')
  .action(search);
program.command('mcp').description('start as an MCP server (stdio)').action(mcp);

program.parseAsync().catch(e => { console.error(chalk.red('error:'), e.message); process.exit(1); });
