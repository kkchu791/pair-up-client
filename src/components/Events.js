import React, {useState, useEffect} from 'react';
import styles from './Events.module.scss';
import Select from 'react-select';
import {
  getGoal,
  getGoals,
  updateGoal,
} from '../api/goals';
import {TextField} from '@material-ui/core';
import { useAuthState } from '../context';

export const Events = () => {
  const [goals, setGoals] = useState([]);
  const [currentGoal, setCurrentGoal] = useState({});
  const {userDetails} = useAuthState();

  useEffect(async () => {
    let {goals} = await getGoals({userId: userDetails.id });
    let goalOptions = goals.map(goal => ({label: goal.name, value: goal.id}));
    setGoals(goalOptions);
  }, []);

  const handleSelectChange = async (option) => {
    let {goal} = await getGoal({id: option.goalId});
    setCurrentGoal(goal);
  }

  const handleInputChange = async (evt) => {
    const text = evt.target.value;
    setCurrentGoal(prevState => ({...prevState, ...{note: text}}));
    await updateGoal({note: text, id: currentGoal.id});
  }

  return (
    <div className={styles.container}>
      <div className={styles.goalSelect}>
        <Select
            options={goals}
            placeholder='Select Identity/Goal'
            name='goalId'
            onChange={({value}) => handleSelectChange({goalId: value})}
          />
      </div>

      <div className={styles.goalNote}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="note"
            label="Note"
            name="note"
            placeholder="One step at a time..."
            value={currentGoal.note || ''}
            onChange={handleInputChange}
            multiline={true}
            rows={30}
            defaultValue={currentGoal.note}
          />
      </div>
    </div>
  )
}

export default Events;
