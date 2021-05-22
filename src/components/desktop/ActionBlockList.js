import React, {useEffect} from 'react';
import styles from './ActionBlockList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Block } from '../common';
import { getActionBlocks } from '../../redux/actions';
import { useAuthState } from '../../context';
import { getNearestTimeBlock } from '../../utils';
import { updateBlock } from '../../redux/actions'
import { format } from 'date-fns';

export const ActionBlockList = () => {
  const dispatch = useDispatch();
  const {actionBlocks} = useSelector((state) => state.blocks);
  const {currentGoal} = useSelector((state) => state.goals);
  const {timeBlocks} = useSelector((state) => state);
  const {userDetails} = useAuthState();
  
  useEffect(() => {
    dispatch(getActionBlocks({
      userId: userDetails.id,
      goalId: currentGoal.id,
      onSuccess: () => console.log('success get action blocks'),
      onError: () => console.log('error on fetching action blocks')
    }))
  }, [currentGoal]);

  const onScheduleClick = (block) => {
    const timeBlockId = getNearestTimeBlock(timeBlocks).id;
    const date = format(new Date(), 'yyyy-MM-dd');
    dispatch(updateBlock({
      id: block.id,
      time_block_id: timeBlockId,
      date,
      onSuccess: () => console.log('success in updating block'),
      onError: () => console.log('success in updating error'),
    }));
  }

  return (
    <div className={styles.container}>
      {actionBlocks.map(block => {
        return (
          <div key={block.id} className={styles.block}>
            <Block
              block={block}
              onScheduleClick={onScheduleClick}
            />
          </div>
        )
      })}
    </div>
  )
}

export default ActionBlockList;