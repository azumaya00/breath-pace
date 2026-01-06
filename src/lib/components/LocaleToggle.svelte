<script lang="ts">
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';
	import { getStoredLocale, setStoredLocale, getTranslation, type Locale } from '$lib/i18n';

	export let locale: Locale = 'ja';

	let currentLocale: Locale = 'ja';
	const dispatch = createEventDispatcher<{ change: Locale }>();

	onMount(() => {
		currentLocale = getStoredLocale();
	});

	function toggleLocale() {
		currentLocale = currentLocale === 'ja' ? 'en' : 'ja';
		setStoredLocale(currentLocale);
		dispatch('change', currentLocale);
	}

	function t(key: string): string {
		return getTranslation(locale, key);
	}

	function getAriaLabel(): string {
		return currentLocale === 'ja' ? t('ui.locale.ja') : t('ui.locale.en');
	}
</script>

<button
	class="locale-toggle"
	on:click={toggleLocale}
	type="button"
	aria-label={getAriaLabel()}
	title={getAriaLabel()}
>
	<span class="flag-emoji">
		{#if currentLocale === 'ja'}
			🇯🇵
		{:else}
			🇺🇸
		{/if}
	</span>
</button>

<style>
	.locale-toggle {
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
		transition: all 0.2s ease;
	}

	.locale-toggle:hover {
		background: var(--color-bg);
		border-color: var(--color-primary);
		transform: translateY(-1px);
	}

	.locale-toggle:active {
		transform: translateY(0);
	}

	.flag-emoji {
		font-size: 1.5rem;
		line-height: 1;
		display: block;
	}
</style>

