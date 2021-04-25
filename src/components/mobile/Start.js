import React, {useEffect} from 'react';
import { StartForm } from './StartForm';
import { CurrentBlockDisplay } from './CurrentBlockDisplay';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGoals,
  getTimeBlocks,
  getBlocksByDate,
} from '../../redux/actions';
import styles from './Start.module.scss';
import { useAuthState } from '../../context';
import { startOfWeek, endOfWeek } from 'date-fns';

export const Start = () => {
  const {currentDate} = useSelector(state => state.date);
  const currentBlock = useSelector(state => state.block);
  const start = startOfWeek(currentDate, {weekStartsOn: 1});
  const end = endOfWeek(currentDate, {weekStartsOn: 1});
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();

  useEffect(() => { 
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [currentDate, dispatch, start, end, userDetails.id]);

  useEffect(() => {
    dispatch(getGoals({
      userId: userDetails.id,
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

  return (
    <div className={styles.container}>
      {currentBlock ? <CurrentBlockDisplay /> : <StartForm />}
    </div>
  )
}

export default Start;