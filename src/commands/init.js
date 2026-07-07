import prompts from 'prompts';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import chalk from 'chalk';

const LANGUAGES = [
  { title: 'English', value: 'en' },
  { title: 'Spanish', value: 'es' },
  { title: 'German',  value: 'de' },
  { title: 'French',  value: 'fr' },
  { title: 'Portuguese', value: 'pt' },
  { title: 'Italian', value: 'it' },
  { title: 'Dutch',   value: 'nl' },
  { title: 'Polish',  value: 'pl' },
  { title: 'All languages (no filter)', value: 'all' }
];

export async function init() {
  console.log(chalk.bold('\ngethookd-agent — setup\n'));
  console.log('need a free api key? sign up at ' + chalk.cyan('https://gethookd.ai') + '\n');
  const r = await prompts([
    { type: 'password', name: 'apiKey', message: 'paste your gethookd api key' },
    { type: 'select', name: 'niche', message: 'default search query',
      choices: ['supplements','beauty','skincare','longevity','pets','kids-toys','fertility','gifts','other'].map(c=>({title:c,value:c})) },
    { type: 'select', name: 'language', message: 'ad language (filters most non-target-language ads)',
      choices: LANGUAGES, initial: 0 },
    { type: 'text', name: 'productUrl', message: 'your product/landing page URL (optional)', initial: '' }
  ]);
  const cfgDir = path.join(os.homedir(), '.gethookd');
  fs.mkdirSync(cfgDir, { recursive: true });
  fs.writeFileSync(path.join(cfgDir, 'config.json'), JSON.stringify(r, null, 2));
  console.log(chalk.green('\n✓ saved to ~/.gethookd/config.json'));
  console.log('\nnext: ' + chalk.cyan('gethookd-agent build --query "your search"') + '\n');
}
