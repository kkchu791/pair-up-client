import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CurrentBlockDisplay.module.scss';
import { Block, Timer } from '../common';
import { setBlock } from '../../redux/actions';

export const CurrentBlockDisplay = () => {
  const currentBlock = useSelector(state => state.block);
  const {currentGoal} = useSelector(state => state.goals);
  const dispatch = useDispatch();

  const handleBlockClick = () => {
    console.log('clicking on the block')
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.goal}>
        {currentBlock.goal_name || currentGoal.name}
      </div>

      <div className={styles.timer}>
        {
          <Timer
            currentBlock={currentBlock}
          />
        }
      </div>

      <div className={styles.currentBlockContainer}>
        <Block
          block={currentBlock}
          onScheduleClick={() => console.log('scheduled for later')}
        />
      </div>
    </div>
  )
}

export default CurrentBlockDisplay;