import React from 'react';
import styles from './PastBlock.module.scss';
import {
  toggleModal,
  setBlock,
  setGoal,
} from '../../redux/actions';
import { useDispatch } from 'react-redux';

export const PastBlock = ({
  block,
}) => {
  const dispatch = useDispatch();

  const handleBoxClick = (evt) => {
    dispatch(toggleModal({
      isOpen: true,
      date: new Date(block.date).toISOString().slice(0,10)
    }));

    dispatch(setBlock(block));

    dispatch(setGoal({
      id: block.goal_id,
      name: block.goal_name,
      note: block.goal_note,
    }));
  }

  return (
    <div onClick={handleBoxClick} style={{background: block.color}} className={styles.container}>
      <div className={styles.blockInfo}>
        <div className={styles.task}>
          {block.task}
        </div>
      </div>
    </div>
  )
}

export default PastBlock;
