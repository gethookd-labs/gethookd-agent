import chalk from 'chalk';
import ora from 'ora';
import fs from 'node:fs';
import { loadConfig } from '../lib/config.js';
import { fetchAds } from '../lib/gethookd.js';
import { renderSwipeFile } from '../lib/render.js';

export async function build(opts) {
  const cfg = loadConfig();
  const niche = opts.niche || cfg.niche;
  const spinner = ora(`pulling ads for ${chalk.cyan(niche)} from gethookd.ai...`).start();
  const ads = await fetchAds({
    apiKey: cfg.apiKey,
    niche,
    minPerf: Number(opts.minPerf),
    daysActive: Number(opts.daysActive),
    limit: Number(opts.limit)
  });
  spinner.succeed(`pulled ${ads.length} ads`);
  const md = renderSwipeFile({ niche, ads });
  fs.writeFileSync(opts.out, md);
  console.log(chalk.green(`\n✓ swipe file written to ${opts.out}`));
  console.log('drop into claude: ' + chalk.dim(`"read ${opts.out} and write 10 new ad scripts using these proven hooks"`));
}
