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
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { IconButton } from '@material-ui/core';

export const WaitingBlockCreator = ({
  timeBlock,
  block,
  date,
  userDetails,
}) => {
  const dispatch = useDispatch();
  const [isCanceling, setIsCanceling] = useState(false);

  const cancelClick = async (evt) => {
    evt.stopPropagation();
    setIsCanceling(true);
  }

  const cancelCancelClick = (evt) => {
    evt.stopPropagation();
    setIsCanceling(false);
  }

  const confirmCancelClick = (evt) => {
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
    dispatch(toggleModal({
      isOpen: true,
    }));
    
    dispatch(setBlock(block));

    dispatch(setGoal({
      id: block.goal_id,
      name: block.goal_name,
    }));
  }

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
        {isCanceling ?
          <div className={styles.cancelConfirm}>
            <div className={styles.confirmText}>Are you sure?</div>
            <div className={styles.cancel}>
              <IconButton
                size={'small'}
              >
                <CloseOutlinedIcon onClick={(evt) => cancelCancelClick(evt)} />
              </IconButton>
            </div>
            <div className={styles.confirm}>
              <IconButton
                size={'small'}
              >
                <CheckIcon onClick={(evt) => confirmCancelClick(evt)} />
              </IconButton>
            </div>
          </div>
          :
          <IconButton
            size={'small'}
          >
            <CloseOutlinedIcon onClick={(evt) => cancelClick(evt)} />
          </IconButton>

        }
      </div>
    </div>
  )
}

export default WaitingBlockCreator;
