import React, {useEffect} from 'react';
import styles from './Events.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import {
  setGoal,
  getGoals,
  updateGoal,
} from '../../redux/actions';
import {TextField} from '@material-ui/core';
import { useAuthState } from '../../context';
import { GoalSelector } from '../common';

export const Events = () => {
  const dispatch = useDispatch();
  const goal = useSelector(state => state.goals.currentGoal);
  const {userDetails} = useAuthState();

  useEffect(async () => {
    dispatch(getGoals({
      userId: userDetails.id,
      onSuccess: () => console.log('success get goals'),
      onError: () => console.log('error get goals'),
    }));
  }, []);

  const handleInputChange = async (goal) => {
    dispatch(setGoal(goal));
  }

  const handleInputBlur = async (evt) => {
    dispatch(updateGoal({
      note: goal.note,
      id: goal.id,
      coachesNote: goal.coaches_note,
      onSuccess: () => console.log('success update goal'),
      onError: () => console.log('error update goal'),
    }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.goalSelect}>
        <GoalSelector />
      </div>

      <div className={styles.goalNote}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="note"
          label="Action Items"
          name="note"
          placeholder="What are your action items"
          value={goal.note || ''}
          onChange={(evt) => handleInputChange({'note': evt.target.value})}
          onBlur={handleInputBlur}
          multiline={true}
          rows={30}
          defaultValue={goal.note}
        />
      </div>

      {/* <div className={styles.coachesNote}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="coachesNote"
          label="Coaches Note"
          name="coachesNote"
          placeholder="Prepare and play well"
          value={goal.coaches_note || ''}
          onChange={(evt) => handleInputChange({'coaches_note': evt.target.value})}
          onBlur={handleInputBlur}
          multiline={true}
          rows={10}
          defaultValue={goal.coaches_note}
        />
      </div> */}
    </div>
  )
}

export default Events;