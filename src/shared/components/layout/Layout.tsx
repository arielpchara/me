import { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigationType } from 'react-router-dom';
import { titleFor } from '@/app/titles';
import { Footer } from './Footer';
import { Header, type HeaderVariant } from './Header';

interface LayoutProps {
  variant: HeaderVariant;
}

export function Layout({ variant }: LayoutProps) {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  // New pages open at the top; back and forward keep the browser's scroll position.
  useLayoutEffect(() => {
    if (navigationType !== 'POP') window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, navigationType]);

  useEffect(() => {
    document.title = titleFor(pathname);
  }, [pathname]);

  return (
    <>
      {/* Keyed so that the morph's imperative state never carries over to the other variant. */}
      <Header key={variant} variant={variant} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
