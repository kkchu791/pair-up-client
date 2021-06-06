import React from 'react';
import styles from './ActionBlocks.module.scss';
import { Button } from '@material-ui/core';
import { GoalSelector } from '../common';
import { ActionBlockList } from './ActionBlockList';
import { useDispatch } from 'react-redux';
import { toggleModal, setBlock } from '../../redux/actions';
import { BLOCK_TYPE } from '../../constants';
import { format } from 'date-fns';

export const ActionBlocks = () => {
  const dispatch = useDispatch();

  const addBlockClick = (evt) => {
    evt.stopPropagation();

    dispatch(toggleModal({
      isOpen: true,
    }));

    dispatch(setBlock({
      date: format(new Date(), 'yyyy-MM-dd'),
      timeBlockId: null,
      type: BLOCK_TYPE.IMPROVEMENT,
    }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.addActionBlockContainer}>
        <Button
          variant='contained'
          color='primary'
          className={styles.goalCreationButton}
          onClick={addBlockClick}
        >
          + Add Action Block
        </Button>
      </div>

      
      <div className={styles.goalSelector}>
        <GoalSelector />
      </div>

      <div className={styles.actionBlockList}>
        <ActionBlockList />
      </div>
    </div>
  )
}

export default ActionBlocks;