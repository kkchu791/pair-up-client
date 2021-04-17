import React from 'react';
import styles from './NavButtons.module.scss';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch, useSelector} from 'react-redux';
import { setDate } from '../redux/actions';

export const NavButtons = () => {
  const dispatch = useDispatch();
  const { currentDate } = useSelector(state => state.date);
  
  const moveClick = (direction) => {
    direction === 'forward' ? currentDate.setDate(currentDate.getDate() + 7) : currentDate.setDate(currentDate.getDate() - 7);
    dispatch(setDate(currentDate));
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.timeZoneButton}>
      <Button
          onClick={() => console.log('time zone button clicked')}
          color="primary"
          variant="contained"
        >
          PST
        </Button>
      </div> */}

      <div className={styles.todayButton}>
        <Button
          onClick={() => console.log('today button clicked')}
          color="primary"
          variant="outlined"
        >
          Today
        </Button>
      </div>

      <div className={styles.navButtons}>
        <IconButton color='primary'>
          <ArrowBackIosIcon onClick={() => moveClick('back')} />
        </IconButton>
        <IconButton color='primary'>
          <ArrowForwardIosIcon onClick={() => moveClick('forward')} />
        </IconButton>
      </div>
    </div>
  )
}

export default NavButtons;