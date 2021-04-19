import React, {useState} from 'react';
import styles from './GoalItem.module.scss';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { IconButton } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { removeGoal } from '../redux/actions';
import { GoalForm } from './GoalForm';

export const GoalItem = ({
  goal
}) => {
  const dispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleRemove = () => {
    dispatch(removeGoal({
      id: goal.id,
      onSuccess: () => setIsDeleting(false),
      onError: () => console.log('on error'),
    }))
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div>
      {isEditing ? 
        <GoalForm
          existingGoal={goal}
          setIsOpen={setIsEditing}
        />
      :
      <div className={styles.container}>
        <div className={styles.info}>
          <div className={styles.color} style={{background: goal.color}}>
          </div>

          <div className={styles.name}>
            {goal.name}
          </div>
        </div>

        <div className={styles.actions}>
          {isDeleting ?
            <div className={styles.deleteConfirm}>
              <div className={styles.confirmText}>
                Are you sure?
              </div>
              <div className={styles.cancel}>
                <IconButton
                  size={'small'}
                  color='primary'
                >
                  <CloseOutlinedIcon
                    onClick={() => setIsDeleting(false)}
                  />
                </IconButton>
              </div>
              <div className={styles.confirm}>
                <IconButton
                  size={'small'}
                  color='primary'
                >
                  <CheckIcon onClick={handleRemove} />
                </IconButton>
              </div>
            </div>

            :

            <div className={styles.defaultButtons}>
              <div className={styles.button}>
                <IconButton color='primary' size='small'>
                  <EditIcon onClick={handleEdit} />
                </IconButton>
              </div>

              <div className={styles.button}>
                <IconButton color='primary' size='small'>
                  <DeleteIcon onClick={() => setIsDeleting(true)} />
                </IconButton>
              </div>
            </div>
          }
        </div>
      </div>
    }
    </div>
  )
}

export default GoalItem;
