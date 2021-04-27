import React, {useState, useEffect} from 'react';
import styles from './Timer.module.scss';
import { differenceInSeconds } from 'date-fns'
import { setBlock } from '../../redux/actions';
import { getCurrentTime } from '../../utils';
import {useDispatch} from 'react-redux';

export const Timer = ({
  currentBlock
}) => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const start = getCurrentTime();
      const end = getCurrentTime() < currentBlock.start_time ?  currentBlock.start_time : currentBlock.end_time
      const startDate = new Date('01/01/2001 ' + start);
      const endDate = new Date('01/01/2001 ' + end);
      const seconds = differenceInSeconds(endDate, startDate);
      setSeconds(seconds);
    }, 1000);

    if (seconds < 0) {
      console.log('end time')
      dispatch(setBlock(null));
      return () => clearInterval(interval);
    }
  }, [currentBlock])
  
  return (
    <div className={styles.container}>
      
      {new Date(seconds * 1000).toISOString().substr(11, 8)}
    </div>
  )
}

export default Timer;