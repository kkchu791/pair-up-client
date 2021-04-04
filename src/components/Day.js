import React from 'react';
import styles from './Day.module.scss';
import clsx from 'clsx';
import { SlotBlock } from './SlotBlock';
import { useSelector } from 'react-redux';

export const Day = ({
  date,
}) => {
  const timeBlocks = useSelector(state => state.timeBlocks);
  const renderTimeBlock = (timeBlock) => {
    return (
      <div key={timeBlock.id}>
        <SlotBlock
          timeBlock={timeBlock}
          date={date}
        />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={clsx(styles.dayColumn, date)}>
        <div className={styles.blocks}>
          {timeBlocks.map(renderTimeBlock)}
        </div>
      </div>
    </div>
  )
}

export default Day;
