import { useLayoutEffect, type RefObject } from 'react';

const SNAP_DELAY_MS = 50;
const MIN_SNAP_SPEED = 0.4; // px per ms
const MAX_SNAP_SPEED = 3;
const DIMMED_PAGE_OPACITY = 0.6;
const BAR_GAP_REM = 3; // keep in step with --bar-gap
const ROLE_GAP = 8; // px between the name and the role while they travel
const ROLE_CLEAR_P = 0.15; // morph progress by which the role has slid past the name

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

function box(el: Element, base: DOMRect): Box {
  const r = el.getBoundingClientRect();
  return { x: r.left - base.left, y: r.top - base.top, w: r.width, h: r.height };
}

function fontSize(el: Element): number {
  return parseFloat(getComputedStyle(el).fontSize);
}

// Instant, because the page sets scroll-behavior: smooth for anchor links.
function jumpTo(top: number): void {
  window.scrollTo({ top, behavior: 'instant' });
}

function textWidth(el: Element): number {
  const range = document.createRange();
  range.selectNodeContents(el);
  return range.getBoundingClientRect().width;
}

function isShown(el: Element): boolean {
  return el.getClientRects().length > 0;
}

/** The scroll position where the hero is fully gone and the bar is on. */
export function heroScrollRange(header: HTMLElement): number {
  return Math.ceil(parseFloat(header.style.getPropertyValue('--range')) || 0);
}

/**
 * Morphs the hero into the compact bar as the page scrolls, and snaps a half-morphed hero
 * to whichever end the reader was heading for. Without JavaScript the hero simply stays
 * at the top of the page and scrolls away.
 */
export function useHeroMorph(ref: RefObject<HTMLElement | null>, enabled: boolean): void {
  useLayoutEffect(() => {
    const header = ref.current;
    if (!enabled || !header) return;

    const avatar = header.querySelector('.header-avatar');
    const content = header.querySelector('.header-content');
    const role = header.querySelector('.header-role');
    const name = header.querySelector('h1');
    const surname = header.querySelector('.header-surname');
    const stack = header.querySelector('.header-stack');
    if (!avatar || !content || !role || !name || !surname || !stack) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const rootStyle = document.documentElement.style;
    let range = 1;
    let stackInBar = true;
    let roleBelowName = false;
    let roleXAt = (_p: number) => 0;
    let updateFrame = 0;
    let active = true;

    const snapshot = () => {
      const base = header.getBoundingClientRect();
      return {
        height: base.height,
        avatar: box(avatar, base),
        content: box(content, base),
        role: box(role, base),
        name: box(name, base),
        surname: box(surname, base),
        stack: box(stack, base),
        nameFont: fontSize(name),
        roleFont: fontSize(role),
        stackFont: fontSize(stack),
        stackShown: isShown(stack),
      };
    };

    const setVar = (key: string, value: number | string) => {
      header.style.setProperty(`--${key}`, String(value));
    };

    const update = () => {
      updateFrame = 0;
      let p = Math.min(Math.max(window.scrollY / range, 0), 1);
      if (reduceMotion.matches) p = p < 0.5 ? 0 : 1;

      setVar('p', p);
      rootStyle.setProperty('--page-o', String(DIMMED_PAGE_OPACITY + (1 - DIMMED_PAGE_OPACITY) * p));
      // The large picture leaves first; the small one arrives in the second half.
      setVar('p-out', Math.min(p / 0.7, 1));
      setVar('p-in', Math.max((p - 0.5) / 0.5, 0));
      // The surname clears "Ariel" sideways before rising, so the words never collide.
      setVar('p-side', Math.min(p / 0.5, 1));
      setVar('p-rise', Math.max((p - 0.5) / 0.5, 0));
      // The role rides beside the name into the bar. On phones it ends up below the name,
      // so it fades while it crosses and returns once the name settles.
      setVar('role-tx', `${roleXAt(p)}px`);
      const roleFade = p < 0.1 ? 1 - p * 10 : Math.max((p - 0.95) / 0.05, 0);
      setVar('role-o', roleBelowName ? roleFade : 1);
      // The subtitle travels in view and becomes one line in the bar: it dips out only around
      // the moment the line break switches. On phones it just fades away.
      header.classList.toggle('header--bar', stackInBar && p >= 0.7);
      // The menu leaves upward with the hero's bottom edge, then returns in the bar.
      header.classList.toggle('header--navbar', p >= 0.5);
      setVar('nav-o', p < 0.5 ? Math.max(1 - p * 3, 0) : Math.max((p - 0.85) / 0.15, 0));
      const stackOpacity =
        p < 0.55 ? 1 : p < 0.7 ? 1 - (p - 0.55) / 0.15 : Math.min((p - 0.7) / 0.15, 1);
      setVar('stack-o', stackInBar ? stackOpacity : Math.max(1 - p * 2.5, 0));
    };

    // Measures the hero and the real compact bar, so both ends match the CSS exactly.
    const measure = () => {
      if (!active) return;
      header.classList.remove('header--live', 'header--bar', 'header--navbar');
      const hero = snapshot();
      const pageTop = (header.nextElementSibling as HTMLElement | null)?.getBoundingClientRect().top ?? 0;
      header.classList.add('header--compact');
      const bar = snapshot();
      header.classList.remove('header--compact');

      const scale = bar.nameFont / hero.nameFont;
      const line = hero.name.h / 2;
      const px: Record<string, number> = {
        h0: hero.height,
        h1: bar.height,
        ax: bar.avatar.x,
        ay: bar.avatar.y,
        'avatar-out': bar.avatar.x + bar.avatar.w,
        cx: hero.content.x,
        cy: hero.content.y,
        cw: hero.content.w,
        'name-x': bar.name.x - hero.name.x,
        'name-y': bar.name.y + bar.name.h / 2 - (hero.name.y + (scale * line) / 2),
        'surname-x': (bar.surname.x - bar.name.x) / scale,
        'surname-y': -line,
        'role-y': bar.role.y - hero.role.y,
        'stack-x': bar.stackShown ? bar.stack.x - hero.stack.x : 0,
        'stack-y': bar.stackShown ? bar.stack.y - hero.stack.y : 0,
      };
      Object.entries(px).forEach(([key, value]) => setVar(key, `${value}px`));
      setVar('name-s', scale);
      setVar('role-s', bar.roleFont / hero.roleFont);
      setVar('stack-s', bar.stackShown ? bar.stackFont / hero.stackFont : 1);

      stackInBar = bar.stackShown;
      roleBelowName = bar.role.y > bar.name.y + bar.name.h / 2;

      const roleEndX = bar.role.x - hero.role.x;
      const surnameW = textWidth(surname);
      // Translation that puts the role just past the right edge of the morphing name.
      const besideName = (p: number) =>
        hero.name.x +
        (bar.name.x - hero.name.x) * p +
        (1 + (scale - 1) * p) * (((bar.surname.x - bar.name.x) / scale) * Math.min(p / 0.5, 1) + surnameW) +
        ROLE_GAP -
        hero.role.x;
      const endError = roleEndX - besideName(1);
      const clearOfName = (p: number) => besideName(p) + endError * p;
      roleXAt = roleBelowName
        ? (p) => roleEndX * p
        : (p) => (p < ROLE_CLEAR_P ? (p / ROLE_CLEAR_P) * clearOfName(ROLE_CLEAR_P) : clearOfName(p));
      // The bar is fully on once the page content sits one bar gap below it.
      const barGap = parseFloat(getComputedStyle(document.documentElement).fontSize) * BAR_GAP_REM;
      range = Math.max(pageTop + window.scrollY - bar.height - barGap, 1);
      setVar('range', `${range}px`);
      header.classList.add('header--live');
      update();
    };

    // Snap: shortly after the last scroll movement, a half-morphed hero finishes in the
    // direction the reader was going, at their speed. It stops as soon as they scroll again.
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let direction = 0;
    let speed = 1;
    let snapTimer = 0;
    let snapFrame = 0;
    let snapping = false;

    const stopSnap = () => {
      window.clearTimeout(snapTimer);
      cancelAnimationFrame(snapFrame);
      snapping = false;
    };

    const snap = () => {
      const from = window.scrollY;
      // Scroll positions can round just below the fractional range: that's still the bar.
      if (from <= 0 || from >= range - 1) return;
      const target = direction >= 0 ? range : 0;
      if (reduceMotion.matches) {
        jumpTo(target);
        return;
      }
      const start = performance.now();
      const distance = Math.abs(target - from);
      snapping = true;
      const step = (now: number) => {
        const travelled = Math.min((now - start) * speed, distance);
        lastY = from + Math.sign(target - from) * travelled;
        jumpTo(lastY);
        if (travelled < distance && snapping) snapFrame = requestAnimationFrame(step);
        else snapping = false;
      };
      step(start);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const now = performance.now();
      if (!snapping) {
        if (y !== lastY) {
          direction = y > lastY ? 1 : -1;
          const elapsed = Math.max(now - lastTime, 1);
          speed = Math.min(Math.max(Math.abs(y - lastY) / elapsed, MIN_SNAP_SPEED), MAX_SNAP_SPEED);
        }
        window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(snap, SNAP_DELAY_MS);
      }
      lastY = y;
      lastTime = now;
      if (!updateFrame) updateFrame = requestAnimationFrame(update);
    };

    const takeoverEvents = ['wheel', 'touchstart', 'pointerdown', 'keydown'] as const;
    takeoverEvents.forEach((type) => window.addEventListener(type, stopSnap, { passive: true }));
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    measure();
    document.fonts?.ready.then(measure);

    return () => {
      active = false;
      stopSnap();
      cancelAnimationFrame(updateFrame);
      takeoverEvents.forEach((type) => window.removeEventListener(type, stopSnap));
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      header.classList.remove('header--live', 'header--bar', 'header--navbar');
      header.removeAttribute('style');
      rootStyle.removeProperty('--page-o');
    };
  }, [ref, enabled]);
}
