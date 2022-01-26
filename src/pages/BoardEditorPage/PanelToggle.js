import { CommandBarButton, getRTL } from '@fluentui/react';
import PropTypes from 'prop-types';
import { useIntl } from 'react-intl';
import messages from './PanelToggle.messages';

function PanelToggle(props) {
  const { checked, onClick } = props;

  const intl = useIntl();

  const isRTL = getRTL();
  const closePaneIconName = isRTL ? 'OpenPaneMirrored' : 'ClosePaneMirrored';
  const openPaneIconName = isRTL ? 'ClosePaneMirrored' : 'OpenPaneMirrored';

  const iconProps = {
    iconName: checked ? closePaneIconName : openPaneIconName,
  };

  const title = checked
    ? intl.formatMessage(messages.hideBoardsPanel)
    : intl.formatMessage(messages.showBoardsPanel);

  return (
    <CommandBarButton iconProps={iconProps} title={title} onClick={onClick} />
  );
}

PanelToggle.propTypes = {
  /**
   * If `true`, the panel is open.
   */
  checked: PropTypes.bool,
  /**
   * Callback fired when the panel is toggled.
   */
  onClick: PropTypes.func,
};

export default PanelToggle;
