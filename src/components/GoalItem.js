import React from 'react';
import styles from './GoalItem.module.scss';

export const GoalItem = ({
  goal
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.color} style={{background: goal.color}}>
      </div>

      <div className={styles.name}>
        {goal.name}
      </div>
    </div>
  )
}

export default GoalItem;
