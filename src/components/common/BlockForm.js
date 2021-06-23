import React, {useState} from 'react';
import styles from './BlockForm.module.scss';
import {
  TextField,
  Button
} from '@material-ui/core';
import { MediaUploader } from './MediaUploader';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBlock,
  updateBlock
} from '../../redux/actions';
import {
  useAuthState
} from '../../context';
import { format } from 'date-fns';
import {CircularProgress} from '@material-ui/core';

export const BlockForm = ({
  onClose
}) => {
  const { currentBlock } = useSelector(state => state.blocks);
  const {currentGoal} = useSelector(state => state.goals);
  const dispatch = useDispatch();
  const { userDetails } = useAuthState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [task, setTask] = useState({
    description: currentBlock.task,
    goalId: currentBlock.goal_id,
    note: currentBlock.note,
    id: currentBlock.id,
    images: currentBlock.images || [],
  });

  const handleInputChange = (evt) => {
    var value = evt.target.value;
    var name = evt.target.name;
    setTask({...task, ...{[name]: value}})
  }

  const handleCancel = () => {
    onClose();
  }

  const handleSuccess = () => {
    setIsSubmitting(false);
    onClose(false)
  }

  const handleError = () => {
    console.log('error in creating or updating');
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    if (task.id) {
      dispatch(updateBlock({
        id: task.id,
        creator_id: userDetails.id,
        time_block_id: currentBlock.timeBlockId,
        date: format(new Date(currentBlock.date), 'yyyy-MM-dd'),
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
        time_block_id: currentBlock.timeBlockId,
        date: currentBlock.date,
        task: task.description,
        goal_id: currentGoal.id,
        note: task.note,
        type: currentBlock.type,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    }
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

      <div className={styles.note}>
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
      </div>

      <div className={styles.imageUploader}>
        <MediaUploader
          setTask={setTask}
          task={currentBlock}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.submit}
          onClick={handleSubmit}
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
    </div>
  )
}

export default BlockForm;