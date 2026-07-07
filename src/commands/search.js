import chalk from 'chalk';
export async function search(q) {
  console.log(chalk.yellow(`search "${q}": coming in v0.2 (local FTS cache)`));
}
