import React, {useState} from 'react';
import styles from './TaskForm.module.scss';
import {
  TextField,
  Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBlock,
  updateBlock,
  toggleModal
} from '../../redux/actions';
import { useAuthState } from '../../context';
import {
  GoalSelector,
  MediaUploader,
} from '../common';
import clsx from 'clsx';
import { Editor } from '../common';
import {CircularProgress} from '@material-ui/core';

export const TaskForm = () => {
  const {currentBlock} = useSelector(state => state.blocks);
  const {currentGoal} = useSelector(state => state.goals);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const defaultText = [
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ];
  const [task, setTask] = useState({
    description: currentBlock.task,
    goalId: currentBlock.goal_id,
    note: currentBlock.note,
    text: currentBlock.text ? JSON.parse(currentBlock.text) : defaultText,
    id: currentBlock.id,
    images: currentBlock.images || [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setTask({...task, ...{[name]: value}})
  }

  const handleEditorChange = (val) => {
    setTask({...task, ...{'text': val}})
  }

  const handleCancel = evt => {
    dispatch(toggleModal({isOpen: false}));
  }

  const handleSuccess = () => {
    setIsSubmitting(false);
    dispatch(toggleModal({isOpen: false}));
  }

  const handleError = () => {
    console.log('create block error')
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (task.id) {
      dispatch(updateBlock({
        id: task.id,
        creator_id: userDetails.id,
        time_block_id: currentBlock.time_block_id,
        date: currentBlock.date.split('T')[0],
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        text: JSON.stringify(task.text),
        images: task.images,
        onSuccess: handleSuccess,
        onError: handleError,
      }));
    } else {
      dispatch(createBlock({
        creator_id: userDetails.id,
        time_block_id: currentBlock.time_block_id,
        date: currentBlock.date.split('T')[0],
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        text: JSON.stringify(task.text),
        type: currentBlock.type,
        onSuccess: handleSuccess,
        onError: handleError,
      }));
    }
  }

  return (
    <div
      className={clsx(styles.container, {[styles.creating]: !task.id})}
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.textFieldWrapper}>
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
              placeholder='task...'
            />
          </div>

          <div className={styles.goalSelector}>
              <GoalSelector />
          </div>
        </div>

        {task.id &&
          <div className={styles.notes}>
            <Editor
              handleEditorChange={handleEditorChange}
              handleInputChange={handleInputChange}
              task={task}
            />

            <MediaUploader
              setTask={setTask}
              task={task}
            />
          </div>
        }

        <div className={styles.actionButtons}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={styles.submit}
          >
            {isSubmitting ? 
              <div className={styles.submitting}>
                Saving...
                <CircularProgress
                  className={styles.spinner}
                  size={20}
                />
              </div>
              :
              <div className={styles.submitText}>
                Save Task
              </div>
           }
            
          </Button>

          <Button
            variant="contained"
            color="secondary"
            onClick={(evt) => handleCancel(evt)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
