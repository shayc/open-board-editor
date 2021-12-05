import { polyfillBoundaryCharLength } from './polyfill';

type UtteranceAttributes = Partial<
  Omit<
    SpeechSynthesisUtterance,
    'addEventListener' | 'removeEventListener' | 'dispatchEvent'
  >
>;

export function createAsyncSpeech(speechSynthesis: SpeechSynthesis) {
  function asyncGetVoices(): Promise<SpeechSynthesisVoice[]> {
    return new Promise((resolve) => {
      // Firefox vs Chrome implementations
      // https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis/onvoiceschanged#examples
      const voices = speechSynthesis.getVoices();
      if (voices.length) {
        resolve(voices);
      } else {
        speechSynthesis.onvoiceschanged = () => {
          const voices = speechSynthesis.getVoices();
          resolve(voices);
        };
      }
    });
  }

  function cancel(): void {
    speechSynthesis.cancel();
  }

  async function getVoices(
    options: { lang?: string; localService?: boolean } = {}
  ) {
    const voices = await asyncGetVoices();
    const filteredVoices = voices.filter(byLocalService).filter(byLang);

    function byLocalService(voice: SpeechSynthesisVoice) {
      return options.localService ? voice.localService : true;
    }

    function byLang(voice: SpeechSynthesisVoice) {
      return options.lang ? voice.lang.includes(options.lang) : true;
    }

    return filteredVoices;
  }

  async function getDefaultVoice(lang: string) {
    const voices = await getVoices({ lang });
    const defaultVoice = voices.find((v) => v.default);

    return defaultVoice || voices[0];
  }

  async function getVoiceByURI(voiceURI: string) {
    const voices = await getVoices();
    const voice = voices.find((v) => v.voiceURI === voiceURI);

    return voice;
  }

  async function getLanguages() {
    const voices = await getVoices();
    const languages = Array.from(new Set(voices.map((voice) => voice.lang)));

    return languages;
  }

  function pause() {
    speechSynthesis.pause();
  }

  function resume() {
    speechSynthesis.resume();
  }

  function speak(
    text: string,
    options: UtteranceAttributes
  ): Promise<SpeechSynthesisEvent> {
    return new Promise((resolve, reject) => {
      const utterance = new window.SpeechSynthesisUtterance(text);

      const eventHandlers: Partial<SpeechSynthesisUtterance> = {
        onend(event) {
          resolve(event);

          if (options.onend) {
            options.onend.call(utterance, event);
          }
        },
        onerror(event) {
          reject(event);

          if (options.onerror) {
            options.onerror.call(utterance, event);
          }
        },
        onboundary(event) {
          if (!('charLength' in event)) {
            polyfillBoundaryCharLength(event);
          }

          if (options.onboundary) {
            options.onboundary.call(utterance, event);
          }
        },
      };

      Object.assign(utterance, options, eventHandlers);

      speechSynthesis.speak(utterance);
    });
  }

  const asyncSpeech = {
    cancel,
    getDefaultVoice,
    getLanguages,
    getVoiceByURI,
    getVoices,
    pause,
    resume,
    speak,
  };

  return asyncSpeech;
}
