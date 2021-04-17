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
} from '../redux/actions';
import { TaskModal } from './TaskModal';
import { TaskForm } from './TaskForm';
import { useAuthState } from '../context';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.modal);
  const {currentDate} = useSelector(state => state.date);
  const start = startOfWeek(currentDate, {weekStartsOn: 1});
  const end = endOfWeek(currentDate, {weekStartsOn: 1});
  const {userDetails} = useAuthState();

  useEffect(() => { 
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [currentDate, dispatch, start, end]);

  useEffect(() => {
    dispatch(getTimeBlocks({
      onSuccess: () => console.log('success timeBlock'),
      onError: () => console.log('error timeBlock')
    }));
  }, [dispatch]);

  const closeModal = () => {
    dispatch(toggleModal(false));
  }

  return (
    <div className={styles.container}>
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