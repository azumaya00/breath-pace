<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { presets } from '$lib/presets';
	import { getTranslation, getStoredLocale, type Locale } from '$lib/i18n';
	import { BreathTimer } from '$lib/timer';
	import { BreathAudio } from '$lib/audio';
	import type { BreathPreset, Phase, TimerContext } from '$lib/types';
	import { getRecommendedCycles, getDurationFromCycles, getCyclesFromMinutes } from '$lib/types';
	import PresetSelector from '$lib/components/PresetSelector.svelte';
	import TimerDisplay from '$lib/components/TimerDisplay.svelte';
	import ControlButtons from '$lib/components/ControlButtons.svelte';

	let locale: Locale = 'ja';
	let selectedPreset: BreathPreset | null = null;
	let selectedCycles: number = 5;
	let selectedMinutes: number = 10;
	let timerContext: TimerContext = {
		state: 'idle',
		currentPhase: 'inhale',
		remainingSeconds: 0,
		currentCycle: 0,
		maxCycles: 0,
		preset: null
	};

	let timer: BreathTimer;
	let audio: BreathAudio;
	let lastPhase: Phase = 'inhale';

	onMount(() => {
		locale = getStoredLocale();
		timer = new BreathTimer();
		audio = new BreathAudio();

		timer.setOnUpdate((context) => {
			timerContext = context;
		});

		timer.setOnPhaseChange((phase) => {
			lastPhase = phase;
			audio.playPhaseChange();
		});

		timer.setOnTick(() => {
			audio.playTick();
		});
	});

	onDestroy(() => {
		if (timer) {
			timer.destroy();
		}
		if (audio) {
			audio.destroy();
		}
	});

	function handlePresetSelect(preset: BreathPreset) {
		selectedPreset = preset;
		selectedCycles = getRecommendedCycles(preset);
		const duration = getDurationFromCycles(preset, selectedCycles);
		selectedMinutes = duration.minutes || 1;
		timer.reset();
	}

	function handleCyclesChange() {
		if (!selectedPreset) return;
		const duration = getDurationFromCycles(selectedPreset, selectedCycles);
		selectedMinutes = duration.minutes || 1;
	}

	function handleMinutesChange() {
		if (!selectedPreset) return;
		selectedCycles = getCyclesFromMinutes(selectedPreset, selectedMinutes);
	}

	async function handleStart() {
		if (!selectedPreset) {
			return;
		}
		await audio.initialize();
		timer.start(selectedPreset, selectedCycles);
	}

	function handlePause() {
		timer.pause();
	}

	function handleResume() {
		timer.resume();
	}

	function handleReset() {
		timer.reset();
		// リセット後もプリセットは保持、回数も保持
	}

	function handleBack() {
		// 実行中なら停止
		if (timerContext.state === 'running' || timerContext.state === 'paused') {
			timer.reset();
		}
		selectedPreset = null;
		timer.reset();
	}

	$: durationText = (() => {
		if (!selectedPreset) {
			return '';
		}
		const duration = getDurationFromCycles(selectedPreset, selectedCycles);
		if (duration.minutes === 0) {
			return `${t('ui.durationAbout')} ${duration.seconds}${t('ui.durationSeconds')}`;
		}
		if (duration.seconds === 0) {
			return `${t('ui.durationAbout')} ${duration.minutes}${t('ui.durationMinutes')}`;
		}
		return `${t('ui.durationAbout')} ${duration.minutes}${t('ui.durationMinutes')} ${duration.seconds}${t('ui.durationSeconds')}`;
	})();

	function t(key: string): string {
		return getTranslation(locale, key);
	}
</script>

<div class="container">
	{#if timerContext.state === 'idle' && !selectedPreset}
		<p class="subtitle">{t('ui.selectPresetDescription')}</p>
		<PresetSelector {presets} {locale} on:select={(e) => handlePresetSelect(e.detail)} />
	{:else if selectedPreset}
		<div class="timer-section">
			{#if timerContext.state === 'idle'}
				<div class="preset-info">
					<h2>{t(selectedPreset.i18nKey.name)}</h2>
					<p class="description">{t(selectedPreset.i18nKey.description)}</p>
					<p class="note">{t(selectedPreset.i18nKey.note)}</p>
					<div class="preset-details">
						<span>
							{t('ui.phase.inhale')}: {selectedPreset.inhaleSeconds}{t('ui.seconds')}
						</span>
						{#if selectedPreset.holdSeconds > 0}
							<span>
								{t('ui.phase.hold')}: {selectedPreset.holdSeconds}{t('ui.seconds')}
							</span>
						{/if}
						<span>
							{t('ui.phase.exhale')}: {selectedPreset.exhaleSeconds}{t('ui.seconds')}
						</span>
					</div>
					<div class="cycles-selector">
						<div class="input-group">
							<label for="cycles-input">
								{t('ui.selectCycles')} ({t('ui.recommendedCycles')}: {getRecommendedCycles(selectedPreset)})
							</label>
							<input
								id="cycles-input"
								type="number"
								min="1"
								max="100"
								bind:value={selectedCycles}
								on:input={handleCyclesChange}
								class="cycles-input"
							/>
						</div>
						<div class="input-group">
							<label for="minutes-input">
								{t('ui.selectDuration')} ({t('ui.durationMinutes')})
							</label>
							<input
								id="minutes-input"
								type="number"
								min="1"
								max="60"
								bind:value={selectedMinutes}
								on:input={handleMinutesChange}
								class="cycles-input"
							/>
						</div>
						<p class="duration-text">
							{t('ui.duration')}: {durationText}
						</p>
						{#if selectedPreset.category === 'neiyang'}
							<p class="cycles-note">{t('ui.cyclesNote')}</p>
						{/if}
					</div>
				</div>
			{:else}
				<TimerDisplay {timerContext} {locale} />
			{/if}

			<ControlButtons
				state={timerContext.state}
				on:start={handleStart}
				on:pause={handlePause}
				on:resume={handleResume}
				on:reset={handleReset}
				on:back={handleBack}
				{locale}
			/>
		</div>
	{/if}
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.subtitle {
		text-align: center;
		color: var(--color-secondary);
		font-size: 1rem;
		margin-bottom: 2rem;
	}

	.timer-section {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2rem;
	}

	.preset-info {
		text-align: center;
		max-width: 600px;
	}

	.preset-info h2 {
		font-size: 2rem;
		margin-bottom: 1rem;
		color: var(--color-primary);
	}

	.description {
		font-size: 1.1rem;
		line-height: 1.8;
		margin-bottom: 1rem;
		color: var(--color-text);
	}

	.note {
		font-size: 0.9rem;
		color: var(--color-secondary);
		margin-bottom: 1.5rem;
		font-style: italic;
	}

	.preset-details {
		display: flex;
		gap: 1.5rem;
		justify-content: center;
		flex-wrap: wrap;
		font-size: 0.95rem;
		color: var(--color-secondary);
		margin-bottom: 2rem;
	}

	.cycles-selector {
		margin-top: 2rem;
		text-align: center;
	}

	.input-group {
		margin-bottom: 1.5rem;
	}

	.cycles-selector label {
		display: block;
		margin-bottom: 0.5rem;
		font-size: 1rem;
		color: var(--color-text);
	}

	.cycles-input {
		width: 120px;
		padding: 0.5rem;
		font-size: 1.2rem;
		text-align: center;
		border: 2px solid var(--color-border);
		border-radius: 8px;
		background: var(--color-surface);
		color: var(--color-text);
	}

	.cycles-input:focus {
		outline: none;
		border-color: var(--color-primary);
	}

	.duration-text {
		margin-top: 0.5rem;
		font-size: 0.9rem;
		color: var(--color-secondary);
	}

	.cycles-note {
		margin-top: 0.5rem;
		font-size: 0.85rem;
		color: var(--color-secondary);
		font-style: italic;
	}

	@media (max-width: 640px) {
		.preset-info h2 {
			font-size: 1.5rem;
		}

		.description {
			font-size: 1rem;
		}
	}
</style>
