import React, { useEffect } from 'react';
import styles from './Sessions.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {SessionList } from './SessionList';
import {
  getBlocksByDate,
  toggleModal,
  setDate,
  setFilter
} from '../../redux/actions';
import { TaskModal } from './TaskModal';
import { Retrospective } from './Retrospective';
import { useAuthState } from '../../context';
import { Filter, Summary, Search } from '../common';
import { FILTER_DATES } from '../../constants';
import { NavButtons } from './NavButtons';
import { format } from 'date-fns';

export const Sessions = () => {
  const dispatch = useDispatch();
  const {currentDateObj} = useSelector(state => state.date);
  const { isOpen } = useSelector(state => state.modal);
  const { range } = useSelector(state => state.filter);
  const { userDetails } = useAuthState();
  const [start, end] = FILTER_DATES[range](currentDateObj);
  
  useEffect(() => {
    dispatch(setDate({
      dateObj: new Date(),
      dateStr: format(new Date(), 'yyyy-MM-dd'),
    }));
  }, [])

  useEffect(() => {
    dispatch(setFilter({
      range: 'week',
      search: '',
    }));
  }, [])

  useEffect(() => {
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [dispatch, userDetails.id, range, currentDateObj]);

  const closeModal = () => {
    dispatch(toggleModal({isOpen: false}));
  }
  
  return (
    <div className={styles.container}>
      <TaskModal
        onClose={closeModal}
        open={isOpen}
      >
        <Retrospective />
      </TaskModal>

      <div className={styles.sideBarFilter}>
        <div className={styles.filters}>
          <Filter />
          <NavButtons />
        </div>
        <Search />
        <Summary />
      </div>

      <div className={styles.listContainer}>
        <SessionList />       
      </div>


    </div>
  )
}

export default Sessions;
