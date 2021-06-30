import React from 'react';
import styles from './SessionList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PastBlock } from './PastBlock';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import { IconButton } from '@material-ui/core';
import {
  toggleModal,
  setBlock,
  setGoal,
} from '../../redux/actions';
import { format, parseISO } from 'date-fns';

export const SessionList = () => {
  const dispatch = useDispatch();
  const {blocksByDate} = useSelector(state => state);

  const handleNoteClick = (date) => {
    const blocks = blocksByDate[date];
  
    dispatch(toggleModal({
      isOpen: true,
      blocks,
      date,
    }));

    dispatch(setBlock({}));

    dispatch(setGoal({
      id: blocks[0].goal_id,
      name: blocks[0].goal_name,
      note: blocks[0].goal_note,
    }));
  }

  return (
    <div className={styles.container}>
      {
        Object.keys(blocksByDate).map((date)=> {
          return (
            <div
              key={date}
              className={styles.dayColumn}
            >
              <div className={styles.header}>
                <div className={styles.date}>
                  { format(parseISO(date), 'E MM/dd') }
                </div>

                <div className={styles.noteIcon}>
                  <IconButton color='primary'>
                    <NoteOutlinedIcon onClick={() => handleNoteClick(date)} />
                  </IconButton>
                </div>
              </div>
              {blocksByDate[date].map(block => {
                return (
                  <div key={block.id} className={styles.blockContainer}>
                    <PastBlock
                      block={block}
                    />
                  </div>
                )
              })}
            </div>
          )
        })
      }
    </div>
  )
}

export default SessionList;