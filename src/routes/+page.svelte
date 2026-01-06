<script lang="ts">
import { onMount, onDestroy } from 'svelte';
	import { presets } from '$lib/presets';
import { t, localeStore, type Locale } from '$lib/i18n';
	import { BreathTimer } from '$lib/timer';
	import { BreathAudio } from '$lib/audio';
	import type { BreathPreset, Phase, TimerContext } from '$lib/types';
	import { getRecommendedCycles, getDurationFromCycles, getCyclesFromMinutes } from '$lib/types';
	import PresetSelector from '$lib/components/PresetSelector.svelte';
	import TimerDisplay from '$lib/components/TimerDisplay.svelte';
	import ControlButtons from '$lib/components/ControlButtons.svelte';

	let selectedPreset: BreathPreset | null = null;
	let selectedCycles: number = 5;
	let selectedMinutes: number = 10;
let shareMessage = '';
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
const HOME_RESET_EVENT = 'breathline:reset';

onMount(() => {
		timer = new BreathTimer();
		audio = new BreathAudio();

	const handleHomeReset = () => {
		if (timerContext.state === 'running' || timerContext.state === 'paused') {
			timer.reset();
		}
		selectedPreset = null;
		timer.reset();
	};

	window.addEventListener(HOME_RESET_EVENT, handleHomeReset);

		timer.setOnUpdate((context) => {
			timerContext = context;
		});

		timer.setOnPhaseChange((phase) => {
			lastPhase = phase;
			audio.playPhaseChange(phase);
		});

	timer.setOnTick(() => {
		audio.playTick();
	});

	return () => {
		window.removeEventListener(HOME_RESET_EVENT, handleHomeReset);
	};
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

	async function handleShare() {
		const shareData = {
			title: 'Breathline',
			text: $t('ui.shareDescription'),
			url: typeof window !== 'undefined' ? window.location.href : ''
		};

		if (typeof navigator !== 'undefined' && navigator.share) {
			try {
				await navigator.share(shareData);
				return;
			} catch (error) {
				// fallback to copy
			}
		}

		await handleCopyLink();
	}

	async function handleCopyLink() {
		if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
			return;
		}
		await navigator.clipboard.writeText(window.location.href);
		shareMessage = $t('ui.copySuccess');
		setTimeout(() => {
			shareMessage = '';
		}, 2500);
	}

	function handleShareToX() {
		if (typeof window === 'undefined') return;
		const text = encodeURIComponent($t('ui.shareDescription'));
		const url = encodeURIComponent(window.location.href);
		const intentUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
		window.open(intentUrl, '_blank', 'noopener,noreferrer');
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

	// durationTextをlocale変更に追従させるため、$localeStoreを依存関係に含める
	$: durationText = (() => {
		if (!selectedPreset) {
			return '';
		}
		// $localeStoreを参照して、locale変更時に再計算されるようにする
		const _ = $localeStore;
		const duration = getDurationFromCycles(selectedPreset, selectedCycles);
		const tFunc = $t;
		if (duration.minutes === 0) {
			return `${tFunc('ui.durationAbout')} ${duration.seconds}${tFunc('ui.durationSeconds')}`;
		}
		if (duration.seconds === 0) {
			return `${tFunc('ui.durationAbout')} ${duration.minutes}${tFunc('ui.durationMinutes')}`;
		}
		return `${tFunc('ui.durationAbout')} ${duration.minutes}${tFunc('ui.durationMinutes')} ${duration.seconds}${tFunc('ui.durationSeconds')}`;
	})();
</script>

<div class="container">
	{#if timerContext.state === 'idle' && !selectedPreset}
		<p class="subtitle">{$t('ui.selectPresetDescription')}</p>
		<PresetSelector {presets} on:select={(e) => handlePresetSelect(e.detail)} />
		<div class="share-actions">
			<button class="share-btn primary" type="button" on:click={handleShare} aria-label={$t('ui.share')}>
				{$t('ui.share')}
			</button>
			<button class="share-btn ghost" type="button" on:click={handleCopyLink} aria-label={$t('ui.copyLink')}>
				{$t('ui.copyLink')}
			</button>
			<button class="share-btn ghost" type="button" on:click={handleShareToX} aria-label={$t('ui.shareToX')}>
				{$t('ui.shareToX')}
			</button>
		</div>
		{#if shareMessage}
			<p class="share-message">{shareMessage}</p>
		{/if}
	{:else if selectedPreset}
		<div class="timer-section">
			{#if timerContext.state === 'idle'}
				<div class="preset-info">
					<h2>{$t(selectedPreset.i18nKey.name)}</h2>
					<p class="description">{$t(selectedPreset.i18nKey.description)}</p>
					<p class="note">{$t(selectedPreset.i18nKey.note)}</p>
					<div class="preset-details">
						<span>
							{$t('ui.phase.inhale')}: {selectedPreset.inhaleSeconds}{$t('ui.seconds')}
						</span>
						{#if selectedPreset.holdSeconds > 0}
							<span>
								{$t('ui.phase.hold')}: {selectedPreset.holdSeconds}{$t('ui.seconds')}
							</span>
						{/if}
						<span>
							{$t('ui.phase.exhale')}: {selectedPreset.exhaleSeconds}{$t('ui.seconds')}
						</span>
					</div>
					<div class="cycles-selector">
						<div class="input-group">
							<label for="cycles-input">
								{$t('ui.selectCycles')} ({$t('ui.recommendedCycles')}: {getRecommendedCycles(selectedPreset)})
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
								{$t('ui.selectDuration')} ({$t('ui.durationMinutes')})
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
							{$t('ui.duration')}: {durationText}
						</p>
						{#if selectedPreset.category === 'neiyang'}
							<p class="cycles-note">{$t('ui.cyclesNote')}</p>
						{/if}
					</div>
				</div>
			{:else}
				<TimerDisplay {timerContext} />
			{/if}

			<ControlButtons
				state={timerContext.state}
				on:start={handleStart}
				on:pause={handlePause}
				on:resume={handleResume}
				on:reset={handleReset}
				on:back={handleBack}
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

	.share-actions {
		display: flex;
		justify-content: center;
		gap: 0.5rem;
		margin-bottom: 0.5rem;
		flex-wrap: wrap;
	}

	.share-btn {
		border: 1px solid var(--color-border);
		background: var(--color-surface);
		color: var(--color-text);
		padding: 0.5rem 0.9rem;
		border-radius: 8px;
		cursor: pointer;
		font-size: 0.95rem;
		transition: all 0.2s ease;
	}

	.share-btn.primary {
		background: var(--color-primary);
		color: #fff;
		border-color: var(--color-primary);
	}

	.share-btn.ghost:hover {
		border-color: var(--color-primary);
	}

	.share-btn:hover {
		transform: translateY(-1px);
	}

	.share-btn:active {
		transform: translateY(0);
	}

	.share-message {
		text-align: center;
		color: var(--color-secondary);
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
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
