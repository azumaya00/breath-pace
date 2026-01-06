import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BreathTimer } from './timer';
import { presets } from './presets';
import type { TimerContext, Phase } from './types';

describe('BreathTimer', () => {
	let timer: BreathTimer;
	let mockUpdate: (context: TimerContext) => void;
	let mockPhaseChange: (phase: Phase) => void;
	let mockTick: () => void;

	beforeEach(() => {
		vi.useFakeTimers();
		timer = new BreathTimer();
		mockUpdate = vi.fn();
		mockPhaseChange = vi.fn();
		mockTick = vi.fn();

		timer.setOnUpdate(mockUpdate);
		timer.setOnPhaseChange(mockPhaseChange);
		timer.setOnTick(mockTick);
	});

	afterEach(() => {
		vi.useRealTimers();
		timer.destroy();
	});

	it('should initialize with idle state', () => {
		const context = timer.getContext();
		expect(context.state).toBe('idle');
		expect(context.currentPhase).toBe('inhale');
		expect(context.remainingSeconds).toBe(0);
		expect(context.currentCycle).toBe(0);
		expect(context.preset).toBeNull();
	});

	it('should start timer with preset', () => {
		const preset = presets[0]; // neiyang_basic: 4-4-4
		timer.start(preset, 5);

		const context = timer.getContext();
		expect(context.state).toBe('running');
		expect(context.currentPhase).toBe('inhale');
		expect(context.remainingSeconds).toBe(4);
		expect(context.preset).toEqual(preset);
		expect(context.maxCycles).toBe(5);
		expect(mockPhaseChange).toHaveBeenCalledWith('inhale');
	});

	it('should transition from inhale to hold', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 5);

		// 7秒経過
		vi.advanceTimersByTime(7000);

		const context = timer.getContext();
		expect(context.currentPhase).toBe('hold');
		expect(context.remainingSeconds).toBe(7);
		expect(mockPhaseChange).toHaveBeenCalledWith('hold');
	});

	it('should transition from hold to exhale', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 5);

		// inhale完了 (7秒)
		vi.advanceTimersByTime(7000);
		// hold完了 (7秒)
		vi.advanceTimersByTime(7000);

		const context = timer.getContext();
		expect(context.currentPhase).toBe('exhale');
		expect(context.remainingSeconds).toBe(7);
		expect(mockPhaseChange).toHaveBeenCalledWith('exhale');
	});

	it('should transition from exhale to inhale (next cycle)', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 2);

		// inhale (7秒) + hold (7秒) + exhale (7秒) = 21秒
		vi.advanceTimersByTime(21000);

		const context = timer.getContext();
		expect(context.currentPhase).toBe('inhale');
		expect(context.currentCycle).toBe(1);
		expect(context.remainingSeconds).toBe(7);
	});

	it('should complete after max cycles', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 1);

		// 1サイクル完了: inhale (7) + hold (7) + exhale (7) = 21秒
		vi.advanceTimersByTime(21000);

		const context = timer.getContext();
		expect(context.state).toBe('completed');
		expect(context.currentCycle).toBe(1);
	});

	it('should pause timer', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 5);

		vi.advanceTimersByTime(3000);
		timer.pause();

		const context = timer.getContext();
		expect(context.state).toBe('paused');
		expect(context.remainingSeconds).toBe(4); // 7 - 3 = 4

		// さらに時間が経過しても変化しない
		vi.advanceTimersByTime(2000);
		expect(timer.getContext().remainingSeconds).toBe(4);
	});

	it('should resume paused timer', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 5);

		vi.advanceTimersByTime(3000);
		timer.pause();
		timer.resume();

		const context = timer.getContext();
		expect(context.state).toBe('running');

		// 再開後もカウントダウンが続く
		vi.advanceTimersByTime(2000);
		expect(timer.getContext().remainingSeconds).toBe(2);
	});

	it('should reset timer', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 5);
		vi.advanceTimersByTime(5000);
		timer.reset();

		const context = timer.getContext();
		expect(context.state).toBe('idle');
		expect(context.currentPhase).toBe('inhale');
		expect(context.remainingSeconds).toBe(0);
		expect(context.currentCycle).toBe(0);
		expect(context.preset).toBeNull();
	});

	it('should tick every second', () => {
		const preset = presets[1]; // neiyang_deep: 7-7-7
		timer.start(preset, 5);

		vi.advanceTimersByTime(3000);
		expect(mockTick).toHaveBeenCalledTimes(3);
	});

	it('should handle preset without hold phase', () => {
		const preset = presets[2]; // daily: 4-0-6
		timer.start(preset, 5);

		expect(timer.getContext().currentPhase).toBe('inhale');
		expect(timer.getContext().remainingSeconds).toBe(4);

		// inhale完了後、holdをスキップしてexhaleへ
		vi.advanceTimersByTime(4000);
		const context = timer.getContext();
		expect(context.currentPhase).toBe('exhale');
		expect(context.remainingSeconds).toBe(6);
		// holdフェーズの切替音が鳴らないことを確認
		expect(mockPhaseChange).toHaveBeenCalledWith('inhale');
		expect(mockPhaseChange).toHaveBeenCalledWith('exhale');
		expect(mockPhaseChange).not.toHaveBeenCalledWith('hold');
	});
});

