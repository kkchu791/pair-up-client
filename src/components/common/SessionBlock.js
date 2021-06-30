import React from 'react';
import styles from './SessionBlock.module.scss';
import { useDispatch } from 'react-redux';
import {
  setBlock,
  toggleModal,
} from '../../redux/actions';
import { serialize } from '../../utils';

export const SessionBlock = ({
  block
}) => {
  const dispatch = useDispatch();

  const onBlockClick = () => {
    dispatch(setBlock(block));
    dispatch(toggleModal({isOpen: true}));
  }

  return (
    <div className={styles.container}
      onClick={() => onBlockClick()}
    >

      <div className={styles.top}>
        <div
          className={styles.color}
          style={{background: block.color}}
        >
        </div>
        <div className={styles.name}>
          {block.task}
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.note}>
          {block.note}
        </div>

        <pre>
          <div className={styles.text}>
            {block.text && serialize(JSON.parse(block.text))}
          </div>
        </pre>
      </div>
      
    </div>
  )
}

export default SessionBlock;