import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Text, Link } from '@fluentui/react';

import * as constants from '../../../constants';
import messages from './About.messages';
import styles from './About.module.css';

function About(props) {
  const { className } = props;

  const rootClassName = clsx(className, styles.root);

  return (
    <div className={rootClassName}>
      <Text as="p" variant="large" block>
        <FormattedMessage {...messages.about} /> {constants.APP_NAME}
      </Text>

      <Text as="p" variant="medium" block>
        <FormattedMessage {...messages.technologies} />
      </Text>

      <Text as="ul" variant="medium" block>
        <li>
          <Link
            href="https://www.openboardformat.org/"
            target="_blank"
            rel="noreferrer"
          >
            Open Board Format
          </Link>
        </li>
        <li>
          <Link
            href="https://globalsymbols.com/"
            target="_blank"
            rel="noreferrer"
          >
            Global Symbols
          </Link>
        </li>
      </Text>

      <Text as="p" variant="medium" block>
        <FormattedMessage {...messages.sourceCode} />:{' '}
        <Link
          href="https://github.com/shayc/open-board-editor"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </Link>
      </Text>

      <Text as="p" variant="medium" block>
        <Link href={constants.APP_LICENSE_URL} target="_blank" rel="noreferrer">
          {constants.APP_LICENSE} <FormattedMessage {...messages.license} />
        </Link>{' '}
        <FormattedMessage {...messages.copyright} />{' '}
        <Link href={constants.APP_AUTHOR_URL} target="_blank" rel="noreferrer">
          {constants.APP_AUTHOR}
        </Link>
      </Text>
    </div>
  );
}

About.propTypes = {
  className: PropTypes.string,
};

export default About;
