import React from 'react';
import { useSelector } from 'react-redux';
import styles from './CurrentBlockDisplay.module.scss';
import { Block } from '../common';

export const CurrentBlockDisplay = () => {
  const {currentGoal} = useSelector(state => state.goals);

  const handleBlockClick = () => {
    console.log('clicking on the block')
  }

  return (
    <div className={styles.container}>
      <div className={styles.goal}>
        {currentGoal.name || 'hello'}
      </div>

      <div className={styles.timer}>
        00:59:00
      </div>

      <div className={styles.currentBlockContainer}>
        <Block onClick={handleBlockClick} />
      </div>
    </div>
  )
}

export default CurrentBlockDisplay;