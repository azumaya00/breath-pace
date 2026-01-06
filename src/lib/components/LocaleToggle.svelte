<script lang="ts">
	import { localeStore, setLocale, t } from '$lib/i18n';

	function toggleLocale() {
		const current = $localeStore;
		const next = current === 'ja' ? 'en' : 'ja';
		setLocale(next);
	}

	function getAriaLabel(): string {
		return $localeStore === 'ja' ? $t('ui.locale.ja') : $t('ui.locale.en');
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
		{#if $localeStore === 'ja'}
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

