import React from 'react';
import styles from './SessionList.module.scss';
import { useSelector } from 'react-redux';
import { SessionBlock } from '../common';
import { parseISO, format } from 'date-fns';


export const SessionList = () => {
  const {blocksByDate} = useSelector(state => state);

  return (
    <div className={styles.container}>
      {Object.keys(blocksByDate).map(date => {
        if (blocksByDate[date].length > 0) {
          return (
            <div
              className={styles.dateContainer}
              key={date}
            >
              <div className={styles.date}>
                {format(parseISO(date), 'E MMM dd')}
              </div>
  
              {blocksByDate[date].map(block => {
                return (
                  <div key={block.id}>
                    <SessionBlock
                      block={block}
                    />
                  </div>
                )
              })}
            </div>
          )
        }
      })}
    </div>
  )
}

export default SessionList;