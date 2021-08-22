import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Icon, ActionButton, Text } from '@fluentui/react';
import messages from './SelectedBoardsPage.messages';
import styles from './SelectedBoardsPage.module.css';

function SelectedBoardsPage(props) {
  const {
    allSelected,
    className,
    onSelectAllClick,
    onDeleteClick,
    onCancelClick,
    selectedCount,
  } = props;

  const intl = useIntl();
  const rootClassName = clsx(className, styles.root);

  const actionButtonItems = [
    {
      key: 'delete',
      text: <FormattedMessage {...messages.delete} />,
      iconProps: { iconName: 'Delete' },
      onClick: onDeleteClick,
    },
    {
      key: 'cancel',
      text: <FormattedMessage {...messages.cancel} />,
      iconProps: { iconName: 'Cancel' },
      onClick: onCancelClick,
    },
  ];

  return (
    <div className={rootClassName}>
      <div className={styles.header}>
        <Icon
          iconName="Stack"
          styles={{
            root: {
              fontSize: '96px',
              color: 'var(--neutralLight)',
            },
          }}
        />

        <Text variant="large">
          {allSelected
            ? intl.formatMessage(messages.allBoardsSelected)
            : intl.formatMessage(messages.boardsSelected, {
                count: selectedCount,
              })}
        </Text>

        {!allSelected && (
          <ActionButton
            text={intl.formatMessage(messages.selectAllBoards)}
            onClick={onSelectAllClick}
          />
        )}
      </div>

      <ul className={styles.actionList}>
        {actionButtonItems.map((buttonProps) => (
          <li className={styles.actionListItem} key={buttonProps.key}>
            <ActionButton {...buttonProps} />
          </li>
        ))}
      </ul>
    </div>
  );
}

SelectedBoardsPage.propTypes = {
  /**
   * React children
   *
   * @ignore
   */
  children: PropTypes.node,
};

export default SelectedBoardsPage;
