import React from 'react';
import styles from './GoalList.module.scss';
import { useSelector } from 'react-redux';
import { GoalItem } from './GoalItem';


export const GoalList = () => {
  const {list} = useSelector(state => state.goals);

  return (
    <div className={styles.container}>
      {list.map(goal => <GoalItem goal={goal} /> )}
    </div>
  )
}

export default GoalList;
