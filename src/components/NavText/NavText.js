import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Text } from '@fluentui/react';
import styles from './NavText.module.css';

function NavText(props) {
  const { children, className, ...other } = props;

  const rootClassName = clsx(className, styles.root);

  return (
    <Text
      className={rootClassName}
      variant={'large'}
      nowrap={true}
      styles={{ root: { fontWeight: '600' } }}
      {...other}
    >
      {children}
    </Text>
  );
}

NavText.propTypes = {
  /**
   * React children
   *
   * @ignore
   */
  children: PropTypes.node,
};

export default NavText;
