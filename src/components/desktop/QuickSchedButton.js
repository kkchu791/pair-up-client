import React from 'react';
import styles from './QuickSched.module.scss';
import {Button} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleModal,
  setBlock,
} from '../../redux/actions';
import {BLOCK_TYPE} from '../../constants';
import { getNearestTimeBlock } from '../../utils';

export const QuickSchedButton = () => {
  const dispatch = useDispatch();
  const { currentDateStr } = useSelector(state => state.date);
  const { timeBlocks } = useSelector(state => state);

  const handleClick = () => {
    let closeTB = getNearestTimeBlock(timeBlocks);
    dispatch(toggleModal({isOpen: true}));

    dispatch(setBlock({
      date: currentDateStr,
      time_block_id: closeTB.id,
      type: BLOCK_TYPE.REGULAR,
    }))
  }

  return (
    <div className={styles.container}>
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        onClick={handleClick}
      >
        Quick Sched
      </Button>
    </div>
  )
}

export default QuickSchedButton;