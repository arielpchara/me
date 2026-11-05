import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { posts, postPath } from '@/modules/blog/data/posts';
import { App } from './App';

export { titleFor } from './titles';

export const staticPaths = ['/', '/profile/', ...posts.map((post) => postPath(post.slug))];

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
}
