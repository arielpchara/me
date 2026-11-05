import { useTheme } from '@/shared/hooks/useTheme';

/** [moon] [switch] [sun] for dark and light, plus a leaf button for the charcoal palette. */
export function ThemeSwitch() {
  const { theme, setTheme, palette, setPalette } = useTheme();
  const isLight = theme === 'light';
  const isCharcoal = palette === 'charcoal';

  return (
    <>
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
      <button
        type="button"
        aria-pressed={isCharcoal}
        aria-label="Charcoal palette"
        className="theme-palette"
        onClick={() => setPalette(isCharcoal ? 'default' : 'charcoal')}
      >
        <i className="ri-leaf-line"></i>
      </button>
    </>
  );
}
