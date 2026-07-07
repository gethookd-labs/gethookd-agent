import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
export function loadConfig() {
  const p = path.join(os.homedir(), '.gethookd', 'config.json');
  if (!fs.existsSync(p)) { throw new Error('run `gethookd-agent init` first'); }
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}
