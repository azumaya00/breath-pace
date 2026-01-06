export type Phase = 'inhale' | 'hold' | 'exhale';

export type BreathPresetId =
	| 'neiyang_basic'
	| 'neiyang_deep'
	| 'daily'
	| 'night'
	| 'neutral'
	| 'morning'
	| 'release';

export interface BreathPreset {
	id: BreathPresetId;
	inhaleSeconds: number;
	holdSeconds: number;
	exhaleSeconds: number;
	category: 'neiyang' | 'daily'; // 内養功系 or 日常調整系
	i18nKey: {
		name: string;
		description: string;
		note: string;
	};
}

export function getCycleSeconds(preset: BreathPreset): number {
	return preset.inhaleSeconds + preset.holdSeconds + preset.exhaleSeconds;
}

export function getRecommendedCycles(preset: BreathPreset): number {
	const cycleSeconds = getCycleSeconds(preset);
	const targetSeconds = 600; // 10分
	const cycles = Math.floor(targetSeconds / cycleSeconds);
	return Math.max(1, cycles); // 最小1回
}

export function getDurationFromCycles(preset: BreathPreset, cycles: number): {
	minutes: number;
	seconds: number;
} {
	const totalSeconds = getCycleSeconds(preset) * cycles;
	return {
		minutes: Math.floor(totalSeconds / 60),
		seconds: totalSeconds % 60
	};
}

export function getCyclesFromMinutes(preset: BreathPreset, minutes: number): number {
	const cycleSeconds = getCycleSeconds(preset);
	const targetSeconds = minutes * 60;
	const cycles = Math.floor(targetSeconds / cycleSeconds);
	return Math.max(1, cycles); // 最小1回
}

export type TimerState = 'idle' | 'running' | 'paused' | 'completed';

export interface TimerContext {
	state: TimerState;
	currentPhase: Phase;
	remainingSeconds: number;
	currentCycle: number;
	maxCycles: number;
	preset: BreathPreset | null;
}

