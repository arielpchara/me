import { Link } from 'react-router-dom';
import { Markdown } from '@/shared/components/markdown/Markdown';
import { PostTags } from '../components/PostTags';
import type { Post } from '../types';

interface PostPageProps {
  post: Post;
}

export function PostPage({ post }: PostPageProps) {
  return (
    <article className="post-article" lang={post.lang}>
      <Link to="/" className="back-link">
        <i className="ri-arrow-left-line"></i> Back to blog
      </Link>

      {post.medium && (
        <a
          href={post.medium.url}
          className="badge-medium badge-medium--notice"
          target="_blank"
          rel="noopener"
        >
          <i className="ri-medium-line"></i> {post.medium.notice}
        </a>
      )}

      <div className="post-article-header">
        <PostTags tags={post.tags} />
        <h2 className="post-article-title">{post.title}</h2>
        {post.translation && (
          <Link to={post.translation.href} className="lang-link">
            <i className="ri-translate-2"></i> {post.translation.label}
          </Link>
        )}
      </div>

      <div className="post-content">
        <Markdown>{post.body}</Markdown>
      </div>
    </article>
  );
}
