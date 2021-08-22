import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import { Panel, PanelType, Link, Text } from '@fluentui/react';

import messages from './DetailsPanel.messages';

function DetailsPanel(props) {
  const { className, description, license, name, onDismiss, open } = props;

  const intl = useIntl();

  return (
    <Panel
      isLightDismiss
      className={className}
      isOpen={open}
      type={PanelType.smallFixedFar}
      headerText={<FormattedMessage {...messages.details} />}
      closeButtonAriaLabel={intl.formatMessage(messages.close)}
      onDismiss={onDismiss}
    >
      <Text as="p" variant="large" block>
        {name}
      </Text>

      <Text as="p" variant={'medium'} block>
        <FormattedMessage {...messages.author} />
        {': '}
        <Link href={license?.authorUrl} target="_blank" rel="noopener">
          {license?.authorName}
        </Link>
      </Text>

      {license?.authorEmail && (
        <Text as="p" variant={'medium'} block>
          <FormattedMessage {...messages.email} />
          {': '}
          <Link href={`mailto:${license.authorEmail}`}>
            {license.authorEmail}
          </Link>
        </Text>
      )}

      <Text as="p" variant={'medium'} block>
        <FormattedMessage {...messages.license} />
        {': '}
        <Link href={license?.copyrightNoticeUrl} target="_blank" rel="noopener">
          {license?.type}
        </Link>
      </Text>

      <Text as="p" variant={'medium'} block>
        {description}
      </Text>
    </Panel>
  );
}

DetailsPanel.propTypes = {
  className: PropTypes.string,
  /**
   * Board description
   */
  description: PropTypes.string,
  /**
   * Board license
   */
  license: PropTypes.shape({
    type: PropTypes.string,
    copyright_notice_url: PropTypes.string,
    source_url: PropTypes.string,
    author_name: PropTypes.string,
    author_url: PropTypes.string,
    author_email: PropTypes.string,
  }),
  /**
   * Callback, fired on panel dismiss
   */
  onDismiss: PropTypes.func.isRequired,
  /**
   * If `true`, panel is open
   */
  open: PropTypes.bool,
};

export default DetailsPanel;
