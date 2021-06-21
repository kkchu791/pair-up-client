import React from 'react';
import styles from './GoalBlockCount.module.scss';

export const GoalBlockCount = ({
  blocks
}) => {
  const goalBlocks = blocks.reduce((acc, block) => {
    if (acc[block.goal_id] !== undefined) {
      acc[block.goal_id] = [...acc[block.goal_id], block];
    } else {
      acc[block.goal_id] = [block];
    }

    return acc;
  }, {});

  const renderGoalBlock = (goalId) => {
    return (
      <div
        className={styles.goalBlock}
        key={goalId}
      >
        <div
          className={styles.color}
          style={{background: goalBlocks[goalId][0].color || 'lightblue'}}
        >
        </div>

        <div className={styles.count}>
          {goalBlocks[goalId].length}
        </div>

        <div className={styles.name}>
          {goalBlocks[goalId][0].goal_name || 'no goal'}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {Object.keys(goalBlocks).map(renderGoalBlock)}
    </div>
  )
}

export default GoalBlockCount;

