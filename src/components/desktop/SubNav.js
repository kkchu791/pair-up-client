import React, { useState } from 'react';
import styles from './SubNav.module.scss';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { PAGES, PATH } from '../../constants';

export const SubNav = () => {
  const [isActive, setIsActive] = useState(PAGES.CALENDAR);

  return (
    <div className={styles.container}>
      <Link 
        className={clsx(styles.link, {[styles.active]: isActive === PAGES.CALENDAR})}
        to={PATH.DASHBOARD}
        onClick={() => setIsActive(PAGES.CALENDAR)}
      >
        Calendar
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