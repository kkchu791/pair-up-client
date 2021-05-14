import React, {useState} from 'react';
import styles from './StartForm.module.scss';
import {TextField, Button} from '@material-ui/core';
import { useAuthState } from '../../context';
import {
  createBlock,
  setBlock
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {GoalSelector} from '../common';
import { getNearestTimeBlock } from '../../utils';

export const StartForm = () => {
  const [task, setTask] = useState({});
  const {userDetails} = useAuthState();
  const {currentGoal} = useSelector(state => state.goals);
  const timeBlocks = useSelector(state => state.timeBlocks);
  const {currentDate} = useSelector(state => state.date);
  const dispatch = useDispatch();

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setTask({...task, ...{[name]: value}})
  }

  const onSuccess = (resp, start, end) => {
    dispatch(setBlock({
      ...resp.data,
      ...{
            start_time: start,
            end_time: end,
            color: currentGoal.color
         }
    }));
  }

  const handleStartClick = () => {
    let closeTB = getNearestTimeBlock(timeBlocks);
    dispatch(createBlock({
      creator_id: userDetails.id,
      time_block_id: closeTB.id,
      date: currentDate.toISOString().slice(0,10),
      task: task.description,
      goal_id: currentGoal.id,
      onSuccess: (resp) => onSuccess(resp, closeTB.start_time, closeTB.end_time),
      onError: () => console.log('error'),
    }));
  }

  return (
    <div className={styles.container}>
      <GoalSelector />

      <TextField
        variant="outlined"
        margin="normal"
        id="description"
        label="Task"
        name="description"
        size='small'
        value={task.description || ''}
        className={styles.task}
        onChange={handleInputChange}
      />

      <Button
        variant="contained"
        color="primary"
        className={styles.start}
        onClick={handleStartClick}
      >
        Start
      </Button>

    </div>
  )
}

export default StartForm;