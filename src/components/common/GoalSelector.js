import React, {useEffect} from 'react';
import styles from './GoalSelector.module.scss';
import Select from 'react-select';
import { useSelector, useDispatch } from 'react-redux';
import {
  getGoal,
  getGoals,
} from '../../redux/actions';
import { useAuthState } from '../../context'

export const GoalSelector = () => {
  const dispatch = useDispatch();
  const goal = useSelector(state => state.goals.currentGoal);
  const {goalOptions} = useSelector(state => state.goals)
  const {userDetails} = useAuthState();

  useEffect(async () => {
    dispatch(getGoals({
      userId: userDetails.id,
      onSuccess: () => console.log('success get goals'),
      onError: () => console.log('error get goals'),
    }));
  }, []);

  const handleSelectChange = async (option) => {
    dispatch(getGoal({
      id: option.goalId,
      onSuccess: () => console.log('success get goal'),
      onError: () => console.log('error get goal')
    }));
  }

  return (
    <div className={styles.container}>
      <Select
        options={goalOptions}
        placeholder='Select Identity/Goal'
        name='goalId'
        onChange={({value}) => handleSelectChange({goalId: value})}
        className={styles.selector}
        defaultValue={{
          label: goal.name,
          value: goal.id
        }}
        value={{
          label: goal.name,
          value: goal.id
        }}
      />
    </div>
  )
}

export default GoalSelector;