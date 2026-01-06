export type Locale = 'ja' | 'en';

const LOCALE_STORAGE_KEY = 'breath-pace-locale';

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
			daily: {
				name: '日常調整',
				description:
					'日常的な呼吸の調整に用いる呼吸法です。吐く時間を長めにすることで、呼吸のリズムを整えることがあります。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			},
			night: {
				name: '夜の調整',
				description:
					'就寝前の呼吸調整に用いることがあります。より長い吐く時間により、呼吸をゆっくりと整えます。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			},
			neutral: {
				name: 'ニュートラル',
				description:
					'バランスの取れた呼吸法です。吸うと吐くを均等に行うことで、呼吸のリズムを整えます。',
				note: '数分から10分以上続けることを目安に、体調に合わせて調整してください。'
			},
			morning: {
				name: '朝の調整',
				description:
					'朝の呼吸調整に用いることがあります。吸う時間を長めにすることで、呼吸のリズムを整えます。',
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
			theme: {
				light: 'ライトモード',
				dark: 'ダークモード',
				system: 'システム設定に従う'
			},
			locale: {
				ja: '日本語',
				en: 'English'
			},
			appName: 'Breath Pace',
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
			daily: {
				name: 'Daily Adjustment',
				description:
					'A breathing technique for daily breath adjustment. By extending the exhale time, it helps regulate the breathing rhythm.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			},
			night: {
				name: 'Evening Adjustment',
				description:
					'Sometimes used for pre-sleep breath adjustment. The longer exhale time helps slow and regulate breathing.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			},
			neutral: {
				name: 'Neutral',
				description:
					'A balanced breathing technique. By inhaling and exhaling equally, it helps regulate the breathing rhythm.',
				note: 'Aim to practice for several minutes to 10 minutes or more, adjusting according to your condition.'
			},
			morning: {
				name: 'Morning Adjustment',
				description:
					'Sometimes used for morning breath adjustment. By extending the inhale time, it helps regulate the breathing rhythm.',
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
			theme: {
				light: 'Light mode',
				dark: 'Dark mode',
				system: 'Follow system'
			},
			locale: {
				ja: 'Japanese',
				en: 'English'
			},
			appName: 'Breath Pace',
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
			return key;
		}
	}

	return typeof value === 'string' ? value : key;
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

export function getLocale(): Locale {
	if (typeof window === 'undefined') {
		return 'ja';
	}
	const stored = getStoredLocale();
	if (stored !== 'ja') {
		return stored;
	}
	const lang = navigator.language.toLowerCase();
	return lang.startsWith('en') ? 'en' : 'ja';
}
