export interface SpeechSegment {
  id: string;
  label: string;
  text: string;
  syncTarget?: 'stimulus' | 'animation' | 'fbd' | 'formula' | 'solution';
  fbdStep?: number;
}

export type TtsPlaybackStatus = 'idle' | 'playing' | 'paused';

/**
 * Translates physics symbols and expressions into natural spoken Indonesian
 * so Mister Jo never reads raw LaTeX commands or cryptic symbols.
 */
export function sanitizeForIndonesianSpeech(raw: string): string {
  return raw
    .replace(/\$\$/g, ' ')
    .replace(/\$/g, ' ')
    .replace(/\\vec\{([^}]+)\}/g, 'vektor $1')
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, '$1 dibagi $2')
    .replace(/\\sqrt\{([^}]+)\}/g, 'akar dari $1')
    .replace(/\\Sigma\s*F/gi, 'resultan gaya sigma F')
    .replace(/ΣF/g, 'resultan gaya sigma F')
    .replace(/Δv/g, 'perubahan kecepatan delta v')
    .replace(/Δθ/g, 'perubahan sudut delta teta')
    .replace(/Δr/g, 'perubahan posisi delta r')
    .replace(/Δt/g, 'selang waktu delta t')
    .replace(/\\Delta/g, 'delta ')
    .replace(/\\omega/g, 'kecepatan sudut omega')
    .replace(/ω/g, 'kecepatan sudut omega')
    .replace(/\\theta/g, 'sudut teta')
    .replace(/θ/g, 'sudut teta')
    .replace(/\\alpha/g, 'sudut alfa')
    .replace(/α/g, 'sudut alfa')
    .replace(/\\phi/g, 'sudut fi')
    .replace(/φ/g, 'sudut fi')
    .replace(/\\gamma/g, 'sudut gama')
    .replace(/γ/g, 'sudut gama')
    .replace(/\\pi/g, 'pi')
    .replace(/π/g, 'pi')
    .replace(/\\sin/g, 'sinus ')
    .replace(/\\cos/g, 'kosinus ')
    .replace(/\\tan/g, 'tangen ')
    .replace(/\\cot/g, 'kotangen ')
    .replace(/\\ln/g, 'logaritma natural dari ')
    .replace(/\\cdot/g, ' dikali ')
    .replace(/\\times/g, ' dikali ')
    .replace(/\\approx/g, ' kira-kira sama dengan ')
    .replace(/\\implies/g, ' sehingga ')
    .replace(/\\Rightarrow/g, ' maka ')
    .replace(/m\/s\^2|m\/s²|ms\^\{-2\}/g, ' meter per detik kuadrat')
    .replace(/m\/s/g, ' meter per detik')
    .replace(/([a-zA-Z])_0/g, '$1 nol')
    .replace(/([a-zA-Z])_r/g, '$1 radial')
    .replace(/([a-zA-Z])_n/g, '$1 sentripetal')
    .replace(/([a-zA-Z])_t/g, '$1 tangensial')
    .replace(/(\d+),(\d+)/g, '$1 koma $2')
    .replace(/°/g, ' derajat')
    .replace(/[{}^_\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function pickMisterJoVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null;
  }
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  const idVoices = voices.filter((v) =>
    v.lang.toLowerCase().startsWith('id')
  );
  const pool = idVoices.length > 0 ? idVoices : voices;

  // Prefer male Indonesian voice names when available
  const maleKeywords = ['andika', 'ardi', 'male', 'pria', 'laki', 'david', 'google bahasa indonesia'];
  const preferred = pool.find((v) =>
    maleKeywords.some((kw) => v.name.toLowerCase().includes(kw))
  );
  return preferred ?? pool[0] ?? null;
}

export interface MisterJoControllerCallbacks {
  onStatusChange: (status: TtsPlaybackStatus) => void;
  onSegmentChange: (segment: SpeechSegment | null, index: number) => void;
  onFinish: () => void;
}

export class MisterJoNarrator {
  private segments: SpeechSegment[] = [];
  private currentIndex = 0;
  private rate = 1.0;
  private status: TtsPlaybackStatus = 'idle';
  private fallbackTimer: number | null = null;
  private callbacks: MisterJoControllerCallbacks;
  private sessionToken = 0;

  constructor(callbacks: MisterJoControllerCallbacks) {
    this.callbacks = callbacks;
  }

  public setRate(rate: number) {
    this.rate = rate;
    if (this.status === 'playing' && this.segments.length > 0) {
      const idx = this.currentIndex;
      this.cancelTimersAndSynth();
      this.speakIndex(idx);
    }
  }

  public getStatus(): TtsPlaybackStatus {
    return this.status;
  }

  public play(segments: SpeechSegment[], startIndex = 0) {
    this.stop(true);
    if (!segments.length) return;
    this.segments = segments;
    this.currentIndex = Math.max(0, Math.min(startIndex, segments.length - 1));
    this.status = 'playing';
    this.callbacks.onStatusChange('playing');
    this.speakIndex(this.currentIndex);
  }

  public pause() {
    if (this.status !== 'playing') return;
    this.status = 'paused';
    this.cancelTimersAndSynth();
    this.callbacks.onStatusChange('paused');
  }

  public resume() {
    if (this.status !== 'paused' || !this.segments.length) return;
    this.status = 'playing';
    this.callbacks.onStatusChange('playing');
    this.speakIndex(this.currentIndex);
  }

  public replay() {
    if (!this.segments.length) return;
    this.play(this.segments, 0);
  }

  public stop(silent = false) {
    this.sessionToken++;
    this.cancelTimersAndSynth();
    this.status = 'idle';
    this.currentIndex = 0;
    if (!silent) {
      this.callbacks.onStatusChange('idle');
      this.callbacks.onSegmentChange(null, -1);
    }
  }

  private cancelTimersAndSynth() {
    if (this.fallbackTimer !== null) {
      window.clearTimeout(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // Ignore browser sandbox errors
      }
    }
  }

  private speakIndex(index: number) {
    if (index >= this.segments.length) {
      this.status = 'idle';
      this.callbacks.onStatusChange('idle');
      this.callbacks.onSegmentChange(null, -1);
      this.callbacks.onFinish();
      return;
    }

    const token = ++this.sessionToken;
    this.currentIndex = index;
    const seg = this.segments[index];
    this.callbacks.onSegmentChange(seg, index);

    const spoken = sanitizeForIndonesianSpeech(seg.text);
    const wordCount = Math.max(4, spoken.split(/\s+/).length);
    // Estimated duration in ms as safety watchdog & fallback for headless environments
    const estimatedMs = Math.max(
      1800,
      Math.round(((wordCount / 2.4) * 1000) / Math.max(0.5, this.rate))
    );

    const hasSpeech =
      typeof window !== 'undefined' &&
      'speechSynthesis' in window &&
      typeof SpeechSynthesisUtterance !== 'undefined';

    if (hasSpeech) {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        try {
          const utter = new SpeechSynthesisUtterance(spoken);
          const voice = pickMisterJoVoice();
          if (voice) {
            utter.voice = voice;
            utter.lang = voice.lang;
          } else {
            utter.lang = 'id-ID';
          }
          utter.pitch = 0.88; // Authoritative adult male timbre
          utter.rate = Math.max(0.6, Math.min(1.6, this.rate * 0.96));

          let advanced = false;
          const advance = () => {
            if (advanced || token !== this.sessionToken || this.status !== 'playing') {
              return;
            }
            advanced = true;
            if (this.fallbackTimer !== null) {
              window.clearTimeout(this.fallbackTimer);
              this.fallbackTimer = null;
            }
            this.speakIndex(index + 1);
          };

          utter.onend = advance;
          utter.onerror = advance;
          // Watchdog in case browser speech engine stalls
          this.fallbackTimer = window.setTimeout(advance, estimatedMs + 4000);
          window.speechSynthesis.speak(utter);
          return;
        } catch {
          // Fall through to timer-based synchronized narration
        }
      }
    }

    // Graceful synchronized fallback when OS has no TTS voices (e.g. headless Chromium)
    this.fallbackTimer = window.setTimeout(() => {
      if (token !== this.sessionToken || this.status !== 'playing') return;
      this.speakIndex(index + 1);
    }, estimatedMs);
  }
}
