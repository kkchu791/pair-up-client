import React from 'react';
import styles from './SessionList.module.scss';
import { useSelector } from 'react-redux';
import { SessionBlock } from '../common';

export const SessionList = () => {
  const {blocksByDate} = useSelector(state => state);

  return (
    <div className={styles.container}>
      {Object.keys(blocksByDate).map(date => {
        return (
          <div className={styles.dateContainer}>
            <div className={styles.date}>
              {date}
            </div>

            {blocksByDate[date].map(block => {
              return (
                <SessionBlock
                  block={block}
                />
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default SessionList;