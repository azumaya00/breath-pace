export type Theme = 'system' | 'light' | 'dark';

const THEME_STORAGE_KEY = 'breath-pace-theme';

export function getStoredTheme(): Theme {
	if (typeof window === 'undefined') {
		return 'system';
	}
	const stored = localStorage.getItem(THEME_STORAGE_KEY);
	if (stored === 'light' || stored === 'dark' || stored === 'system') {
		return stored;
	}
	return 'system';
}

export function setStoredTheme(theme: Theme): void {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem(THEME_STORAGE_KEY, theme);
}

export function getEffectiveTheme(theme: Theme): 'light' | 'dark' {
	if (theme === 'system') {
		if (typeof window === 'undefined') {
			return 'light';
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	return theme;
}

export function applyTheme(theme: Theme): void {
	const effective = getEffectiveTheme(theme);
	const root = document.documentElement;
	if (theme === 'system') {
		// システム設定に委ねる場合は data-theme を外す
		root.removeAttribute('data-theme');
	} else {
		root.setAttribute('data-theme', effective);
	}
}

