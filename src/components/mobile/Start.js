import React, {useEffect, useCallback} from 'react';
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
import { format } from 'date-fns';

export const Start = () => {
  const { currentDateObj } = useSelector(state => state.date);
  const { currentBlock } = useSelector(state => state.blocks);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();

  const handleGetBlocksSuccess = useCallback((resp) => {
    const getCurrentBlock = (list) => {
      if (!list) return
      let currentBlock = list.find(bl => bl.end_time > getCurrentMilitaryTime());
  
      if (currentBlock) {
        dispatch(setBlock(currentBlock));
      }
    }

    let list = resp[format(new Date(), 'yyyy-MM-dd')];
  
    getCurrentBlock(list);
  }, [dispatch]);

  useEffect(() => { 

    const start = startOfWeek(currentDateObj, {weekStartsOn: 1});
    const end = endOfWeek(currentDateObj, {weekStartsOn: 1});

    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: (resp) => handleGetBlocksSuccess(resp),
      onError: () => console.log('errored'),
    }));
  }, [currentDateObj, dispatch, userDetails.id, handleGetBlocksSuccess]);

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
      {Object.keys(currentBlock) && Object.keys(currentBlock).length > 1 ? <CurrentBlockDisplay /> : <StartForm />}
    </div>
  )
}

export default Start;