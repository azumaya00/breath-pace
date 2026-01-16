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
		id: 'resonant',
		inhaleSeconds: 5,
		holdSeconds: 0,
		exhaleSeconds: 5,
		category: 'daily',
		i18nKey: {
			name: 'preset.resonant.name',
			description: 'preset.resonant.description',
			note: 'preset.resonant.note'
		}
	},
	{
		id: 'relax_sleep',
		inhaleSeconds: 4,
		holdSeconds: 0,
		exhaleSeconds: 8,
		category: 'daily',
		i18nKey: {
			name: 'preset.relax_sleep.name',
			description: 'preset.relax_sleep.description',
			note: 'preset.relax_sleep.note'
		}
	},
	{
		id: 'stress_relief',
		inhaleSeconds: 4,
		holdSeconds: 4,
		exhaleSeconds: 8,
		category: 'daily',
		i18nKey: {
			name: 'preset.stress_relief.name',
			description: 'preset.stress_relief.description',
			note: 'preset.stress_relief.note'
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

