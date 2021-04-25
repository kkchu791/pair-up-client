import React from 'react';
import styles from './Goals.module.scss';
import { GoalList } from './GoalList';
import { GoalCreation } from './GoalCreation';

export const Goals = () => {
  return (
    <div className={styles.container}>
      <div className={styles.goalCreation}>
        <GoalCreation />
      </div>

      <div className={styles.goalList}>
        <GoalList />
      </div>
    </div>
  )
}

export default Goals;
