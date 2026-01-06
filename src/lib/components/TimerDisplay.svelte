<script lang="ts">
	import type { TimerContext } from '$lib/types';
	import { getTranslation, type Locale } from '$lib/i18n';

	export let timerContext: TimerContext;
	export let locale: Locale;

	function t(key: string): string {
		return getTranslation(locale, key);
	}

	function getPhaseLabel(phase: string): string {
		return t(`ui.phase.${phase}`);
	}
</script>

<div class="timer-display">
	<div class="phase-indicator">
		<div class="phase-label">{getPhaseLabel(timerContext.currentPhase)}</div>
		<div class="time-display">{timerContext.remainingSeconds}</div>
		<div class="time-unit">{t('ui.seconds')}</div>
	</div>

	<div class="cycle-info">
		{timerContext.currentCycle} {t('ui.of')} {timerContext.maxCycles} {t('ui.cycle')}
	</div>
</div>

<style>
	.timer-display {
		text-align: center;
		width: 100%;
	}

	.phase-indicator {
		margin-bottom: 2rem;
	}

	.phase-label {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--color-primary);
		margin-bottom: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.time-display {
		font-size: 6rem;
		font-weight: 700;
		color: var(--color-text);
		line-height: 1;
		margin-bottom: 0.5rem;
		font-variant-numeric: tabular-nums;
	}

	.time-unit {
		font-size: 1.2rem;
		color: var(--color-secondary);
	}

	.cycle-info {
		font-size: 1.1rem;
		color: var(--color-secondary);
	}

	@media (max-width: 640px) {
		.time-display {
			font-size: 4rem;
		}

		.phase-label {
			font-size: 1.2rem;
		}
	}
</style>

