import React from 'react';
import styles from './NavButtons.module.scss';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useDispatch, useSelector} from 'react-redux';
import {
  setDate,
  getBlocksByDate,
} from '../../redux/actions';
import { format } from 'date-fns';
import { DAYS } from '../../constants';
import { FILTER_DATES } from '../../constants';
import { useAuthState } from '../../context';

export const NavButtons = () => {
  const dispatch = useDispatch();
  const { currentDateObj } = useSelector(state => state.date);
  const { range, search, goalId, type } = useSelector(state => state.filter);
  const { userDetails } = useAuthState();

  const moveClick = (direction) => {
    direction === 'forward' ? currentDateObj.setDate(currentDateObj.getDate() + DAYS[range]) : currentDateObj.setDate(currentDateObj.getDate() - DAYS[range]);
    dispatch(setDate({
      dateObj: currentDateObj,
      dateStr: format(currentDateObj, 'yyyy-MM-dd'),
    }));

    const [start, end] = FILTER_DATES[range](currentDateObj)

    dispatch(getBlocksByDate({
      start, 
      end,
      search,
      goalId,
      type,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }

  const handleTodayClick = () => {
    dispatch(setDate({
      dateObj: new Date(),
      dateStr: format(new Date(), 'yyyy-MM-dd'),
    }));

    const [start, end] = FILTER_DATES[range](new Date());

    dispatch(getBlocksByDate({
      start, 
      end,
      search,
      goalId,
      type,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
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

      <div className={styles.navButtons}>
        <IconButton
          color='primary'
          onClick={() => moveClick('back')}
          size='small'
        >
          <ArrowBackIosIcon />
        </IconButton>

        <div className={styles.todayButton}>
        <Button
          onClick={() => handleTodayClick()}
          color="primary"
          variant="outlined"
        >
          Today
        </Button>
        </div>
        <IconButton
          color='primary'
          onClick={() => moveClick('forward')}
          size='small'
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default NavButtons;