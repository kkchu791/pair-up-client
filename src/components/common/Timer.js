import React, {useState, useEffect} from 'react';
import styles from './Timer.module.scss';
import { differenceInSeconds } from 'date-fns';
import { getCurrentMilitaryTime } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';

export const Timer = ({
  isShowing,
  onBeginning,
  onEnding,
}) => {
  const dispatch = useDispatch();
  const [seconds, setSeconds] = useState(null);
  const { currentBlock } = useSelector(state => state.blocks);
  const isStarting = getCurrentMilitaryTime() < currentBlock.start_time;

  useEffect(() => {
    const interval = setInterval(() => {
      const start = getCurrentMilitaryTime();
      const end = isStarting ?  currentBlock.start_time : currentBlock.end_time;
      const startDate = new Date('01/01/2001 ' + start);
      const endDate = new Date('01/01/2001 ' + end);
      const seconds = differenceInSeconds(endDate, startDate);
      setSeconds(seconds);
    }, 1000);
  
    if (seconds === 1 && isStarting) {
      console.log('is begin')
      onBeginning();
      clearInterval(interval)
    }

    if (seconds < 0 && !isStarting) {
      console.log('is ending')
      onEnding();
      clearInterval(interval)
    }

    return () => clearInterval(interval);
  }, [
    currentBlock,
    dispatch,
    isStarting,
    seconds,

  ]);
  
  return (
    <div className={styles.container}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {`${new Date(seconds * 1000).toISOString().substr(11, 8)}`} until {isStarting ? 'start' : 'end'} - Greatness Go
        </title>
        <link rel="greatness go" href="https://greatnessgo.com/" />
      </Helmet>

      {isShowing ? <div>{new Date(seconds * 1000).toISOString().substr(11, 8)}</div> : null }
    </div>
  )
}

export default Timer;