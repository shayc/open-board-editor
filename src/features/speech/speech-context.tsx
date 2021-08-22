import React, { useState, useEffect } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import {
  createAsyncSpeech,
  DEFAULT_PITCH,
  DEFAULT_RATE,
  DEFAULT_VOLUME,
} from './async-speech';

interface SpeechContextValue {
  boundary: any;
  isPaused: boolean;
  isSpeaking: boolean;
  lang: string;
  pitch: number;
  rate: number;
  setLang: Function;
  setPitch: Function;
  setRate: Function;
  setVolume: Function;
  setVoiceURI: Function;
  voices: SpeechSynthesisVoice[];
  voiceURI: string;
  volume: number;
}

const asyncSpeech = createAsyncSpeech(window.speechSynthesis);
const SpeechContext = React.createContext({} as SpeechContextValue);

const SpeechProvider: React.FC = (props) => {
  const { children } = props;

  const [voiceURI, setVoiceURI] = useLocalStorageState('voiceURI', '');
  const [lang, setLang] = useState('en');
  const [pitch, setPitch] = useState(DEFAULT_PITCH);
  const [rate, setRate] = useState(DEFAULT_RATE);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);

  const [voices, setVoices] = useState([] as SpeechSynthesisVoice[]);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [boundary, setBoundary] = useState({});

  const languages = asyncSpeech.getLanguages();

  useEffect(() => {
    async function getVoices() {
      const voices = await asyncSpeech.getVoices({ lang });
      const sortedVoices = voices.sort((a, b) => a.lang.localeCompare(b.lang));

      setVoices(sortedVoices);
    }

    getVoices();
  }, [lang]);

  useEffect(() => {
    async function getDefaultVoiceURI() {
      const langVoices = await asyncSpeech.getVoices({ lang });
      const voiceURIExists = langVoices.find((v) => v.voiceURI === voiceURI);

      if (voiceURIExists) {
        return voiceURI;
      }

      const defaultVoice = await asyncSpeech.getDefaultVoice(lang);

      if (defaultVoice) {
        setVoiceURI(defaultVoice.voiceURI);
      }
    }

    getDefaultVoiceURI();
  }, [lang, voices, voiceURI, setVoiceURI]);

  useEffect(() => {
    async function handleOffline() {
      const localVoices = await asyncSpeech.getVoices({
        lang,
        localService: true,
      });
      setVoices(localVoices);
    }

    async function handleOnline() {
      const voices = await asyncSpeech.getVoices({ lang });
      setVoices(voices);
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [lang]);

  async function speak(text: string) {
    cancel();
    setIsSpeaking(true);

    const options = await getSpeechOptions();
    return asyncSpeech.speak(text, options);
  }

  function cancel() {
    setIsSpeaking(false);
    setIsPaused(false);
    setBoundary({});

    asyncSpeech.cancel();
  }

  function pause() {
    setIsPaused(true);

    asyncSpeech.pause();
  }

  function resume() {
    setIsPaused(false);

    asyncSpeech.resume();
  }

  async function getSpeechOptions() {
    const eventHandlers: Partial<SpeechSynthesisUtterance> = {
      onboundary: handleboundary,
    };

    const voice = await asyncSpeech.getVoiceByURI(voiceURI);

    const speechOptions = {
      ...eventHandlers,
      lang,
      pitch,
      rate,
      voice,
      volume,
    };

    return speechOptions;
  }

  function handleboundary(event: SpeechSynthesisEvent) {
    const { charIndex, charLength, elapsedTime, name } = event;
    setBoundary({ charIndex, charLength, elapsedTime, name });
  }

  const context = {
    boundary,
    cancel,
    languages,
    isPaused,
    isSpeaking,
    lang,
    pitch,
    rate,
    pause,
    resume,
    setLang,
    setPitch,
    setRate,
    setVoiceURI,
    setVolume,
    speak,
    voices,
    voiceURI,
    volume,
  };

  return (
    <SpeechContext.Provider value={context}>{children}</SpeechContext.Provider>
  );
};

function useSpeech() {
  const context = React.useContext(SpeechContext);

  if (!context) {
    throw new Error(`useSpeech must be used within a SpeechProvider`);
  }

  return context;
}

export { SpeechProvider, useSpeech };
