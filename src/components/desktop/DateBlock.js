import React from 'react';
import styles from './DateBlock.module.scss';
import {useSelector} from 'react-redux';
import { BLOCK_TYPE } from '../../constants';
import { format } from 'date-fns';

export const DateBlock = ({
  date,
}) => {
  const blocks = useSelector(state => state.blocksByDate[format(date, 'yyyy-MM-dd')]);
  const improvementBlocksCount = blocks && blocks.filter(bl => bl.type === BLOCK_TYPE['IMPROVEMENT']).length;

  return (
    <div className={styles.container} key={new Date(date).valueOf()}>
      <div className={styles.dayName}>
        {date.toLocaleDateString('en-US', { weekday: 'short' })}
      </div>
      <div className={styles.dayNumber}>
        {date.getDate()}
      </div>
      <div className={styles.improvementCounter}>
        {improvementBlocksCount > 0 ? `${improvementBlocksCount} Improvement Block Completed` : ''}
      </div>
    </div>
  )
}

export default DateBlock;