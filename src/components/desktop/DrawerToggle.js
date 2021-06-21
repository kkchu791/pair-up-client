import React from 'react';
import styles from './DrawerToggle.module.scss';
import ToggleOffIcon from '@material-ui/icons/ToggleOff';
import ToggleOnIcon from '@material-ui/icons/ToggleOn';
import { IconButton } from '@material-ui/core';
import { toggleDrawer } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const DrawerToggle = () => {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.drawer);

  return (
    <div className={styles.container}>
      {isOpen ? 
        <IconButton
          size='small'
          onClick={() => dispatch(toggleDrawer({isOpen: false}))}
          color='primary'
        >
          <ToggleOffIcon />
        </IconButton>

        :

        <IconButton
          size='small'
          onClick={() => dispatch(toggleDrawer({isOpen: true}))}
          color='primary'
        >
          <ToggleOnIcon />
        </IconButton>
      }
    </div>
  )
}

export default DrawerToggle;