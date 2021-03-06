import React from 'react';
import styles from './Scheduler.module.scss';
import { Day } from './Day';
import { DateBlock } from './DateBlock';
import { SchedulerControls } from './SchedulerControls';
import { TimeGrids } from './TimeGrids';

export const Scheduler = ({
  dates,
}) => {
  

  return (
    <div className={styles.container}>
      <SchedulerControls
        startDate={dates[0]}
        endDate={dates[6]}
      />
      <div className={styles.dates}>
        {dates.map(date => <div key={date}><DateBlock date={date} /></div>)}
      </div>
      <div className={styles.grids}>
        <TimeGrids />
        {dates.map(date => {
          const formattedDate = date.toISOString().slice(0,10);
          return (
            <div key={formattedDate}>
              <Day
                date={formattedDate}
              />
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

export default Scheduler;
