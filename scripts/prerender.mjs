// Renders every route to static HTML, so each URL is a real file with its content in it.
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, staticPaths, titleFor } = await import(join(ssrDir, 'entry-server.js'));
const template = await readFile(join(dist, 'index.html'), 'utf8');

function page(url) {
  return template
    .replace('<!--app-html-->', () => render(url))
    .replace(/<title>.*?<\/title>/, () => `<title>${titleFor(url)}</title>`);
}

for (const path of staticPaths) {
  const dir = join(dist, path);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, 'index.html'), page(path));
}
await writeFile(join(dist, '404.html'), page('/404/'));
await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${staticPaths.length} pages and 404.html`);
