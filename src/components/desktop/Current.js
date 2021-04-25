import React from 'react';
import styles from './Current.module.scss';
//import { Upcoming } from './Upcoming';
// import {Network} from './Network';
import { useSelector } from 'react-redux';
import { Timer } from './Timer'; 

export const Current = () => {

  // const block = useSelector(state => state.block); 
  // const dateStr = new Date(block.date).toISOString().slice(0,10);    
  // const timeStr = block.start_time;
  // let targetTime = dateStr + ' ' + timeStr;

  // console.log(targetTime, 'targetTime')
  
  return (
    <div className={styles.container}>

      {/* <Timer targetTime={targetTime}/> */}
      {/* <Upcoming /> */}
      {/* <Network /> */}
    </div>
  )
}

export default Current;
