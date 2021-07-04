import React from 'react';
import styles from './SessionBlock.module.scss';
import { useDispatch } from 'react-redux';
import {
  setBlock,
  toggleModal,
  setEditor
} from '../../redux/actions';
import { TextField } from '@material-ui/core';
import { EDITOR_TYPES } from '../../constants';

export const SessionBlock = ({
  block
}) => {
  const dispatch = useDispatch();

  const onBlockClick = () => {
    dispatch(setBlock(block));
    dispatch(toggleModal({isOpen: true}));
  }

  const onNoteClick = () => {
    dispatch(setBlock(block));
    dispatch(toggleModal({isOpen: true}));

    dispatch(setEditor({type: EDITOR_TYPES.REGULAR}))
  }

  return (
    <div className={styles.container}
      onClick={onBlockClick}
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

      {block.note &&
        <div
          className={styles.bottom}
          onClick={onNoteClick}
        >
        
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="note"
            name="note"
            value={block.note}
            multiline={true}
            InputProps={{
              className: styles.note,
            }}
          />
        </div>
      }
    </div>
  )
}

export default SessionBlock;