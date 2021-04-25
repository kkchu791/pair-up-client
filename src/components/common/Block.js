import React, {useState} from 'react';
import styles from './Block.module.scss';
import {convertTimeTo24} from '../../utils';
import { deleteBlock } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { IconButton } from '@material-ui/core';
import { useAuthState } from '../../context';

export const Block = ({
  onClick
}) => {
  const {userDetails} = useAuthState();
  const currentBlock = useSelector(state => state.block);
  const {currentDate} = useSelector(state => state.date);
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
      blockId: currentBlock.id,
      date: currentDate,
      onSuccess: () => {console.log('success delete')},
      onError: () => {console.log('error delete')},
    }));
  }

  const handleBoxClick = (evt) => {
   onClick();
  }

  return (
    <div
      onClick={handleBoxClick}
      style={{background: currentBlock.color}}
      className={styles.container}
    >
      <div className={styles.blockInfo}>
        <div className={styles.time}>
          {convertTimeTo24(currentBlock.start_time)} - 
          {convertTimeTo24(currentBlock.end_time)}
        </div>
        <div className={styles.task}>
          {currentBlock.task}
        </div>
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

export default Block;
