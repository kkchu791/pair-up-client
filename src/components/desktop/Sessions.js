import React, { useEffect } from 'react';
import styles from './Sessions.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {PastBlock} from './PastBlock';
import {
  getBlocksByDate,
  toggleModal,
  setBlock,
  setGoal,
} from '../../redux/actions';
import NoteOutlinedIcon from '@material-ui/icons/NoteOutlined';
import { IconButton } from '@material-ui/core';
import { TaskModal } from './TaskModal';
import { Retrospective } from './Retrospective';
import { useAuthState } from '../../context';

export const Sessions = () => {
  const blocksByDate = useSelector(state => state.blocksByDate);
  const {currentDate} = useSelector(state => state.date);
  const { isOpen } = useSelector(state => state.modal);
  const dispatch = useDispatch();
  const { userDetails } = useAuthState();

  useEffect(() => {
    let start = new Date(currentDate)
    start.setDate(start.getDate() - 6);
    const end = currentDate;
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [getBlocksByDate]);

  const handleNoteClick = (date) => {
    const blocks = blocksByDate[date];
    dispatch(toggleModal({
      isOpen: true,
      date,
    }));

    dispatch(setBlock(null));

    dispatch(setGoal({
      id: blocks[0].goal_id,
      name: blocks[0].goal_name,
      note: blocks[0].goal_note,
    }));
  }

  const closeModal = () => {
    dispatch(toggleModal({isOpen: false}));
  }

  return (
    <div className={styles.container}>
      <TaskModal
        onClose={closeModal}
        open={isOpen}
      >
        <Retrospective />
      </TaskModal>
      {
        Object.keys(blocksByDate).map((date)=> {
          return (
            <div
              key={date}
              className={styles.dayColumn}
            >
              <div className={styles.header}>

                <div className={styles.date}>
                  {new Date(date + ' 00:00:00').toLocaleDateString('en-US', { weekday: 'short' })}&nbsp;
                  {new Date(date).getMonth()}/{new Date(date).getDate()}
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

export default Sessions;
