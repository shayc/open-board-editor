import { Check, Text } from '@fluentui/react';
import { useIntl } from 'react-intl';
import messages from './BoardListHeader.messages';
import styles from './BoardListHeader.module.css';

function BoardListHeader(props) {
  const { onToggleSelectAll, isAllSelected, selectedCount, title } = props;

  const intl = useIntl();

  return (
    <div className={styles.header}>
      <button
        className={styles.selectAllButton}
        onClick={onToggleSelectAll}
        title={intl.formatMessage(messages.selectAllBoards)}
      >
        <Check
          styles={{
            check: {
              opacity: 1,
            },
          }}
          checked={isAllSelected}
        />
      </button>

      <div className={styles.title}>
        <Text as="span" variant="large">
          {`${selectedCount ? `(${selectedCount})` : ''} `}

          {title}
        </Text>
      </div>
    </div>
  );
}

export default BoardListHeader;
