import React, {useState} from 'react';
import styles from './TaskForm.module.scss';
import {
  TextField,
  Button,
  FormControl
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/actions';
import {
  createBlock,
  updateBlock
} from '../../redux/actions';
import { useAuthState } from '../../context';
import {
  GoalSelector,
  ImageUploader,
} from '../common';
import {format} from 'date-fns';
import clsx from 'clsx';
import { SlateEditor } from '../common';

export const TaskForm = () => {
  const {currentBlock} = useSelector(state => state.blocks);
  const {currentGoal} = useSelector(state => state.goals);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const defaultText = [
    {
      type: 'paragraph',
      children: [{ text: 'Beta testing...' }],
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

  const EDITOR = {
    REGULAR: 'regular',
    SLATE: 'slate',
  }

  const [editor, setEditor] = useState(EDITOR.REGULAR);

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setTask({...task, ...{[name]: value}})
  }

  const handleEditorChange = (val) => {
    setTask({...task, ...{['text']: val}})
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
        time_block_id: currentBlock.timeBlockId,
        date: format(new Date(currentBlock.date), 'yyyy-MM-dd'),
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        text: JSON.stringify(task.text),
        images: task.images,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    } else {
      dispatch(createBlock({
        creator_id: userDetails.id,
        time_block_id: currentBlock.timeBlockId,
        date: currentBlock.date,
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        text: JSON.stringify(task.text),
        type: currentBlock.type,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    }
  }

  return (
    <div
      className={clsx(styles.container, {[styles.creating]: !task.id})}
    >
      <form onSubmit={handleSubmit}>
        <h2>Task Form</h2>
        <div className={styles.description}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            size='small'
            id="description"
            label="Description"
            name="description"
            value={task.description || ''}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.goalSelector}>
            <GoalSelector />
        </div>

        {task.id &&
          <div className={styles.notes}>
            <div className={styles.subNavEditor}>
              <div
                className={clsx(styles.link, {[styles.active]: editor === EDITOR.REGULAR})}
                onClick={() => setEditor(EDITOR.REGULAR)}
              >
                Regular
              </div>

              <div
                className={clsx(styles.link, {[styles.active]: editor === EDITOR.SLATE})}
                onClick={() => setEditor(EDITOR.SLATE)}
              >
                Slate
              </div>
            </div>

            {editor === EDITOR.REGULAR ? 
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
                  onChange={handleInputChange}
                  value={task.note}
                  multiline={true}
                  rows={30}
                  className={styles.note}
                />
              </FormControl>

              :
              
              <SlateEditor
                handleInputChange={handleEditorChange}
                value={task.text}
              />
            }

            <ImageUploader
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
            Save Task
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
