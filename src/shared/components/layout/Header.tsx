import { useLayoutEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigationType } from 'react-router-dom';
import photo from '@/assets/header-photo.jpg';
import { heroScrollRange, useHeroMorph } from '@/shared/hooks/useHeroMorph';
import { ThemeSwitch } from './ThemeSwitch';

export type HeaderVariant = 'hero' | 'compact';

interface HeaderProps {
  variant: HeaderVariant;
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive ? 'nav-link nav-link--active' : 'nav-link';
}

export function Header({ variant }: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const isHero = variant === 'hero';
  useHeroMorph(headerRef, isHero);

  const location = useLocation();
  const navigationType = useNavigationType();
  const hideHero = (location.state as { hideHero?: boolean } | null)?.hideHero;

  // A click on the hero's menu scrolls until the hero is gone and the bar is on.
  useLayoutEffect(() => {
    if (hideHero && navigationType !== 'POP' && headerRef.current) {
      window.scrollTo({ top: heroScrollRange(headerRef.current) });
    }
  }, [location.key, hideHero, navigationType]);

  const menuState = isHero ? { hideHero: true } : undefined;

  return (
    <header ref={headerRef} className={isHero ? undefined : 'header--compact'}>
      <Link className="header-home header-home--avatar" to="/" aria-label="Ariel Pchara, home">
        <img className="header-avatar" src={photo} alt="" width="900" height="900" />
      </Link>
      {isHero && (
        <img
          className="header-photo"
          src={photo}
          alt="Portrait of Ariel Pchara"
          width="900"
          height="900"
        />
      )}
      <div className="header-content">
        <p className="header-role">Senior Software Engineer</p>
        <h1>
          <Link className="header-home" to="/">
            Ariel <span className="header-surname">Pchara</span>
          </Link>
        </h1>
        <p className="header-stack">
          React &amp; Node.js Specialist<span className="header-stack-sep"> · </span>
          <br />
          TypeScript, Microservices, AWS
        </p>
      </div>
      <nav className="site-nav">
        <NavLink to="/" end state={menuState} className={navLinkClass} aria-label="Blog">
          <i className="ri-article-line"></i> <span className="nav-label">Blog</span>
        </NavLink>
        <NavLink to="/profile/" state={menuState} className={navLinkClass} aria-label="Profile">
          <i className="ri-user-5-line"></i> <span className="nav-label">Profile</span>
        </NavLink>
        <ThemeSwitch />
      </nav>
    </header>
  );
}
