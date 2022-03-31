import PropTypes from 'prop-types';
import { SearchBox } from '@fluentui/react';
import { useIntl } from 'react-intl';
import messages from './BoardsListFilterBox.messages';
import styles from './BoardsListFilterBox.module.css';

function BoardsListFilterBox(props) {
  const { onChange, value } = props;

  const intl = useIntl();

  return (
    <div className={styles.root}>
      <SearchBox
        className={styles.searchBox}
        placeholder={intl.formatMessage(messages.filter)}
        iconProps={{ iconName: 'Filter' }}
        value={value}
        onChange={(event, value) => {
          onChange(value);
        }}
      />
    </div>
  );
}

BoardsListFilterBox.propTypes = {
  /**
   *
   */
  onChange: PropTypes.func.isRequired,
  /**
   *
   */
  value: PropTypes.string,
};
export default BoardsListFilterBox;
