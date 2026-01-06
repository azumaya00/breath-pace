import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getBuildYear } from './build-date';

describe('build-date', () => {
	const originalEnv = import.meta.env;
	const originalProcessEnv = { ...process.env };

	beforeEach(() => {
		vi.resetModules();
		process.env = { ...originalProcessEnv };
	});

	afterEach(() => {
		import.meta.env = originalEnv;
		process.env = { ...originalProcessEnv };
	});

	it('should return build year from VITE_BUILD_DATE', () => {
		process.env.VITE_BUILD_DATE = '2024-03-15T10:30:00Z';
		// @ts-ignore
		import.meta.env = {
			...originalEnv,
			VITE_BUILD_DATE: '2024-03-15T10:30:00Z'
		};
		expect(getBuildYear()).toBe(2024);
	});

	it('should return current year as fallback when VITE_BUILD_DATE is not set', () => {
		process.env.VITE_BUILD_DATE = '';
		// @ts-ignore
		import.meta.env = {
			...originalEnv,
			VITE_BUILD_DATE: undefined
		};
		const currentYear = new Date().getFullYear();
		expect(getBuildYear()).toBe(currentYear);
	});

	it('should handle different date formats', () => {
		process.env.VITE_BUILD_DATE = '2023-12-31';
		// @ts-ignore
		import.meta.env = {
			...originalEnv,
			VITE_BUILD_DATE: '2023-12-31'
		};
		expect(getBuildYear()).toBe(2023);
	});
});

