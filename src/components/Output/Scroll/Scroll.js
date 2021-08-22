import React, { useRef, useEffect } from 'react';
import clsx from 'clsx';

import styles from './Scroll.module.css';

function Scroll(props) {
  const { children, className, ...other } = props;

  const scrollRef = useRef();
  const scrollClassName = clsx(styles.root, className);

  useEffect(() => {
    function scrollToLastChild() {
      const node = scrollRef.current;
      const lastElementChild = node?.lastElementChild;

      if (lastElementChild) {
        lastElementChild.scrollIntoView();
      }
    }

    scrollToLastChild();
  }, [children]);

  return (
    <div className={scrollClassName} {...other}>
      <div className={styles.container} ref={scrollRef}>
        {children}
      </div>
    </div>
  );
}

export default Scroll;
