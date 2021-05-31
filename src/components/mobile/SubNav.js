import React, { useState } from 'react';
import styles from './SubNav.module.scss';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import { PATH } from '../../constants';
import { useLocation } from 'react-router-dom'


export const SubNav = () => {
  const location = useLocation();
  const [isActive, setIsActive] = useState(location.pathname);

  return (
    <div className={styles.container}>
      <Link 
        className={clsx(styles.link, {[styles.active]: isActive === PATH.DASHBOARD})}
        to={PATH.DASHBOARD}
        onClick={() => setIsActive(PATH.DASHBOARD)}
      >
        Start
      </Link>

      <Link
        className={clsx(styles.link, {[styles.active]: isActive === PATH.SESSIONS})}
        to={PATH.SESSIONS}
        onClick={() => setIsActive(PATH.SESSIONS)}
      >
        Sessions
      </Link>
    </div>
  )
}

export default SubNav;