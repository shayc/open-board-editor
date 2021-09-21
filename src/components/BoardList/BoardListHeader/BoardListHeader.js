import { Check, Text } from '@fluentui/react';
import { useIntl } from 'react-intl';
import messages from './BoardListHeader.messages';
import styles from './BoardListHeader.module.css';

function BoardListHeader(props) {
  const { isAllSelected, onToggleSelectAll, selectedCount, title } = props;

  const intl = useIntl();

  const checkStyles = {
    check: {
      opacity: 1,
    },
  };

  const selectedCountText = selectedCount ? `(${selectedCount})` : '';

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
        <Text as="span" variant="large">
          {selectedCountText}

          {title}
        </Text>
      </div>
    </div>
  );
}

export default BoardListHeader;
