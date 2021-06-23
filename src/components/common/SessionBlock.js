import React from 'react';
import styles from './SessionBlock.module.scss';
import { useDispatch } from 'react-redux';
import {
  setBlock,
  toggleModal,
} from '../../redux/actions';

export const SessionBlock = ({
  block
}) => {
  const dispatch = useDispatch();

  const onBlockClick = () => {
    dispatch(setBlock(block));
    dispatch(toggleModal({isOpen: true}))
  }

  return (
    <div className={styles.container}
      onClick={() => onBlockClick()}
    >
      <div
        className={styles.color}
        style={{background: block.color}}
      >
      </div>
      <div className={styles.name}>
        {block.task}
      </div>
    </div>
  )
}

export default SessionBlock;