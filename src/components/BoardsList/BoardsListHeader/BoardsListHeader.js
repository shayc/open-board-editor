import { Check, Text } from '@fluentui/react';
import { useIntl } from 'react-intl';
import messages from './BoardsListHeader.messages';
import styles from './BoardsListHeader.module.css';

function BoardsListHeader(props) {
  const { isAllSelected, onToggleSelectAll, selectedCount, title } = props;

  const intl = useIntl();

  const checkStyles = {
    check: {
      opacity: 1,
    },
  };

  return (
    <div className={styles.header}>
      <button
        className={styles.selectAllButton}
        onClick={onToggleSelectAll}
        title={intl.formatMessage(messages.selectAllBoards)}
      >
        <Check styles={checkStyles} checked={isAllSelected} />
      </button>

      <div className={styles.title}>
        <Text as="span" variant="mediumPlus" style={{ fontWeight: 600 }}>
          {Boolean(selectedCount) && `(${selectedCount})`} {title}
        </Text>
      </div>
    </div>
  );
}

export default BoardsListHeader;
