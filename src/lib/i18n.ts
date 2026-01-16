import { writable, get, derived } from 'svelte/store';

export type Locale = 'ja' | 'en';

export const LOCALE_STORAGE_KEY = 'breath-pace-locale';

export interface Translations {
	[key: string]: string | Translations;
}

const translations: Record<Locale, Translations> = {
	ja: {
		preset: {
			neiyang_basic: {
				name: '内養功・基礎',
				description:
					'内養功の導入として、短めの秒数から始め、呼吸の感覚を整えるための呼吸法です。内養功では、このような呼吸から入り、体調や呼吸の深さに合わせて徐々に伸ばしていくことがあります。',
				note: '体調に合わせて秒数や回数を調整してください。無理をせず、自然な呼吸のリズムを感じながら行います。'
			},
			neiyang_deep: {
				name: '内養功・深める',
				description:
					'呼吸の感覚をさらに深めるための呼吸法です。呼吸が落ち着いている人が、より深い呼吸へと進む際に用いることがあります。無理に行うものではなく、体調に合わせて調整しながら実践します。',
				note: '体調に合わせて秒数や回数を調整してください。呼吸が整っている状態で行うことが大切です。'
			},
			resonant: {
				name: '共鳴呼吸',
				description:
					'心拍変動を最適化し、自律神経系を整える呼吸法です。1分間に約5.5回のリズムで行うことで、心身のバランスを整え、ストレス軽減や集中力向上に効果があるとされています。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			},
			relax_sleep: {
				name: 'リラックス・入眠補助',
				description:
					'4-7-8呼吸法をベースにした、リラックスと入眠をサポートする呼吸法です。長めの呼気により副交感神経を活性化し、心身をリラックス状態に導きます。就寝前の実践に特に効果的です。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			},
			stress_relief: {
				name: 'ストレス軽減',
				description:
					'ストレスや不安を軽減するための呼吸法です。4-4-8のリズムで行うことで、心拍数を下げ、緊張を和らげ、心身のバランスを整えます。日常的なストレス管理や、緊張した場面での実践に適しています。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			},
			release: {
				name: '緊張解放',
				description:
					'緊張を和らげる際に用いることがあります。短く吸って長く吐くことで、呼吸のリズムを整えます。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			}
		},
		ui: {
			phase: {
				inhale: '吸う',
				hold: '止める',
				exhale: '吐く'
			},
			cycle: '回',
			of: '/',
			seconds: '秒',
			start: 'スタート',
			pause: '一時停止',
			resume: '再開',
			reset: 'リセット',
			back: '戻る',
			selectPreset: 'プリセットを選択',
			selectPresetDescription: '体調や目的に合わせて呼吸法を選択してください',
			presetFormatHelp: '表記は 吸う-止める-吐く（秒）',
			cycles: '回数',
			recommendedCycles: '推奨回数',
			selectCycles: '回数を選択',
			selectDuration: '所要時間を選択',
			cyclesNote: '体調に合わせて回数を調整してください',
			duration: '所要時間',
			durationAbout: '約',
			durationMinutes: '分',
			durationSeconds: '秒',
			share: 'シェア',
			copyLink: 'リンクをコピー',
			shareToX: 'Xでシェア',
			shareDescription: '呼吸のリズムを整えるシンプルな呼吸カウンター',
			copySuccess: 'リンクをコピーしました',
			theme: {
				light: 'ライトモード',
				dark: 'ダークモード',
				system: 'システム設定に従う'
			},
			locale: {
				ja: '日本語',
				en: 'English'
			},
			appName: 'Breathline',
			presetGroup: {
				neiyang: '内養功系',
				daily: '日常調整系'
			},
			footer: {
				allRightsReserved: 'All Rights Reserved'
			}
		}
	},
	en: {
		preset: {
			neiyang_basic: {
				name: 'Neiyang Gong - Basic',
				description:
					'A foundational breathing technique in Neiyang Gong. Start with shorter durations to establish a sense of breathing rhythm. In Neiyang Gong, practitioners often begin with such breathing patterns and gradually extend them according to their condition and breathing depth.',
				note: 'Adjust the duration and number of cycles according to your condition. Practice without forcing, feeling the natural rhythm of your breath.'
			},
			neiyang_deep: {
				name: 'Neiyang Gong - Deep',
				description:
					'A breathing technique for deepening the sense of breath. Used by those with settled breathing to progress to deeper breathing. Not to be forced, but practiced with adjustments according to your condition.',
				note: 'Adjust the duration and number of cycles according to your condition. It is important to practice when your breathing is settled.'
			},
			resonant: {
				name: 'Resonant Breathing',
				description:
					'A breathing technique that optimizes heart rate variability and balances the autonomic nervous system. Practicing at approximately 5.5 breaths per minute helps balance mind and body, reducing stress and improving focus.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			},
			relax_sleep: {
				name: 'Relaxation & Sleep Aid',
				description:
					'A breathing technique based on the 4-7-8 method, designed to support relaxation and sleep. The longer exhalation activates the parasympathetic nervous system, guiding the body into a relaxed state. Particularly effective when practiced before bedtime.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			},
			stress_relief: {
				name: 'Stress Relief',
				description:
					'A breathing technique for reducing stress and anxiety. Practicing with a 4-4-8 rhythm helps lower heart rate, ease tension, and restore balance to mind and body. Suitable for daily stress management and use in tense situations.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			},
			release: {
				name: 'Tension Release',
				description:
					'Sometimes used to ease tension. By inhaling briefly and exhaling longer, it helps regulate the breathing rhythm.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			}
		},
		ui: {
			phase: {
				inhale: 'Inhale',
				hold: 'Hold',
				exhale: 'Exhale'
			},
			cycle: 'cycle',
			of: '/',
			seconds: 'sec',
			start: 'Start',
			pause: 'Pause',
			resume: 'Resume',
			reset: 'Reset',
			back: 'Back',
			selectPreset: 'Select Preset',
			selectPresetDescription: 'Choose a breathing technique according to your condition or purpose',
			presetFormatHelp: 'Format: Inhale-Hold-Exhale (seconds)',
			cycles: 'Cycles',
			recommendedCycles: 'Recommended',
			selectCycles: 'Select Cycles',
			selectDuration: 'Select Duration',
			cyclesNote: 'Adjust the number of cycles according to your condition',
			duration: 'Duration',
			durationAbout: 'About',
			durationMinutes: 'min',
			durationSeconds: 'sec',
			share: 'Share',
			copyLink: 'Copy link',
			shareToX: 'Share to X',
			shareDescription: 'A simple breathing counter to steady your rhythm.',
			copySuccess: 'Link copied',
			theme: {
				light: 'Light mode',
				dark: 'Dark mode',
				system: 'Follow system'
			},
			locale: {
				ja: 'Japanese',
				en: 'English'
			},
			appName: 'Breathline',
			presetGroup: {
				neiyang: 'Neiyang Gong',
				daily: 'Daily Adjustment'
			},
			footer: {
				allRightsReserved: 'All Rights Reserved'
			}
		}
	}
};

export function getTranslation(locale: Locale, key: string): string {
	const keys = key.split('.');
	let value: string | Translations = translations[locale];

	for (const k of keys) {
		if (typeof value === 'string') {
			return value;
		}
		value = value[k];
		if (value === undefined) {
			if (process.env.NODE_ENV !== 'production') {
				console.warn(`[i18n] missing key "${key}" for locale "${locale}"`);
			}
			return key;
		}
	}

	if (typeof value === 'string') {
		return value;
	}
	if (process.env.NODE_ENV !== 'production') {
		console.warn(`[i18n] missing key "${key}" for locale "${locale}"`);
	}
	return key;
}

export function getStoredLocale(): Locale {
	if (typeof window === 'undefined') {
		return 'ja';
	}
	const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
	if (stored === 'ja' || stored === 'en') {
		return stored;
	}
	return 'ja';
}

export function setStoredLocale(locale: Locale): void {
	if (typeof window === 'undefined') {
		return;
	}
	localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function detectLocale(): Locale {
	if (typeof window === 'undefined') {
		return 'ja';
	}
	const stored = getStoredLocale();
	if (stored) return stored;
	const lang = navigator.language.toLowerCase();
	return lang.startsWith('en') ? 'en' : 'ja';
}

// locale store as single source of truth
const initialLocale: Locale = detectLocale();
export const localeStore = writable<Locale>(initialLocale);

export function setLocale(locale: Locale): void {
	setStoredLocale(locale);
	localeStore.set(locale);
}

export function getLocale(): Locale {
	return get(localeStore);
}

// Reactive translation function store
// Usage: import { t } from '$lib/i18n'; then use {$t('ui.key')} in template or $t('ui.key') in script
export const t = derived(localeStore, ($locale) => (key: string) => getTranslation($locale, key));
