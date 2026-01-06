<script lang="ts">
	import { onMount } from 'svelte';
	import { getStoredLocale, getLocale, type Locale } from '$lib/i18n';
	import { getTranslation } from '$lib/i18n';
	import { getStoredTheme, applyTheme } from '$lib/theme';
	import ThemeToggle from './ThemeToggle.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	let locale: Locale = 'ja';
	let localeToggleKey = 0;

	onMount(() => {
		locale = getStoredLocale();
		const theme = getStoredTheme();
		applyTheme(theme);
	});

	function handleLocaleChange(event: CustomEvent<Locale>) {
		locale = event.detail;
		localeToggleKey++;
	}

	function t(key: string): string {
		return getTranslation(locale, key);
	}
</script>

<header class="app-header">
	<div class="header-content">
		<h1 class="app-title">{t('ui.appName')}</h1>
		<div class="header-controls">
			<ThemeToggle {locale} />
			<LocaleToggle key={localeToggleKey} {locale} on:change={handleLocaleChange} />
		</div>
	</div>
</header>

<style>
	.app-header {
		border-bottom: 1px solid var(--color-border);
		background: var(--color-bg);
		height: var(--header-height);
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		align-items: center;
	}

	.header-content {
		max-width: 1200px;
		width: 100%;
		margin: 0 auto;
		padding: 0 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		height: 100%;
	}

	.app-title {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--color-primary);
		margin: 0;
		line-height: 1;
	}

	.header-controls {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	@media (max-width: 640px) {
		.app-title {
			font-size: 1.1rem;
		}

		.header-content {
			padding: 0 0.75rem;
		}
	}
</style>

