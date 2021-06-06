import React, {useEffect} from 'react';
import styles from './Sessions.module.scss';
import { Filter, Summary } from '../common';
import { SessionList } from './SessionList';
import {useSelector, useDispatch} from 'react-redux';
import { getBlocksByDate } from '../../redux/actions';
import { FILTER_DATES} from '../../constants';
import { useAuthState } from '../../context';

export const Sessions = () => {
  let blocks = useSelector(state => state.blocksByDate);
  const dispatch = useDispatch();
  const {userDetails} = useAuthState();

  blocks = Object.keys(blocks).reduce((acc, date) => {
    return [...acc, ...blocks[date]];
  }, []);

  useEffect(() => {

  }, [])

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

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Filter
          onFilterClick={handleFilterClick}
        />
      </div>

      <div className={styles.blockSummary}>
        <Summary
          blocks={blocks}
        />
      </div>

      <div className={styles.list}>
        <SessionList

        />
      </div>


    </div>
  )
}

export default Sessions;