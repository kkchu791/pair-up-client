import React from 'react';
import styles from './Current.module.scss';
import { Upcoming } from './Upcoming';
// import {Network} from './Network';

export const Current = () => {
  
  return (
    <div className={styles.container}>
      <Upcoming />
      {/* <Network /> */}
    </div>
  )
}

export default Current;
