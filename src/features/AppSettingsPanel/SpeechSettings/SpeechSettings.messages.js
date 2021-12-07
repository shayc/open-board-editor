/*
 * SpeechSettings Messages
 *
 * This contains all the text for the SpeechSettings component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.SpeechSettings';

export default defineMessages({
  voiceSpeed: {
    id: `${scope}.voiceSpeed`,
    defaultMessage: 'Voice speed',
  },
  volume: {
    id: `${scope}.volume`,
    defaultMessage: 'Volume',
  },
  pitch: {
    id: `${scope}.pitch`,
    defaultMessage: 'Pitch',
  },
  speech: {
    id: `${scope}.speech`,
    defaultMessage: 'Speech',
  },
  chooseAVoice: {
    id: `${scope}.chooseAVoice`,
    defaultMessage: 'Choose a voice',
  },
  previewVoice: {
    id: `${scope}.previewVoice`,
    defaultMessage: 'Preview voice',
  },
  thisIsMyVoice: {
    id: `${scope}.thisIsMyVoice`,
    defaultMessage: 'Hi, this is my voice',
  },
});
