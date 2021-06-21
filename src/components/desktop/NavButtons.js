import React from 'react';
import styles from './NavButtons.module.scss';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch, useSelector} from 'react-redux';
import { setDate } from '../../redux/actions';
import { format } from 'date-fns';

export const NavButtons = () => {
  const dispatch = useDispatch();
  const { currentDateObj } = useSelector(state => state.date);
  
  const moveClick = (direction) => {
    direction === 'forward' ? currentDateObj.setDate(currentDateObj.getDate() + 7) : currentDateObj.setDate(currentDateObj.getDate() - 7);
    dispatch(setDate({
      dateObj: currentDateObj,
      dateStr: format(currentDateObj, 'yyyy-MM-dd'),
    }));
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
        <IconButton
          color='primary'
          onClick={() => moveClick('back')}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          color='primary'
          onClick={() => moveClick('forward')}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default NavButtons;