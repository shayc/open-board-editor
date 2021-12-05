import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Dropdown, Text, Slider, DefaultButton } from '@fluentui/react';

import {
  useSpeech,
  MIN_PITCH,
  MIN_RATE,
  MIN_VOLUME,
  MAX_PITCH,
  MAX_RATE,
  MAX_VOLUME,
} from '../../../contexts/speech';
import messages from './SpeechSettings.messages';
import styles from './SpeechSettings.module.css';

function SpeechSettings(props) {
  const { className } = props;

  const intl = useIntl();

  const {
    speak,
    pitch,
    rate,
    setPitch,
    setRate,
    setVolume,
    voices,
    voiceURI,
    setVoiceURI,
    volume,
  } = useSpeech();

  const voiceOptions = voices.map((v) => {
    return { key: v.voiceURI, text: v.name };
  });

  const rootClassName = clsx(className, styles.root);

  function speakPreviewMessage() {
    speak(intl.formatMessage(messages.thisIsMyVoice));
  }

  function handleVoiceChange(event, option) {
    const voiceURI = option.key;
    setVoiceURI(voiceURI);
  }

  return (
    <div className={rootClassName}>
      <Text as="p" variant="large" block>
        <FormattedMessage {...messages.speech} />
      </Text>

      <Dropdown
        className={styles.voiceDropdown}
        label={<FormattedMessage {...messages.chooseAVoice} />}
        options={voiceOptions}
        defaultSelectedKey={voiceURI}
        onChange={handleVoiceChange}
      />

      <Slider
        showValue
        snapToStep
        label={<FormattedMessage {...messages.pitch} />}
        min={MIN_PITCH}
        max={MAX_PITCH}
        step={0.1}
        value={pitch}
        onChange={setPitch}
      />

      <Slider
        showValue
        snapToStep
        label={<FormattedMessage {...messages.voiceSpeed} />}
        min={MIN_RATE}
        max={MAX_RATE}
        step={0.1}
        value={rate}
        onChange={setRate}
      />

      <Slider
        showValue
        snapToStep
        label={<FormattedMessage {...messages.volume} />}
        min={MIN_VOLUME}
        max={MAX_VOLUME}
        step={0.1}
        value={volume}
        onChange={setVolume}
      />

      <DefaultButton
        className={styles.previewVoiceButton}
        onClick={speakPreviewMessage}
      >
        <FormattedMessage {...messages.previewVoice} />
      </DefaultButton>
    </div>
  );
}

SpeechSettings.propTypes = {
  /**
   *
   */
  className: PropTypes.string,
};

export default SpeechSettings;
