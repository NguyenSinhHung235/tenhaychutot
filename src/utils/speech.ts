// Text-to-speech utility with Vietnamese voice detection and fallback

class VietnameseSpeechManager {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSupported: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.isSupported = true;
    }
  }

  public speak(
    text: string, 
    onStart?: () => void, 
    onEnd?: () => void, 
    onError?: (err: any) => void
  ) {
    if (!this.synth || !this.isSupported) {
      console.warn('SpeechSynthesis not supported on this browser.');
      return;
    }

    // Stop previous utterance
    this.stop();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      this.currentUtterance = utterance;

      // Find Vietnamese voice
      const voices = this.synth.getVoices();
      const viVoice = voices.find(v => v.lang.startsWith('vi') || v.name.toLowerCase().includes('vietnam') || v.name.toLowerCase().includes('vietnamese'));
      
      if (viVoice) {
        utterance.voice = viVoice;
        utterance.lang = viVoice.lang;
      } else {
        utterance.lang = 'vi-VN';
      }

      utterance.rate = 0.9; // Slightly slower for elderly / clarity
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        onStart?.();
      };

      utterance.onend = () => {
        this.currentUtterance = null;
        onEnd?.();
      };

      utterance.onerror = (e) => {
        console.warn('Speech synthesis error or cancelled:', e);
        this.currentUtterance = null;
        onError?.(e);
      };

      this.synth.speak(utterance);
    } catch (e) {
      console.error('Speech synthesis exception:', e);
      onError?.(e);
    }
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
      this.currentUtterance = null;
    }
  }

  public isSpeaking(): boolean {
    return Boolean(this.synth && this.synth.speaking);
  }

  public getSupported(): boolean {
    return this.isSupported;
  }
}

export const speechManager = new VietnameseSpeechManager();
