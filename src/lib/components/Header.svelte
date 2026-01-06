<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';
	import { getStoredTheme, applyTheme } from '$lib/theme';
	import ThemeToggle from './ThemeToggle.svelte';
	import LocaleToggle from './LocaleToggle.svelte';

	const HOME_RESET_EVENT = 'breathline:reset';

	onMount(() => {
		const theme = getStoredTheme();
		applyTheme(theme);
	});

	function handleHomeClick() {
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new CustomEvent(HOME_RESET_EVENT));
		}
	}
</script>

<header class="app-header">
	<div class="header-content">
	<a class="app-title" href="/" on:click|preventDefault={handleHomeClick}>{$t('ui.appName')}</a>
		<div class="header-controls">
			<ThemeToggle />
			<LocaleToggle />
		</div>
	</div>
</header>

<style>
	.app-header {
		border-bottom: 1px solid var(--color-border);
		background: var(--color-header-bg);
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
		font-family: var(--font-brand);
		font-size: 1.5rem;
		font-weight: 400;
		color: var(--color-primary);
		margin: 0;
		line-height: 1.2;
		letter-spacing: 0.05em;
		text-decoration: none;
		display: inline-flex;
		align-items: center;
	}

	.header-controls {
		display: flex;
		gap: 0.25rem;
		align-items: center;
	}

	@media (max-width: 640px) {
		.app-title {
			font-size: 1.25rem;
		}

		.header-content {
			padding: 0 0.75rem;
		}
	}
</style>

