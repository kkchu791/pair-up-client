import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from 'react-select'
import FormControl from '@material-ui/core/FormControl';
import { getGoals } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleModal,
  setGoal
} from '../redux/actions';
import {
  createBlock,
  updateBlock
} from '../redux/actions';
import { useAuthState } from '../context';

const useStyles = makeStyles({
  formControl: {
    width: "100%",
    padding: '15px 0',
  },
  goals: {
    background: 'red',
  },
  submit: {
    marginRight: '10px',
  },
  note: {
    zIndex: '0',
  }

});

export const TaskForm = () => {
  const classes = useStyles();
  const block = useSelector(state => state.block);
  const goals = useSelector(state => state.goals.list);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const [task, setTask] = useState({
    description: block.task,
    goalId: block.goal_id,
    note: block.note,
    id: block.id,
  });
  const taskGoal = goals.find(go => go.id === task.goalId) || {};

  useEffect(async () => {
    dispatch(getGoals({
      userId: userDetails.id,
      onSuccess: () => console.log('on success for get goals'),
      onError: () => console.log('on error for get goals '),
    }));
  }, [])

  const handleInputChange = evt => {
    var value = evt.target.value
    var name = evt.target.name
    setTask({...task, ...{[name]: value}})
  }

  const handleSelectChange = (option) => {
    setTask({...task, ...option})
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
        goal_id: task.goalId,
        note: task.note,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    } else {
      dispatch(createBlock({
        creator_id: userDetails.id,
        time_block_id: block.timeBlockId,
        date: block.date,
        task: task.description,
        goal_id: task.goalId,
        note: task.note,
        onSuccess: handleSuccess,
        onError: handleError,
      }))
    }

    dispatch(setGoal({
      id: task.goal_id,
      name: taskGoal.name,
      note: taskGoal.note,
    }));
  }

  return (
    <div>
      <h2 id="form-title">Task Form</h2>
      <form onSubmit={handleSubmit}>
        <FormControl
          variant="outlined"
          className={classes.formControl}
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
          className={classes.formControl}
        >
          <Select
            options={goals.map(goal => ({label: goal.name, value: goal.id}))}
            placeholder='Identity...'
            name='goalId'
            className={classes.goal}
            onChange={({value}) => handleSelectChange({goalId: value})}
            value={taskGoal ? {label: taskGoal.name, value: taskGoal.id} : null}
          />
        </FormControl>


        {task.id &&
          <FormControl
            required
            variant="outlined"
            className={classes.formControl}
          >
            {/* Text area for Notes goes here */}
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="note"
              label="What did you learn?"
              name="note"
              value={task.note || ''}
              onChange={handleInputChange}
              multiline={true}
              rows={30}
              className={classes.note}
            />

          </FormControl>
        }

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.submit}
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