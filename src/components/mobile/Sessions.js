import React, {useEffect} from 'react';
import styles from './Sessions.module.scss';
import { SessionList } from './SessionList';
import {useSelector, useDispatch} from 'react-redux';
import { getBlocksByDate, toggleModal } from '../../redux/actions';
import { FILTER_DATES} from '../../constants';
import { useAuthState } from '../../context';
import { Filter, Summary, BlockForm } from '../common';

export const Sessions = () => {
  let {isOpen} = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();
  const { currentDateObj } = useSelector(state => state.date);

  const handleFilterClick = (filter) => {
    const [start, end] = FILTER_DATES[filter];
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: (e) => console.log('errored', e),
    }));
  }

  useEffect(() => {
    const [start, end] = FILTER_DATES.day(currentDateObj);
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: (resp) => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [dispatch, userDetails.id]);

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
            <Filter
              onFilterClick={handleFilterClick}
            />
          </div>

          <div className={styles.blockSummary}>
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