import chalk from 'chalk';
import ora from 'ora';
import fs from 'node:fs';
import { loadConfig } from '../lib/config.js';
import { fetchAds } from '../lib/gethookd.js';
import { renderSwipeFile } from '../lib/render.js';

export async function build(opts) {
  const cfg = loadConfig();
  const query = opts.query || cfg.niche || 'supplements';
  const spinner = ora(`pulling ads for ${chalk.cyan(query)} from gethookd.ai...`).start();
  try {
    const ads = await fetchAds({ apiKey: cfg.apiKey, query, limit: Number(opts.limit) });
    spinner.succeed(`pulled ${ads.length} ads`);
    const md = renderSwipeFile({ query, ads });
    fs.writeFileSync(opts.out, md);
    console.log(chalk.green(`\n✓ swipe file written to ${opts.out}`));
    console.log('drop into claude: ' + chalk.dim(`"read ${opts.out} and write 10 new ad scripts using these proven hooks"`));
  } catch (e) {
    spinner.fail(e.message);
    if (e.message.includes('401') || e.message.includes('403')) {
      console.log(chalk.yellow('\ncheck your api key — get one at https://gethookd.ai/api/'));
    }
    process.exit(1);
  }
}
