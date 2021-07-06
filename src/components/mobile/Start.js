import React, {useEffect } from 'react';
import { StartForm } from './StartForm';
import { CurrentBlockDisplay } from './CurrentBlockDisplay';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGoals,
  getTimeBlocks,
  getBlocksByDate,
  getActiveBlock,
} from '../../redux/actions';
import styles from './Start.module.scss';
import { useAuthState } from '../../context';
import { startOfWeek, endOfWeek } from 'date-fns';
import { GOAL_TYPES } from '../../constants';

export const Start = () => {
  const { currentDateObj } = useSelector(state => state.date);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const { activeBlock } = useSelector(state => state.blocks);

  useEffect(() => { 
    dispatch(getActiveBlock({
      userId: userDetails.id,
      onSuccess: () => console.log(' on success fetch current'),
      onError: () => console.log('on error fetch current'),
    }))
  }, [dispatch, userDetails.id]);

  useEffect(() => {
    const start = startOfWeek(currentDateObj, {weekStartsOn: 1});
    const end = endOfWeek(currentDateObj, {weekStartsOn: 1});

    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: (resp) => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [currentDateObj, dispatch, userDetails.id]);

  useEffect(() => {
    dispatch(getGoals({
      userId: userDetails.id,
      type: GOAL_TYPES.OUTDOOR,
      onSuccess: () => console.log('on success for get goals'),
      onError: () => console.log('on error for get goals'),
    }));
  }, [dispatch, userDetails.id])

  useEffect(() => {
    dispatch(getTimeBlocks({
      onSuccess: () => console.log('success timeBlock'),
      onError: () => console.log('error timeBlock')
    }));
  }, [dispatch]);

  console.log('clearing currentBlockDisplay?', Object.keys(activeBlock).length > 4)

  return (
    <div className={styles.container}>
      {Object.keys(activeBlock).length > 4 ? <CurrentBlockDisplay /> : <StartForm />}
    </div>
  )
}

export default Start;