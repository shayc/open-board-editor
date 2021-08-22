import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ChoiceGroup, Text } from '@fluentui/react';

import { useUserSettings } from '../../../features/user-settings';
import messages from './BoardSettings.messages';
import styles from './BoardSettings.module.css';

function BoardSettings(props) {
  const { className } = props;

  const {
    board: { setIsLabelHidden, setLabelPosition, isLabelHidden, labelPosition },
  } = useUserSettings();

  const rootClassName = clsx(className, styles.root);
  const [selectedKey, setSelectedKey] = useState(
    (isLabelHidden && 'hidden') || labelPosition
  );

  const labelOptions = [
    { key: 'top', text: <FormattedMessage {...messages.showAboveImage} /> },
    { key: 'bottom', text: <FormattedMessage {...messages.showBelowImage} /> },
    { key: 'hidden', text: <FormattedMessage {...messages.hide} /> },
  ];

  const onChange = useCallback(
    (event, option) => {
      if (option.key === 'hidden') {
        setIsLabelHidden(true);
      } else {
        setIsLabelHidden(false);
        setLabelPosition(option.key);
      }

      setSelectedKey(option.key);
    },
    [setIsLabelHidden, setLabelPosition]
  );

  return (
    <div className={rootClassName}>
      <Text as="p" variant="large" block>
        <FormattedMessage {...messages.board} />
      </Text>

      <ChoiceGroup
        selectedKey={selectedKey}
        options={labelOptions}
        onChange={onChange}
        label={<FormattedMessage {...messages.tileLabel} />}
      />
    </div>
  );
}

BoardSettings.propTypes = {
  /**
   *
   */
  className: PropTypes.string,
};

export default BoardSettings;
