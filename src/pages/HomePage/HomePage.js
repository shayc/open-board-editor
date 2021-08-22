import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { Text } from '@fluentui/react';

import fourGridStartingCommunicationImage from '../../open-board-format/examples/four-grid-starting-communication.png';
import quickCore24Image from '../../open-board-format/examples/quick-core-24.png';
import BoardSetList from '../../components/BoardSetList';
import plusSvg from './plus.svg';
import messages from './HomePage.messages';
import styles from './HomePage.module.css';

function HomePage(props) {
  const history = useHistory();

  const boardSets = [
    {
      name: <FormattedMessage {...messages.blank} />,
      image: plusSvg,
      onClick: () => {
        history.push(`/edit/board/`);
      },
    },
    {
      name: 'Four Grid Starting Communication',
      author: 'CoughDrop',
      authorUrl: 'https://www.mycoughdrop.com/example',
      image: fourGridStartingCommunicationImage,
    },
    {
      name: 'Quick Core 24',
      author: 'CoughDrop',
      authorUrl: 'https://www.mycoughdrop.com/example',
      image: quickCore24Image,
    },
  ];

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <Text as="h3" variant="mediumPlus">
              <FormattedMessage {...messages.startNewBoardSet} />
            </Text>
          </div>
          <BoardSetList items={boardSets} />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <Text as="h3" variant="mediumPlus">
              <FormattedMessage {...messages.recentlyViewedBoardSets} />
            </Text>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
