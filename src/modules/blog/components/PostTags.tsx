import type { ReactNode } from 'react';

interface PostTagsProps {
  tags: string[];
  children?: ReactNode;
}

export function PostTags({ tags, children }: PostTagsProps) {
  return (
    <div className="post-meta">
      {tags.map((tag) => (
        <span key={tag} className="post-tag">
          {tag}
        </span>
      ))}
      {children}
    </div>
  );
}
