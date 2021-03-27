import React from 'react';
import styles from './PastBlock.module.scss';
import {
  toggleModal,
  setBlock
} from '../redux/actions';
import { useDispatch } from 'react-redux';

export const PastBlock = ({
  block,
}) => {
  const dispatch = useDispatch();

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
      </div>
    </div>
  )
}

export default PastBlock;
