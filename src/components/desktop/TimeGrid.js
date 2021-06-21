import React, {useCallback} from 'react';
import styles from './TimeGrid.module.scss';
import {convertTimeTo24Grid, roundMinutes} from '../../utils';
import clsx from 'clsx';

export const TimeGrid = ({
  timeBlock,
}) => {
  const startTime = convertTimeTo24Grid(timeBlock.start_time).split(":");
  const userTime = roundMinutes(new Date());

  const gridRef = useCallback(node => {
    if (timeBlock.start_time === userTime && node) {
      node.scrollIntoView({
        behavior: "smooth",
        block: 'start',
      });
    }
  }, [timeBlock.start_time, userTime]);

  return (
    <div className={styles.container}>
      {parseInt(startTime[1]) > 0 ? 
        <div
          className={clsx(styles.timeGrid, styles.minutes)}
          key={timeBlock.start_time}
        >
          :{startTime[1]}
        </div>

        :

        <div
          className={styles.timeGrid}
          key={timeBlock.start_time}
          ref={gridRef}
        >
          {startTime[0]}{startTime[2]}
        </div>
      } 
    </div>
  )
}

export default TimeGrid;


