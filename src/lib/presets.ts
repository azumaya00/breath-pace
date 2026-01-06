import type { BreathPreset } from './types';

export const presets: BreathPreset[] = [
	{
		id: 'neiyang_basic',
		inhaleSeconds: 4,
		holdSeconds: 4,
		exhaleSeconds: 4,
		category: 'neiyang',
		i18nKey: {
			name: 'preset.neiyang_basic.name',
			description: 'preset.neiyang_basic.description',
			note: 'preset.neiyang_basic.note'
		}
	},
	{
		id: 'neiyang_deep',
		inhaleSeconds: 7,
		holdSeconds: 7,
		exhaleSeconds: 7,
		category: 'neiyang',
		i18nKey: {
			name: 'preset.neiyang_deep.name',
			description: 'preset.neiyang_deep.description',
			note: 'preset.neiyang_deep.note'
		}
	},
	{
		id: 'daily',
		inhaleSeconds: 4,
		holdSeconds: 0,
		exhaleSeconds: 6,
		category: 'daily',
		i18nKey: {
			name: 'preset.daily.name',
			description: 'preset.daily.description',
			note: 'preset.daily.note'
		}
	},
	{
		id: 'night',
		inhaleSeconds: 4,
		holdSeconds: 0,
		exhaleSeconds: 8,
		category: 'daily',
		i18nKey: {
			name: 'preset.night.name',
			description: 'preset.night.description',
			note: 'preset.night.note'
		}
	},
	{
		id: 'neutral',
		inhaleSeconds: 5,
		holdSeconds: 0,
		exhaleSeconds: 5,
		category: 'daily',
		i18nKey: {
			name: 'preset.neutral.name',
			description: 'preset.neutral.description',
			note: 'preset.neutral.note'
		}
	},
	{
		id: 'morning',
		inhaleSeconds: 6,
		holdSeconds: 0,
		exhaleSeconds: 4,
		category: 'daily',
		i18nKey: {
			name: 'preset.morning.name',
			description: 'preset.morning.description',
			note: 'preset.morning.note'
		}
	},
	{
		id: 'release',
		inhaleSeconds: 3,
		holdSeconds: 0,
		exhaleSeconds: 6,
		category: 'daily',
		i18nKey: {
			name: 'preset.release.name',
			description: 'preset.release.description',
			note: 'preset.release.note'
		}
	}
];

export function getPresetById(id: string): BreathPreset | undefined {
	return presets.find((p) => p.id === id);
}

