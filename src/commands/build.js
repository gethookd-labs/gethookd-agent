import chalk from 'chalk';
import ora from 'ora';
import fs from 'node:fs';
import { loadConfig } from '../lib/config.js';
import { fetchAds } from '../lib/gethookd.js';
import { renderSwipeFile } from '../lib/render.js';

export async function build(opts) {
  const cfg = loadConfig();
  const query = opts.query || cfg.niche || 'supplements';
  const perPage = Number(opts.limit || 50);
  const langChoice = opts.lang ?? cfg.language ?? 'en';
  const language = (langChoice === 'all') ? null : langChoice;
  const spinner = ora(`pulling ${language || 'all-language'} ads for ${chalk.cyan(query)} from gethookd.ai...`).start();
  try {
    const { ads, meta, dropped } = await fetchAds({ apiKey: cfg.apiKey, query, perPage, language });
    const msg = language && dropped
      ? `pulled ${ads.length} ${language.toUpperCase()} ads (dropped ${dropped} non-${language.toUpperCase()} from the API results)`
      : `pulled ${ads.length} of ${meta.total ?? '?'} ads matching "${query}"`;
    spinner.succeed(msg);
    const md = renderSwipeFile({ query, ads, meta, language });
    fs.writeFileSync(opts.out, md);
    console.log(chalk.green(`\n✓ swipe file written to ${opts.out}`));
    console.log('drop into claude: ' + chalk.dim(`"read ${opts.out} and write 10 new ad scripts using these proven hooks"`));
  } catch (e) {
    spinner.fail(e.message);
    if (e.message.includes('401') || e.message.includes('403')) {
      console.log(chalk.yellow('\ncheck your api key — grab one at https://app.gethookd.ai/integrations/api-mcp'));
    }
    process.exit(1);
  }
}
