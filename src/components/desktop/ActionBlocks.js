import React from 'react';
import styles from './ActionBlocks.module.scss';
import { Button } from '@material-ui/core';
import { GoalSelector } from '../common';

export const ActionBlocks = () => {
  const handleClick = () => {
    console.log('adding Action Block');
  }

  return (
    <div className={styles.container}>
      <div className={styles.addActionBlockContainer}>
        <Button
          variant='contained'
          color='primary'
          className={styles.goalCreationButton}
          onClick={handleClick}
        >
          + Add Action Block
        </Button>
      </div>

      
      <div className={styles.goalSelector}>
        <GoalSelector />
      </div>

      <div className={styles.actionBlockList}>

      </div>
    </div>
  )
}

export default ActionBlocks;