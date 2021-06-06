import React, {useEffect} from 'react';
import styles from './Dashboard.module.scss';
import { Scheduler } from './Scheduler';
import { Current } from './Current';
import { ActionsPanel } from './ActionsPanel';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleModal,
  getBlocksByDate,
  getTimeBlocks,
  // setBlock
} from '../../redux/actions';
import { TaskModal } from './TaskModal';
import { TaskForm } from './TaskForm';
// import { Timer } from '../common';
import { useAuthState } from '../../context';
// import { format } from 'date-fns';
// import { getCurrentMilitaryTime } from '../../utils';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.modal);
  const {currentDate} = useSelector(state => state.date);
  const start = startOfWeek(currentDate, {weekStartsOn: 1});
  const end = endOfWeek(currentDate, {weekStartsOn: 1});
  const {userDetails} = useAuthState();

  // const handleGetBlocksSuccess = (resp) => {
  //   let list = resp[format(new Date(), 'yyyy-MM-dd')];
  //   getActiveBlock(list);
  // }

  useEffect(() => { 
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: (resp) => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [currentDate, dispatch, start, end, userDetails.id]);

  useEffect(() => {
    dispatch(getTimeBlocks({
      onSuccess: () => console.log('success timeBlock'),
      onError: () => console.log('error timeBlock')
    }));
  }, [dispatch]);

  const closeModal = () => {
    dispatch(toggleModal(false));
  }

  // const getActiveBlock = (list) => {
  //   let currentBlock = list.find(bl => bl.end_time > getCurrentMilitaryTime());

  //   if (currentBlock) {
  //     dispatch(setBlock(currentBlock));
  //   }
  // }

  return (
    <div className={styles.container}>
      {/* {currentBlock && <Timer />} */}
      <TaskModal
        onClose={closeModal}
        open={isOpen}
      >
        <TaskForm />
      </TaskModal>
      <Current />
      <Scheduler
        dates={eachDayOfInterval({start, end})}
      />
      <ActionsPanel />
    </div>
  )
}

export default Dashboard;