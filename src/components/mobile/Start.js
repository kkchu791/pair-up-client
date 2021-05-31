import React, {useState, useEffect} from 'react';
import { StartForm } from './StartForm';
import { CurrentBlockDisplay } from './CurrentBlockDisplay';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGoals,
  getTimeBlocks,
  getBlocksByDate,
  setBlock,
} from '../../redux/actions';
import styles from './Start.module.scss';
import { useAuthState } from '../../context';
import { startOfWeek, endOfWeek } from 'date-fns';
import { getCurrentMilitaryTime } from '../../utils';

export const Start = () => {
  const {currentDate} = useSelector(state => state.date);
  const { currentBlock } = useSelector(state => state.blocks);
  const start = startOfWeek(currentDate, {weekStartsOn: 1});
  const end = endOfWeek(currentDate, {weekStartsOn: 1});
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();

  const handleGetBlocksSuccess = (resp) => {
    let list = resp[new Date().toISOString().slice(0,10)];
    getCurrentBlock(list);
  }

  useEffect(() => { 
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: (resp) => handleGetBlocksSuccess(resp),
      onError: () => console.log('errored'),
    }));
  }, [currentDate, dispatch, userDetails.id]);

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

  const getCurrentBlock = (list) => {
    let currentBlock = list.find(bl => bl.end_time > getCurrentMilitaryTime());

    if (currentBlock) {
      dispatch(setBlock(currentBlock));
    }
  }

  return (
    <div className={styles.container}>
      {Object.keys(currentBlock).length > 0 ? <CurrentBlockDisplay /> : <StartForm />}
    </div>
  )
}

export default Start;