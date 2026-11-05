import { Route, Routes } from 'react-router-dom';
import { BlogPage } from '@/modules/blog/pages/BlogPage';
import { PostPage } from '@/modules/blog/pages/PostPage';
import { posts } from '@/modules/blog/data/posts';
import { ProfilePage } from '@/modules/profile/pages/ProfilePage';
import { Layout } from '@/shared/components/layout/Layout';
import { NotFoundPage } from '@/shared/pages/NotFoundPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout variant="hero" />}>
        <Route index element={<BlogPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route element={<Layout variant="compact" />}>
        {posts.map((post) => (
          <Route key={post.slug} path={post.slug} element={<PostPage post={post} />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
