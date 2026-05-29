import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getInitialTheme, applyTheme, toggleTheme, STORAGE_KEY } from '../src/scripts/theme';

function mockMatchMedia(prefersDark: boolean) {
  vi.stubGlobal('matchMedia', (q: string) => ({
    matches: prefersDark && q.includes('dark'),
    media: q,
    addEventListener: () => {},
    removeEventListener: () => {},
  }));
}

describe('theme', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('uses stored theme when present', () => {
    localStorage.setItem(STORAGE_KEY, 'light');
    mockMatchMedia(true);
    expect(getInitialTheme()).toBe('light');
  });

  it('falls back to OS preference when nothing stored', () => {
    mockMatchMedia(true);
    expect(getInitialTheme()).toBe('dark');
    mockMatchMedia(false);
    expect(getInitialTheme()).toBe('light');
  });

  it('applyTheme sets the data-theme attribute', () => {
    applyTheme('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggleTheme flips, persists, and returns the new theme', () => {
    applyTheme('light');
    const next = toggleTheme();
    expect(next).toBe('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
