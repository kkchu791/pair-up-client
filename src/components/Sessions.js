import React, { useEffect } from 'react';
import styles from './Sessions.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {PastBlock} from './PastBlock';
import { getBlocksByDate } from '../redux/actions';

export const Sessions = () => {
  const blocksByDate = useSelector(state => state.blocksByDate);
  const date = useSelector(state => state.date);
  const dispatch = useDispatch();

  useEffect(() => {
    let start = new Date(date)
    start.setDate(start.getDate() - 6);
    const end = date;
    dispatch(getBlocksByDate({
      start, 
      end,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [getBlocksByDate]);

  return (
    <div className={styles.container}>      
      {
        Object.keys(blocksByDate).map((date)=> {
          return (
            <div
              key={date}
              className={styles.dayColumn}
            >
              <div>{date}</div>
              {blocksByDate[date].map(block => {
                return (
                  <div key={block.id}>
                    <PastBlock
                      block={block}
                    />
                  </div>
                )
              })}
            </div>
          )
        })
      }

    </div>
  )
}

export default Sessions;
