import { posts, postPath } from '@/modules/blog/data/posts';

const SITE_NAME = 'Ariel Pchara';

const titles = new Map<string, string>([
  ['/', `${SITE_NAME} — Blog`],
  ['/profile/', `${SITE_NAME} — Profile`],
  ...posts.map((post): [string, string] => [
    postPath(post.slug),
    `${post.pageTitle ?? post.title} · ${SITE_NAME}`,
  ]),
]);

export function titleFor(pathname: string): string {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return titles.get(path) ?? `Page not found · ${SITE_NAME}`;
}
