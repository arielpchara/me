import { Link } from 'react-router-dom';
import { postPath } from '../data/posts';
import type { Post } from '../types';
import { PostTags } from './PostTags';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const path = postPath(post.slug);

  return (
    <article className="post-card">
      <PostTags tags={post.tags}>
        {post.medium && (
          <span className="badge-medium">
            <i className="ri-medium-line"></i> {post.medium.badge}
          </span>
        )}
      </PostTags>
      <h3 className="post-title">
        <Link to={path}>{post.cardTitle ?? post.title}</Link>
      </h3>
      <p className="post-excerpt">{post.excerpt}</p>
      <Link to={path} className="post-read-more">
        Read more <i className="ri-arrow-right-line"></i>
      </Link>
    </article>
  );
}
