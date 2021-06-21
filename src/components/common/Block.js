import React from 'react';
import styles from './Block.module.scss';
import {convertTimeTo24} from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../../context';
import { CancellingButtons } from './CancellingButtons';
import { RescheduleButtons } from './RescheduleButtons';
import {
  deleteBlock,
  setBlock,
} from '../../redux/actions';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { IconButton } from '@material-ui/core';
import { BLOCK_TYPE } from '../../constants';

export const Block = ({
  block,
  onScheduleClick,
  onBoxClick = () => console.log('on box click'),
}) => {
  const { userDetails } = useAuthState();
  let { currentBlock } = useSelector(state => state.blocks);
  const { currentDateStr } = useSelector(state => state.date);
  const dispatch = useDispatch();
  currentBlock = block ? block : currentBlock;

  const handleDelete = () => {
    dispatch(setBlock({}));
  }

  const confirmingCancelClick = () => {
    dispatch(deleteBlock({
      userId: userDetails.id,
      blockId: currentBlock.id,
      date: currentDateStr,
      onSuccess: () => handleDelete(),
      onError: () => {console.log('error delete')},
    }));
  }

  const confirmingRescheduleClick = () => {
    onScheduleClick(block);
  }

  return (
    <div
      onClick={() => onBoxClick(currentBlock)}
      style={{background: currentBlock.color}}
      className={styles.container}
    >
      <div className={styles.blockInfo}>
        {currentBlock.time_block_id &&
          <div className={styles.time}>
            {convertTimeTo24(currentBlock.start_time)} - 
            {convertTimeTo24(currentBlock.end_time)}
          </div>
        }
        <div className={styles.task}>
          {currentBlock.task}
        </div>
      </div>

      <div className={styles.blockType}>
        {block.type === BLOCK_TYPE['IMPROVEMENT'] ?
          <IconButton
            size={'small'}
          >
            <InfoOutlinedIcon />
          </IconButton> : ''
        }
      </div>
      
      <div className={styles.blockButtons}>
        <RescheduleButtons
          isScheduled={currentBlock.time_block_id > 0}
          confirmingRescheduleClick={confirmingRescheduleClick}
        />
        <CancellingButtons
          confirmingCancelClick={confirmingCancelClick}
        />
      </div>
    </div>
  )
}

export default Block;