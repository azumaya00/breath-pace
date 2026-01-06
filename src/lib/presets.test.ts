import { describe, it, expect } from 'vitest';
import { presets, getPresetById } from './presets';
import { getCycleSeconds, getRecommendedCycles, getDurationFromCycles } from './types';

describe('presets', () => {
	it('should have all required presets', () => {
		expect(presets).toHaveLength(7);
		expect(presets.map((p) => p.id)).toEqual([
			'neiyang_basic',
			'neiyang_deep',
			'daily',
			'night',
			'neutral',
			'morning',
			'release'
		]);
	});

	it('should have valid preset structure', () => {
		for (const preset of presets) {
			expect(preset.id).toBeTruthy();
			expect(preset.inhaleSeconds).toBeGreaterThan(0);
			expect(preset.holdSeconds).toBeGreaterThanOrEqual(0);
			expect(preset.exhaleSeconds).toBeGreaterThan(0);
			expect(['neiyang', 'daily']).toContain(preset.category);
			expect(preset.i18nKey.name).toBeTruthy();
			expect(preset.i18nKey.description).toBeTruthy();
			expect(preset.i18nKey.note).toBeTruthy();
		}
	});

	it('should calculate cycle seconds correctly', () => {
		const preset = presets.find((p) => p.id === 'neiyang_basic');
		expect(preset).toBeDefined();
		if (preset) {
			expect(getCycleSeconds(preset)).toBe(12); // 4+4+4
		}
	});

	it('should calculate recommended cycles for 10 minutes', () => {
		const preset = presets.find((p) => p.id === 'neiyang_basic');
		expect(preset).toBeDefined();
		if (preset) {
			const cycles = getRecommendedCycles(preset);
			expect(cycles).toBeGreaterThan(0);
			// 10分 = 600秒、1サイクル = 12秒 → 600/12 = 50回
			expect(cycles).toBe(50);
		}
	});

	it('should calculate duration from cycles', () => {
		const preset = presets.find((p) => p.id === 'daily');
		expect(preset).toBeDefined();
		if (preset) {
			const duration = getDurationFromCycles(preset, 10);
			// 1サイクル = 4+0+6 = 10秒、10回 = 100秒 = 1分40秒
			expect(duration.minutes).toBe(1);
			expect(duration.seconds).toBe(40);
		}
	});

	it('should have correct preset values', () => {
		const neiyang_basic = presets.find((p) => p.id === 'neiyang_basic');
		expect(neiyang_basic?.inhaleSeconds).toBe(4);
		expect(neiyang_basic?.holdSeconds).toBe(4);
		expect(neiyang_basic?.exhaleSeconds).toBe(4);
		expect(neiyang_basic?.category).toBe('neiyang');

		const neiyang_deep = presets.find((p) => p.id === 'neiyang_deep');
		expect(neiyang_deep?.inhaleSeconds).toBe(7);
		expect(neiyang_deep?.holdSeconds).toBe(7);
		expect(neiyang_deep?.exhaleSeconds).toBe(7);
		expect(neiyang_deep?.category).toBe('neiyang');

		const daily = presets.find((p) => p.id === 'daily');
		expect(daily?.inhaleSeconds).toBe(4);
		expect(daily?.holdSeconds).toBe(0);
		expect(daily?.exhaleSeconds).toBe(6);
		expect(daily?.category).toBe('daily');

		const night = presets.find((p) => p.id === 'night');
		expect(night?.inhaleSeconds).toBe(4);
		expect(night?.holdSeconds).toBe(0);
		expect(night?.exhaleSeconds).toBe(8);
		expect(night?.category).toBe('daily');

		const neutral = presets.find((p) => p.id === 'neutral');
		expect(neutral?.inhaleSeconds).toBe(5);
		expect(neutral?.holdSeconds).toBe(0);
		expect(neutral?.exhaleSeconds).toBe(5);
		expect(neutral?.category).toBe('daily');

		const morning = presets.find((p) => p.id === 'morning');
		expect(morning?.inhaleSeconds).toBe(6);
		expect(morning?.holdSeconds).toBe(0);
		expect(morning?.exhaleSeconds).toBe(4);
		expect(morning?.category).toBe('daily');

		const release = presets.find((p) => p.id === 'release');
		expect(release?.inhaleSeconds).toBe(3);
		expect(release?.holdSeconds).toBe(0);
		expect(release?.exhaleSeconds).toBe(6);
		expect(release?.category).toBe('daily');
	});

	it('should get preset by id', () => {
		const preset = getPresetById('neiyang_basic');
		expect(preset).toBeDefined();
		expect(preset?.id).toBe('neiyang_basic');
	});

	it('should return undefined for invalid id', () => {
		const preset = getPresetById('invalid');
		expect(preset).toBeUndefined();
	});
});

