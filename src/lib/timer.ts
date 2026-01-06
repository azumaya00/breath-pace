import type { Phase, TimerContext, TimerState, BreathPreset } from './types';

export class BreathTimer {
	private context: TimerContext;
	private intervalId: ReturnType<typeof setInterval> | null = null;
	private onUpdate: ((context: TimerContext) => void) | null = null;
	private onPhaseChange: ((phase: Phase) => void) | null = null;
	private onTick: (() => void) | null = null;

	constructor() {
		this.context = {
			state: 'idle',
			currentPhase: 'inhale',
			remainingSeconds: 0,
			currentCycle: 0,
			maxCycles: 0,
			preset: null
		};
	}

	setOnUpdate(callback: (context: TimerContext) => void): void {
		this.onUpdate = callback;
	}

	setOnPhaseChange(callback: (phase: Phase) => void): void {
		this.onPhaseChange = callback;
	}

	setOnTick(callback: () => void): void {
		this.onTick = callback;
	}

	private notifyUpdate(): void {
		if (this.onUpdate) {
			this.onUpdate({ ...this.context });
		}
	}

	private getPhaseSeconds(phase: Phase, preset: BreathPreset): number {
		switch (phase) {
			case 'inhale':
				return preset.inhaleSeconds;
			case 'hold':
				return preset.holdSeconds;
			case 'exhale':
				return preset.exhaleSeconds;
		}
	}

	private getNextPhase(currentPhase: Phase): Phase {
		switch (currentPhase) {
			case 'inhale':
				return 'hold';
			case 'hold':
				return 'exhale';
			case 'exhale':
				return 'inhale';
		}
	}

	private startPhase(phase: Phase, preset: BreathPreset): void {
		this.context.currentPhase = phase;
		this.context.remainingSeconds = this.getPhaseSeconds(phase, preset);

		if (this.onPhaseChange) {
			this.onPhaseChange(phase);
		}

		this.notifyUpdate();
	}

	private tick(): void {
		if (!this.context.preset) {
			return;
		}

		this.context.remainingSeconds--;

		if (this.context.remainingSeconds <= 0) {
			// フェーズ切り替え時はtick音を鳴らさない
			let nextPhase = this.getNextPhase(this.context.currentPhase);

			// holdSecondsが0の場合はholdフェーズをスキップ
			if (nextPhase === 'hold' && this.context.preset.holdSeconds === 0) {
				nextPhase = 'exhale';
			}

			if (nextPhase === 'inhale' && this.context.currentPhase === 'exhale') {
				// サイクル完了
				this.context.currentCycle++;

				if (this.context.currentCycle >= this.context.maxCycles) {
					this.complete();
					return;
				}
			}

			this.startPhase(nextPhase, this.context.preset!);
		} else {
			// 通常のカウントダウン時のみtick音を鳴らす
			if (this.onTick) {
				this.onTick();
			}
			this.notifyUpdate();
		}
	}

	start(preset: BreathPreset, cycles: number): void {
		if (this.context.state === 'running') {
			return;
		}

		this.context.preset = preset;
		this.context.maxCycles = cycles;
		this.context.currentCycle = 0;
		this.context.state = 'running';

		this.startPhase('inhale', preset);

		this.intervalId = setInterval(() => {
			this.tick();
		}, 1000);
	}

	pause(): void {
		if (this.context.state !== 'running') {
			return;
		}

		this.context.state = 'paused';
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
		this.notifyUpdate();
	}

	resume(): void {
		if (this.context.state !== 'paused') {
			return;
		}

		this.context.state = 'running';
		this.intervalId = setInterval(() => {
			this.tick();
		}, 1000);
		this.notifyUpdate();
	}

	reset(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		this.context = {
			state: 'idle',
			currentPhase: 'inhale',
			remainingSeconds: 0,
			currentCycle: 0,
			maxCycles: 0,
			preset: null
		};
		this.notifyUpdate();
	}

	private complete(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}

		this.context.state = 'completed';
		this.notifyUpdate();
	}

	getContext(): TimerContext {
		return { ...this.context };
	}

	destroy(): void {
		if (this.intervalId !== null) {
			clearInterval(this.intervalId);
			this.intervalId = null;
		}
	}
}

