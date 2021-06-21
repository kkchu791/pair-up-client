import React, { useState } from 'react';
import styles from './SubNav.module.scss';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import {
  PAGES,
  PATH,
  PAGE_PATH
} from '../../constants';
import { useLocation } from 'react-router-dom';

export const SubNav = () => {
  const location = useLocation();
  console.log(location.pathname);
  const [isActive, setIsActive] = useState(PAGE_PATH[location.pathname]);

  return (
    <div className={styles.container}>
      <Link 
        className={clsx(styles.link, {[styles.active]: isActive === PAGES.DASHBOARD})}
        to={PATH.DASHBOARD}
        onClick={() => setIsActive(PAGES.DASHBOARD)}
      >
        Quick Sched
      </Link>

      <Link 
        className={clsx(styles.link, {[styles.active]: isActive === PAGES.CALENDAR})}
        to={PATH.CALENDAR}
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