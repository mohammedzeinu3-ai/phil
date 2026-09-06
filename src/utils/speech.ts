// Web Speech API helper for reading philosophical essays aloud

class EssayAudioPlayer {
  private utterance: SpeechSynthesisUtterance | null = null;
  private isPlaying: boolean = false;
  private onStateChangeCallback: ((playing: boolean) => void) | null = null;

  public subscribe(cb: (playing: boolean) => void) {
    this.onStateChangeCallback = cb;
  }

  public play(text: string, rate: number = 0.95) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported by your browser.');
      return;
    }

    window.speechSynthesis.cancel();

    // Clean markdown hashes and symbols for clean spoken cadence
    const cleanText = text
      .replace(/###|##|#/g, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/>\s*/g, '')
      .replace(/---/g, '')
      .replace(/\[\^?\d+\]/g, '');

    this.utterance = new SpeechSynthesisUtterance(cleanText);
    this.utterance.rate = rate;
    this.utterance.pitch = 0.95;

    // Try to find an English voice with an articulate, contemplative tone
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Neural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Serena'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (naturalVoice) {
      this.utterance.voice = naturalVoice;
    }

    this.utterance.onstart = () => {
      this.isPlaying = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    };

    this.utterance.onend = () => {
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    this.utterance.onerror = () => {
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    };

    window.speechSynthesis.speak(this.utterance);
  }

  public pause() {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }

  public resume() {
    if ('speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      this.isPlaying = true;
      if (this.onStateChangeCallback) this.onStateChangeCallback(true);
    }
  }

  public stop() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.isPlaying = false;
      if (this.onStateChangeCallback) this.onStateChangeCallback(false);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const essayAudio = new EssayAudioPlayer();
