import PropTypes from 'prop-types';
import { SearchBox } from '@fluentui/react';
import { useIntl } from 'react-intl';
import messages from './FilterBox.messages';
import styles from './FilterBox.module.css';

function FilterBox(props) {
  const { onChange, value } = props;

  const intl = useIntl();

  return (
    <SearchBox
      className={styles.root}
      placeholder={intl.formatMessage(messages.filter)}
      iconProps={{ iconName: 'Filter' }}
      value={value}
      onChange={(event, value) => {
        onChange(value);
      }}
    />
  );
}

FilterBox.propTypes = {
  /**
   *
   */
  onChange: PropTypes.func.isRequired,
  /**
   *
   */
  value: PropTypes.string,
};
export default FilterBox;
