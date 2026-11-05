import { PostCard } from '../components/PostCard';
import { listedPosts } from '../data/posts';

export function BlogPage() {
  return (
    <section>
      <h2>
        <i className="ri-article-line section-icon"></i> Blog
      </h2>
      <p className="blog-intro">
        Thoughts on software architecture, JavaScript, and engineering craft.
      </p>
      <div className="post-list">
        {listedPosts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
