<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { BreathPreset } from '$lib/types';
	import { getTranslation, type Locale } from '$lib/i18n';

	export let presets: BreathPreset[];
	export let locale: Locale;

	const dispatch = createEventDispatcher<{ select: BreathPreset }>();

	function t(key: string): string {
		return getTranslation(locale, key);
	}

	function getPresetLabel(preset: BreathPreset): string {
		const inhale = preset.inhaleSeconds;
		const hold = preset.holdSeconds;
		const exhale = preset.exhaleSeconds;
		return `${inhale}-${hold}-${exhale}`;
	}

	const neiyangPresets = presets.filter((p) => p.category === 'neiyang');
	const dailyPresets = presets.filter((p) => p.category === 'daily');
</script>

<div class="preset-selector">
	<h2>{t('ui.selectPreset')}</h2>
	<p class="format-help">{t('ui.presetFormatHelp')}</p>

	{#if neiyangPresets.length > 0}
		<div class="preset-group">
			<h3 class="group-title">内養功系</h3>
			<div class="preset-grid">
				{#each neiyangPresets as preset}
					<button
						class="preset-card preset-card-neiyang"
						on:click={() => dispatch('select', preset)}
						type="button"
					>
						<div class="preset-name">{t(preset.i18nKey.name)}</div>
						<div class="preset-label">{getPresetLabel(preset)}</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}

	{#if dailyPresets.length > 0}
		<div class="preset-group">
			<h3 class="group-title">日常調整系</h3>
			<div class="preset-grid">
				{#each dailyPresets as preset}
					<button
						class="preset-card preset-card-daily"
						on:click={() => dispatch('select', preset)}
						type="button"
					>
						<div class="preset-name">{t(preset.i18nKey.name)}</div>
						<div class="preset-label">{getPresetLabel(preset)}</div>
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.preset-selector {
		width: 100%;
	}

	h2 {
		text-align: center;
		margin-bottom: 1rem;
		font-size: 1.5rem;
		color: var(--color-text);
	}

	.format-help {
		text-align: center;
		margin-bottom: 2rem;
		font-size: 0.9rem;
		color: var(--color-secondary);
	}

	.preset-group {
		margin-bottom: 2.5rem;
	}

	.group-title {
		font-size: 1.1rem;
		font-weight: 600;
		color: var(--color-secondary);
		margin-bottom: 1rem;
		text-align: left;
	}

	.preset-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: 1rem;
	}

	.preset-card {
		background: var(--color-surface);
		border: 2px solid var(--color-border);
		border-radius: 12px;
		padding: 1.5rem;
		cursor: pointer;
		transition: all 0.2s ease;
		text-align: center;
	}

	.preset-card:hover {
		border-color: var(--color-primary);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	}

	.preset-card:active {
		transform: translateY(0);
	}

	.preset-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--color-text);
		margin-bottom: 0.5rem;
	}

	.preset-label {
		font-size: 0.9rem;
		color: var(--color-secondary);
	}

	@media (max-width: 640px) {
		.preset-grid {
			grid-template-columns: repeat(2, 1fr);
		}

		.preset-card {
			padding: 1rem;
		}

		.preset-label {
			font-size: 1.2rem;
		}
	}
</style>

