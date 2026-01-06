export class BreathAudio {
	private audioContext: AudioContext | null = null;
	private isInitialized = false;

	async initialize(): Promise<void> {
		if (this.isInitialized && this.audioContext?.state === 'running') {
			return;
		}

		try {
			this.audioContext = new AudioContext();
			await this.audioContext.resume();
			this.isInitialized = true;
		} catch (error) {
			console.warn('AudioContext initialization failed:', error);
		}
	}

	private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
		if (!this.audioContext || this.audioContext.state !== 'running') {
			return;
		}

		const oscillator = this.audioContext.createOscillator();
		const gainNode = this.audioContext.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(this.audioContext.destination);

		oscillator.frequency.value = frequency;
		oscillator.type = type;

		// エンベロープ
		const now = this.audioContext.currentTime;
		gainNode.gain.setValueAtTime(0, now);
		gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
		gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

		oscillator.start(now);
		oscillator.stop(now + duration);
	}

	playTick(): void {
		// カウントダウン中: 予報音「プ」（440Hz、A4）
		this.createTone(440, 0.05, 'sine');
	}

	playPhaseChange(phase: 'inhale' | 'hold' | 'exhale'): void {
		// フェーズ切り替え時: 正報音「ピーン」（880Hz、A5）
		this.createTone(880, 1.0, 'sine');
	}

	destroy(): void {
		if (this.audioContext) {
			this.audioContext.close().catch(() => {
				// エラーは無視
			});
			this.audioContext = null;
			this.isInitialized = false;
		}
	}
}

