import React, {useState} from 'react';
import styles from './TaskForm.module.scss';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/actions';
import {
  createBlock,
  updateBlock
} from '../../redux/actions';
import { useAuthState } from '../../context';
import { ImageUploader } from './ImageUploader';
import { GoalSelector } from '../common';

export const TaskForm = () => {
  const block = useSelector(state => state.block);
  const {currentGoal} = useSelector(state => state.goals);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const [task, setTask] = useState({
    description: block.task,
    goalId: block.goal_id,
    note: block.note,
    id: block.id,
    images: block.images || [],
  });

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setTask({...task, ...{[name]: value}})
  }

  const handleCancel = evt => {
    dispatch(toggleModal({isOpen: false}));
  }

  const handleSuccess = () => {
    dispatch(toggleModal({isOpen: false}));
  }

  const handleError = () => {
    console.log('create block error')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task.id) {
      dispatch(updateBlock({
        id: task.id,
        creator_id: userDetails.id,
        time_block_id: block.timeBlockId,
        date: new Date(block.date).toISOString().slice(0,10),
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        images: task.images,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    } else {
      dispatch(createBlock({
        creator_id: userDetails.id,
        time_block_id: block.timeBlockId,
        date: block.date,
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    }
  }

  return (
    <div className={styles.container}>
      <h2 id="form-title">Task Form</h2>
      <form onSubmit={handleSubmit}>
        <FormControl
          variant="outlined"
          className={styles.formControl}
        >
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            value={task.description || ''}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl
          required
          variant="outlined"
          className={styles.formControl}
        >
          <GoalSelector />
        </FormControl>


        {task.id &&
          <div className={styles.notes}>
            <FormControl
              required
              variant="outlined"
              className={styles.formControl}
            >
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="note"
                label="What can you improve on?"
                name="note"
                value={task.note || ''}
                onChange={handleInputChange}
                multiline={true}
                rows={10}
                className={styles.note}
              />
            </FormControl>

            <ImageUploader
              setTask={setTask}
              task={task}
            />
          </div>
        }

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.submit}
        >
            Save Task
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={(evt) => handleCancel(evt)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
}

export default TaskForm;