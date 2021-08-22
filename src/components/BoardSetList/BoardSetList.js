import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Text } from '@fluentui/react';

import messages from './BoardSetList.messages';
import styles from './BoardSetList.module.css';

function BoardSetList(props) {
  const { items, className } = props;

  const rootClassName = clsx(className, styles.root);

  return (
    <ul className={rootClassName}>
      {items.map(({ author, authorUrl, image, name, onClick }) => {
        return (
          <li className={styles.item} key={name}>
            <button
              className={styles.itemButton}
              type="button"
              onClick={onClick}
            >
              <img className={styles.itemImage} src={image} alt="" />
            </button>

            <div className={styles.itemText}>
              <Text block variant="medium">
                {name}
              </Text>

              {author && (
                <div className={styles.itemAuthor}>
                  <FormattedMessage {...messages.by} />{' '}
                  {authorUrl ? (
                    <a className={styles.itemAuthorLink} href={authorUrl}>
                      <Text variant="small">{author}</Text>
                    </a>
                  ) : (
                    <Text variant="small">{author}</Text>
                  )}
                </div>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

BoardSetList.propTypes = {
  /**
   * Board sets to render
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.node.isRequired,
      image: PropTypes.node.isRequired,
      author: PropTypes.node,
      authorUrl: PropTypes.node,
    })
  ).isRequired,
};

export default BoardSetList;
