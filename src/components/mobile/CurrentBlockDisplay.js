import React, {useState} from 'react';
import { useSelector } from 'react-redux';
import styles from './CurrentBlockDisplay.module.scss';
import { Block, Timer } from '../common';
import { BlockForm } from '../common';

export const CurrentBlockDisplay = () => {
  const { currentBlock } = useSelector(state => state.blocks);
  const {currentGoal} = useSelector(state => state.goals);
  const [isEditing, setIsEditing] = useState(false);

  const handleBlockClick = () => {
    setIsEditing(true);
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

      
      {isEditing ?
        <div className={styles.blockForm}>
          <BlockForm
            onClose={() => setIsEditing(false)}
          />
        </div>
        :
        <div className={styles.currentBlockContainer}>
          <Block
            block={currentBlock}
            onScheduleClick={() => console.log('scheduled for later')}
            onBoxClick={handleBlockClick}
          />
        </div>
      }
    </div>
  )
}

export default CurrentBlockDisplay;