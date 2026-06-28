import { copyFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const rootDir = process.cwd();
const distAssetsDir = join(rootDir, 'dist', 'assets');
const branchAssetsDir = join(rootDir, 'assets');

const jsFile = readdirSync(distAssetsDir)
  .filter((file) => file.endsWith('.js'))
  .sort((a, b) => statSync(join(distAssetsDir, b)).size - statSync(join(distAssetsDir, a)).size)[0];
const cssFile = readdirSync(distAssetsDir).find((file) => file.endsWith('.css'));

if (!jsFile || !cssFile) {
  throw new Error('Could not find built JS/CSS assets in dist/assets.');
}

mkdirSync(branchAssetsDir, { recursive: true });
copyFileSync(join(distAssetsDir, jsFile), join(branchAssetsDir, 'app.js'));
copyFileSync(join(distAssetsDir, cssFile), join(branchAssetsDir, 'app.css'));
