import React, { useState } from 'react';
import styles from './SubNav.module.scss';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { PAGES, PATH } from '../../constants';

export const SubNav = () => {
  const [isActive, setIsActive] = useState(PAGES.START);

  return (
    <div className={styles.container}>
      <Link 
        className={clsx(styles.link, {[styles.active]: isActive === PAGES.START})}
        to={PATH.START}
        onClick={() => setIsActive(PAGES.START)}
      >
        Start
      </Link>

      <Link
        className={clsx(styles.link, {[styles.active]: isActive === PAGES.SESSIONS})}
        to={PATH.SESSIONS}
        onClick={() => setIsActive(PAGES.SESSIONS)}
      >
        Sessions
      </Link>
    </div>
  )
}

export default SubNav;