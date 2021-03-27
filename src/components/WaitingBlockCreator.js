import React from 'react';
import { Button } from '@material-ui/core';
import styles from './WaitingBlockCreator.module.scss';
import {convertTimeTo24} from '../utils';
import {
  setBlock,
  deleteBlock,
  toggleModal } from '../redux/actions';
import { useDispatch } from 'react-redux';

export const WaitingBlockCreator = ({
  timeBlock,
  block,
  date,
  userDetails,
}) => {
  const dispatch = useDispatch();

  const cancelClick = async (evt) => {
    evt.stopPropagation();

    dispatch(deleteBlock({
      userId: userDetails.id,
      blockId: block.id,
      date,
      onSuccess: () => {console.log('success delete')},
      onError: () => {console.log('error delete')},
    }));
  }

  const handleBoxClick = (evt) => {
    dispatch(toggleModal({isOpen: true}));
    dispatch(setBlock(block));
  }

  return (
    <div onClick={handleBoxClick} style={{background: block.color}} className={styles.container}>
      <div className={styles.blockInfo}>
        <div className={styles.task}>
          {block.task}
        </div>
        <div className={styles.time}>
          {convertTimeTo24(timeBlock.start_time)} - {convertTimeTo24(timeBlock.end_time)}
        </div>
        <div className={styles.name}>
          Matching...
        </div>
      </div>

      <div className={styles.blockButton}>
        <Button
          variant="contained"
          color="secondary"
          className='cancelButton'
          onClick={(evt) => cancelClick(evt)}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}

export default WaitingBlockCreator;
