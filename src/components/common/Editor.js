import React from 'react';
import styles from './Editor.module.scss';
import { SlateEditor } from './SlateEditor';
import { EDITOR_TYPES } from '../../constants';
import clsx from 'clsx';
import { TextField } from '@material-ui/core';
import { setEditor } from '../../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

export const Editor = ({
  handleInputChange,
  handleEditorChange,
  task,
}) => {
  const dispatch = useDispatch(); 
  const { type } = useSelector(state => state.editor);

  return (
    <div className={styles.notes}>
      <div className={styles.subNavEditor}>
        <div
          className={clsx(styles.link, {[styles.active]: type === EDITOR_TYPES.SLATE})}
          onClick={() => dispatch(setEditor({type: EDITOR_TYPES.SLATE}))}
        >
          Slate
        </div>

        <div
          className={clsx(styles.link, {[styles.active]: type === EDITOR_TYPES.REGULAR})}
          onClick={() => dispatch(setEditor({type: EDITOR_TYPES.REGULAR}))}
        >
          Regular
        </div>
      </div>

      {type === EDITOR_TYPES.REGULAR ? 

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="note"
          label="What can you improve on?"
          name="note"
          onChange={handleInputChange}
          value={task.note}
          multiline={true}
          rows={10}
          className={styles.note}
        />

        :

        <SlateEditor
          handleInputChange={handleEditorChange}
          value={task.text}
        />
      }
    </div>
    
  )
}

export default Editor;