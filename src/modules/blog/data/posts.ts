import type { Post, PostAttributes } from '../types';

const files = import.meta.glob<{ attributes: PostAttributes; body: string }>('/content/posts/*.md', {
  import: 'default',
  eager: true,
});

export const posts: Post[] = Object.values(files).map(({ attributes, body }) => ({
  ...attributes,
  body,
}));

export const listedPosts: Post[] = posts
  .filter((post) => post.listed !== false)
  .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

export function postPath(slug: string): string {
  return `/${slug}/`;
}
