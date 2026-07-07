import chalk from 'chalk';
export async function mcp() {
  // stdio MCP shim — v0.1 stub
  process.stderr.write(chalk.dim('gethookd-agent MCP server started (stdio)\n'));
  process.stdin.resume();
}
