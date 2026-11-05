import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <article className="post-article">
      <Link to="/" className="back-link">
        <i className="ri-arrow-left-line"></i> Back to blog
      </Link>
      <div className="post-article-header">
        <h2 className="post-article-title">Page not found</h2>
      </div>
      <div className="post-content">
        <p>This page doesn't exist, or it has moved.</p>
      </div>
    </article>
  );
}
