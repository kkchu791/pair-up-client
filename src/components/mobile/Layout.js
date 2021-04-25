import React from 'react';
import { NavBar } from './NavBar';
import { SubNav } from './SubNav';
import styles from './Layout.module.scss';

export const Layout = ({
  children
}) => {
  return (
    <div className={styles.container}>
      <NavBar />
      <SubNav />
      {children}
    </div>
  )
}

export default Layout;