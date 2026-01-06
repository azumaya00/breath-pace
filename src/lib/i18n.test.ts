import { describe, it, expect } from 'vitest';
import { getTranslation, getLocale } from './i18n';

describe('i18n', () => {
	it('should get Japanese translation', () => {
		const result = getTranslation('ja', 'ui.phase.inhale');
		expect(result).toBe('吸う');
	});

	it('should get English translation', () => {
		const result = getTranslation('en', 'ui.phase.inhale');
		expect(result).toBe('Inhale');
	});

	it('should return key for missing translation', () => {
		const result = getTranslation('ja', 'ui.missing.key');
		expect(result).toBe('ui.missing.key');
	});

	it('should get nested translation', () => {
		const result = getTranslation('ja', 'preset.emergency.name');
		expect(result).toBe('非常用（7-7-7）');
	});

	it('should get locale from browser (mock test)', () => {
		// Note: This test may not work perfectly in all environments
		// but it verifies the function exists and returns a valid locale
		const locale = getLocale();
		expect(['ja', 'en']).toContain(locale);
	});
});

