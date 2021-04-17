import React, {useState} from 'react';
import styles from './GoalForm.module.scss';
import {
  Button,
  TextField
} from '@material-ui/core';
import { ColorPicker } from './ColorPicker';
import { createGoal } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useAuthState } from '../context';

export const GoalForm = ({
  setIsOpen,
}) => {
  const {userDetails} = useAuthState();
  const dispatch = useDispatch();
  const initialGoalState = {
    color: '#add8e6'
  }
  const [goal, setGoal] = useState(initialGoalState);

  const handleSubmit = () => {
    dispatch(createGoal({
      color: goal.color,
      name: goal.name,
      userId: userDetails.id,
      onSuccess: () => setIsOpen(false),
      onError: () => console.log('error in creating goal'),
    }))
  }

  const handleCancel = () => {
    setIsOpen(false);
  }

  const handleChange = (val) => {
    setGoal({...goal, ...val});
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.colorPicker}>
          <ColorPicker
            color={goal.color}
            onChange={handleChange}
          />
        </div>

        <div className={styles.input}>
          <TextField
            label="Identity/Goal"
            variant="outlined"
            fullWidth='true'
            size='small'
            onChange={(evt) => handleChange({'name': evt.target.value})}
          />
        </div>
      </div>

      <div className={styles.footer}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className={styles.submit}
        >
          Save
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default GoalForm;
