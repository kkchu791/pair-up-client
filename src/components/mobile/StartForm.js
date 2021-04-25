import React, {useState} from 'react';
import styles from './StartForm.module.scss';
import {TextField, Button} from '@material-ui/core';
import Select from 'react-select';
import { useAuthState } from '../../context';
import {
  createBlock,
  setBlock,
  setGoal
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

export const StartForm = () => {
  const [task, setTask] = useState({});
  const {userDetails} = useAuthState();
  const goals = useSelector(state => state.goals.list);
  const timeBlocks = useSelector(state => state.timeBlocks);
  const {currentDate} = useSelector(state => state.date);
  const taskGoal = goals.find(go => go.id === task.goalId) || {};
  const dispatch = useDispatch();

  const getNearestTimeBlock = () => {
    return timeBlocks.find(tb => {
      const d = new Date();
      const currentTime = `${d.getHours()}:${d.getMinutes()}:00`;
      const current = new Date(`1/01/2021 ${currentTime}`);
      const blockStart = new Date(`1/01/2021 ${tb.start_time}`);
      return current < blockStart;
    });
  }

  const handleSelectChange = (option) => {
    setTask({...task, ...option});
  }

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
            color: taskGoal.color
         }
    }));
    dispatch(setGoal({
      id: task.goalId,
      name: taskGoal.name,
    }));
  }

  const handleStartClick = () => {
    let closeTB = getNearestTimeBlock();
    dispatch(createBlock({
      creator_id: userDetails.id,
      time_block_id: closeTB.id,
      date: currentDate.toISOString().slice(0,10),
      task: task.description,
      goal_id: task.goalId,
      onSuccess: (resp) => onSuccess(resp, closeTB.start_time, closeTB.end_time),
      onError: () => console.log('error'),
    }));
  }

  return (
    <div className={styles.container}>
      <Select
        placeholder='Identity...'
        name='goalId'
        className={styles.goalSelector}
        options={goals.map(goal => ({label: goal.name, value: goal.id}))}
        onChange={({value}) => handleSelectChange({goalId: value})}
        value={taskGoal ? {label: taskGoal.name, value: taskGoal.id} : {}}
      />

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