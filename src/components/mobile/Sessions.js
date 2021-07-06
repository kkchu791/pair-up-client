import React, {useEffect} from 'react';
import styles from './Sessions.module.scss';
import { SessionList } from './SessionList';
import {useSelector, useDispatch} from 'react-redux';
import {
  getBlocksByDate,
  toggleModal,
  setFilter,
} from '../../redux/actions';
import { FILTER_DATES} from '../../constants';
import { useAuthState } from '../../context';
import {
  Filter,
  Summary,
  BlockForm,
  Search,
  GoalTypeSelector
} from '../common';
import { NavButtons } from '../desktop/NavButtons';
import { format } from 'date-fns';

export const Sessions = () => {
  let {isOpen} = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const { currentDateObj } = useSelector(state => state.date);
  const { range, type, search, goalId } = useSelector(state => state.filter);
  const [start, end] = FILTER_DATES[range](currentDateObj);

  const renderDateRange = () => {
    if (format(start, 'E MM/dd/yy') === format(end, 'E MM/dd/yy')) { 
      return (
        `${format(start, 'E MM/dd/yy')}`
      )
    } else {
      return (
        `${format(start, 'E MM/dd/yy')} - ${format(end, 'E MM/dd/yy')}`
      )
    }
  }

  useEffect(() => {
    dispatch(getBlocksByDate({
      start, 
      end,
      search,
      range,
      type,
      goalId,
      userId: userDetails.id,
      onSuccess: (resp) => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [dispatch, userDetails.id]);

  useEffect(() => {
    dispatch(setFilter({
      range: 'day',
      search: '',
    }));
  }, [])

  const handleTypeChange = (option) => {
    dispatch(setFilter({
      type: option.type,
    }))

    dispatch(getBlocksByDate({
      start, 
      end,
      type: option.type,
      search,
      goalId,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: (e) => console.log('errored', e),
    }));
  }

  return (
    <div className={styles.container}>

      {isOpen ?
        <div className={styles.blockForm}>
          <BlockForm
            onClose={() => dispatch(toggleModal({isOpen: false}))}
          />
        </div>

        :

        <div>
          <div className={styles.filters}>
            <Filter />
            <div className={styles.search}>
              <NavButtons />
              <Search />
            </div>
          </div>

          <div className={styles.goalTypeFilter}>
            <GoalTypeSelector
              goal={{type}}
              handleChange={handleTypeChange}
            />
          </div>

          <div className={styles.dateRange}>
            { renderDateRange() }
          </div>

          <div className={styles.summary}>
            <Summary />
          </div>

          <div className={styles.list}>
            <SessionList />
          </div>
        </div>
      }
    </div>
  )
}

export default Sessions;