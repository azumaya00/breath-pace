<script lang="ts">
	import { onMount } from 'svelte';
	import { getStoredTheme, setStoredTheme, applyTheme, getEffectiveTheme, type Theme } from '$lib/theme';
	import { t } from '$lib/i18n';

	let currentTheme: Theme = 'system';
	let effectiveTheme: 'light' | 'dark' = 'light';

	onMount(() => {
		currentTheme = getStoredTheme();
		effectiveTheme = getEffectiveTheme(currentTheme);
		applyTheme(currentTheme);
	});

	function toggleTheme() {
		// system をスキップし、light/dark を1アクションでトグル
		currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
		setStoredTheme(currentTheme);
		effectiveTheme = getEffectiveTheme(currentTheme);
		applyTheme(currentTheme);
	}

	function getAriaLabel(): string {
		if (currentTheme === 'light') {
			return $t('ui.theme.light');
		} else if (currentTheme === 'dark') {
			return $t('ui.theme.dark');
		} else {
			return $t('ui.theme.system');
		}
	}

	function getTitle(): string {
		return getAriaLabel();
	}
</script>

<button
	class="theme-toggle"
	on:click={toggleTheme}
	type="button"
	aria-label={getAriaLabel()}
	title={getTitle()}
>
	{#if effectiveTheme === 'light'}
		<!-- 太陽アイコン（ライト） -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<circle cx="12" cy="12" r="5"></circle>
			<line x1="12" y1="1" x2="12" y2="3"></line>
			<line x1="12" y1="21" x2="12" y2="23"></line>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
			<line x1="1" y1="12" x2="3" y2="12"></line>
			<line x1="21" y1="12" x2="23" y2="12"></line>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
		</svg>
	{:else}
		<!-- 月アイコン（ダーク） -->
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
		</svg>
	{/if}
</button>

<style>
	.theme-toggle {
		background: var(--color-surface);
		border: 1px solid var(--color-border);
		cursor: pointer;
		padding: 0;
		width: 40px;
		height: 40px;
		min-width: 40px;
		min-height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		color: var(--color-text);
		transition: all 0.2s ease;
	}

	.theme-toggle:hover {
		background: var(--color-bg);
		border-color: var(--color-primary);
		transform: translateY(-1px);
	}

	.theme-toggle:active {
		transform: translateY(0);
	}

	.theme-toggle svg {
		display: block;
		width: 20px;
		height: 20px;
	}
</style>

