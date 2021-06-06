import React, {useState} from 'react';
import styles from './WaitingBlockCreator.module.scss';
import {convertTimeTo24} from '../../utils';
import {
  setBlock,
  deleteBlock,
  toggleModal,
  setGoal,
} from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { CancellingButtons } from '../common/CancellingButtons';

export const WaitingBlockCreator = ({
  timeBlock,
  block,
}) => {
  const dispatch = useDispatch();

  return (
    <div onClick={handleBoxClick} style={{background: block.color}} className={styles.container}>
      <div className={styles.blockInfo}>
        <div className={styles.time}>
          {convertTimeTo24(timeBlock.start_time)} - {convertTimeTo24(timeBlock.end_time)}
        </div>
        <div className={styles.task}>
          {block.task}
        </div>
        {/* <div className={styles.name}>
          Matching...
        </div> */}
      </div>
      
      <div className={styles.blockButton}>
        <RescheduleButtons
          isScheduled={block.time_block_id > 0}
          confirmingRescheduleClick={confirmingRescheduleClick}
        />
        <CancellingButtons
          confirmingCancelClick={confirmingCancelClick}
        />
      </div>
    </div>
  )
}

export default WaitingBlockCreator;
