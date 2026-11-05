import { useTheme } from '@/shared/hooks/useTheme';

/** [moon] [switch] [sun]: on for light. */
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isLight}
      aria-label="Light mode"
      className="theme-switch"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
    >
      <i className="ri-moon-line theme-switch-icon theme-switch-icon--dark"></i>
      <span className="theme-switch-track">
        <span className="theme-switch-thumb"></span>
      </span>
      <i className="ri-sun-line theme-switch-icon theme-switch-icon--light"></i>
    </button>
  );
}
