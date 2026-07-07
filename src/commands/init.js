import prompts from 'prompts';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import chalk from 'chalk';

export async function init() {
  console.log(chalk.bold('\ngethookd-agent — setup\n'));
  console.log('need a free api key? sign up at ' + chalk.cyan('https://gethookd.ai') + '\n');
  const r = await prompts([
    { type: 'password', name: 'apiKey', message: 'paste your gethookd api key' },
    { type: 'select', name: 'niche', message: 'default niche',
      choices: ['supplements','beauty','skincare','longevity','pets','kids-toys','fertility','gifts','other'].map(c=>({title:c,value:c})) },
    { type: 'text', name: 'productUrl', message: 'your product/landing page URL (optional)', initial: '' }
  ]);
  const cfgDir = path.join(os.homedir(), '.gethookd');
  fs.mkdirSync(cfgDir, { recursive: true });
  fs.writeFileSync(path.join(cfgDir, 'config.json'), JSON.stringify(r, null, 2));
  console.log(chalk.green('\n✓ saved to ~/.gethookd/config.json'));
  console.log('\nnext: ' + chalk.cyan('gethookd-agent build') + '\n');
}
