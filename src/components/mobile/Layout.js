import React, { useEffect } from 'react';
import { NavBar } from './NavBar';
import { SubNav } from './SubNav';
import styles from './Layout.module.scss';
import { useDispatch } from 'react-redux';
import { DEVICE_TYPES } from '../../constants';
import { setDevice } from '../../redux/actions';

export const Layout = ({
  children
}) => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(setDevice({ type: DEVICE_TYPES.MOBILE }))  
  }, []);

  return (
    <div className={styles.container}>
      <NavBar />
      <SubNav />
      {children}
    </div>
  )
}

export default Layout;