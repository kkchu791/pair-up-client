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
import { BLOCK_TYPE } from '../../constants';

export const StartForm = () => {
  const [task, setTask] = useState({});
  const {userDetails} = useAuthState();
  const {currentGoal} = useSelector(state => state.goals);
  const timeBlocks = useSelector(state => state.timeBlocks);
  const {currentDateStr} = useSelector(state => state.date);
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
      date: currentDateStr,
      task: task.description,
      goal_id: currentGoal.id,
      type: BLOCK_TYPE.REGULAR,
      onSuccess: (resp) => onSuccess(resp, closeTB.start_time, closeTB.end_time),
      onError: () => console.log('error'),
    }));
  }

  return (
    <div className={styles.container}>


      <div className={styles.description}>
        <TextField
          fullWidth
          size='small'
          id="description"
          inputProps={{style: {
            fontSize: 40,
            fontWeight: '600'
          }}}
          name="description"
          value={task.description || ''}
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.goalSelector}>
        <GoalSelector />
      </div>

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