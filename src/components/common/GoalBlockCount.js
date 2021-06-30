import React from 'react';
import styles from './GoalBlockCount.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBlocksByDate,
  setFilter
} from '../../redux/actions';
import { FILTER_DATES } from '../../constants';
import { useAuthState } from '../../context';
import { IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';

export const GoalBlockCount = ({
  blocks
}) => {
  const dispatch = useDispatch();
  const { range, search, goalId } = useSelector(state => state.filter);
  const {currentDateObj} = useSelector(state => state.date);
  const [start, end] = FILTER_DATES[range](currentDateObj);
  const { userDetails } = useAuthState();

  const goalBlocks = blocks.reduce((acc, block) => {
    if (acc[block.goal_id] !== undefined) {
      acc[block.goal_id] = [...acc[block.goal_id], block];
    } else {
      acc[block.goal_id] = [block];
    }

    return acc;
  }, {});

  const handleGoalClick = (goalId) => {
    dispatch(setFilter({goalId}));

    dispatch(getBlocksByDate({
      start, 
      end,
      search,
      goalId,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }

  const renderGoalBlock = (goalId) => {
    return (
      <div
        className={styles.goalBlock}
        key={goalId}
        onClick={() => handleGoalClick(goalId)}
      >
        <div
          className={styles.color}
          style={{background: goalBlocks[goalId][0].color || 'lightblue'}}
        >
        </div>

        <div className={styles.count}>
          {goalBlocks[goalId].length}
        </div>

        <div className={styles.name}>
          {goalBlocks[goalId][0].goal_name || 'no goal'}
        </div>
      </div>
    )
  }

  const resetGoalFilter = () => {
    dispatch(setFilter({goalId: null}));

    dispatch(getBlocksByDate({
      start, 
      end,
      search,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }

  return (
    <div className={styles.container}>
      {Object.keys(goalBlocks).map(renderGoalBlock)}

      {goalId &&
        <div className={styles.cancel}>
          <IconButton
            size={'small'}
            onClick={() => resetGoalFilter()}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </div>
      }
    </div>
  )
}

export default GoalBlockCount;

