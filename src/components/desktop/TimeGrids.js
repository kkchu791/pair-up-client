import React from 'react';
import { useSelector } from 'react-redux';
import styles from './TimeGrids.module.scss';
import { TimeGrid } from './TimeGrid';

export const TimeGrids = () => {
  const timeBlocks = useSelector(state => state.timeBlocks);

  return (
    <div className={styles.container}>
      {timeBlocks.map(timeBlock => {
        return (
          <div key={timeBlock.start_time}>
            <TimeGrid
              timeBlock={timeBlock}
            />
          </div>
        )
      })}
    </div>
  )
}

export default TimeGrids;