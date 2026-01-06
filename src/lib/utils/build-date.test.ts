import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getBuildYear } from './build-date';

describe('build-date', () => {
	const originalEnv = import.meta.env;

	beforeEach(() => {
		vi.resetModules();
	});

	afterEach(() => {
		import.meta.env = originalEnv;
	});

	it('should return build year from VITE_BUILD_DATE', () => {
		// @ts-ignore
		import.meta.env = {
			...originalEnv,
			VITE_BUILD_DATE: '2024-03-15T10:30:00Z'
		};
		expect(getBuildYear()).toBe(2024);
	});

	it('should return current year as fallback when VITE_BUILD_DATE is not set', () => {
		// @ts-ignore
		import.meta.env = {
			...originalEnv,
			VITE_BUILD_DATE: undefined
		};
		const currentYear = new Date().getFullYear();
		expect(getBuildYear()).toBe(currentYear);
	});

	it('should handle different date formats', () => {
		// @ts-ignore
		import.meta.env = {
			...originalEnv,
			VITE_BUILD_DATE: '2023-12-31'
		};
		expect(getBuildYear()).toBe(2023);
	});
});

