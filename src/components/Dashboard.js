import React, {useEffect, useCallback} from 'react';
import styles from './Dashboard.module.scss';
import { Scheduler } from './Scheduler';
import { Current } from './Current';
import { Events } from './Events';
import { startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleModal,
  getBlocksByDate,
  getTimeBlocks,
} from '../redux/actions';
import { TaskModal } from './TaskModal';
import { TaskForm } from './TaskForm';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.modal);
  const date = useSelector(state => state.date);
  const start = startOfWeek(date, {weekStartsOn: 1});
  const end = endOfWeek(date, {weekStartsOn: 1});

  useEffect(() => {
    dispatch(getTimeBlocks({
      onSuccess: () => console.log('success timeBlock'),
      onError: () => console.log('error timeBlock')
    }));

    dispatch(getBlocksByDate({
      start, 
      end,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [getBlocksByDate, getTimeBlocks]);

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
      <Events />
    </div>
  )
}

export default Dashboard;