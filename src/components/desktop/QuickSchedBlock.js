import React from 'react';
import styles from './QuickSchedBlock.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../../context';
import { CancellingButtons } from '../common/CancellingButtons';
import { RescheduleButtons } from '../common/RescheduleButtons';
import {
  deleteBlock,
  setBlock,
  toggleModal,
  setGoal,
} from '../../redux/actions';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { IconButton } from '@material-ui/core';
import { BLOCK_TYPE } from '../../constants';

export const QuickSchedBlock = ({
  block,
  onScheduleClick = () => console.log('on schedule click'),
}) => {
  const {userDetails} = useAuthState();
  let { currentBlock } = useSelector(state => state.blocks);
  const { currentDateStr } = useSelector(state => state.date);
  const dispatch = useDispatch();
  currentBlock = block ? block : currentBlock;

  const handleDelete = () => {
    dispatch(setBlock({}));
  }

  const onBoxClick = () => {
    dispatch(toggleModal({isOpen: true}))

    dispatch(setGoal({
      id: currentBlock.goal_id,
      name: currentBlock.goal_name,
    }));
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
        <div className={styles.task}>
          {currentBlock.task}
        </div>
      </div>

      <div className={styles.blockType}>
        {currentBlock.type === BLOCK_TYPE['IMPROVEMENT'] ?
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

export default QuickSchedBlock;