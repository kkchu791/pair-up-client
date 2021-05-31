import React from 'react';
import styles from './SessionList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SessionBlock } from '../common';

export const SessionList = () => {
  const {blocksByDate} = useSelector(state => state);

  const renderSessionBlock = (block) => {
    return (
      <div className={styles.sessionBlock}>
        {block.task}
      </div>
    )
  }

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