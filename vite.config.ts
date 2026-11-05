import { fileURLToPath, URL } from 'node:url';
import frontMatter from 'front-matter';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Splits Markdown into frontmatter and body at build time, so no YAML parser ships to the browser.
function markdownContent(): Plugin {
  return {
    name: 'markdown-content',
    transform(code, id) {
      if (!id.endsWith('.md')) return null;
      return { code: `export default ${JSON.stringify(frontMatter(code))};`, map: null };
    },
  };
}

export default defineConfig({
  plugins: [markdownContent(), react()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  server: { port: 4173 },
  preview: { port: 4173 },
});
