import React, {useState} from 'react';
import styles from './GoalCreation.module.scss';
import { Button } from '@material-ui/core';
import { GoalForm } from './GoalForm';

export const GoalCreation = () => {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = () => {
    setIsAdding(true);
  }

  return (
    <div className={styles.container}>
      <div className={styles.goalCreationButton}>
          {isAdding ?
            <GoalForm
              setIsOpen={setIsAdding}
            />
            :
            <Button
              variant='contained'
              color='primary'
              className={styles.goalCreationButton}
              onClick={handleClick}
            >
              + Add Goal
            </Button>
          }
        </div>
    </div>
  )
}

export default GoalCreation;
