import React, {useEffect} from 'react';
import styles from './QuickSched.module.scss';
import { ActionsPanel } from './ActionsPanel';
import { useSelector, useDispatch } from 'react-redux';
import {
  getActiveBlock,
  toggleModal,
  getTimeBlocks,
  getBlocksByDate,
  playAudio, 
  setGoal,
  setTimer,
 } from '../../redux/actions';
import { TaskModal } from './TaskModal';
import { TaskForm } from './TaskForm';
import { Timer } from '../common';
import { useAuthState } from '../../context';
import {
  startOfWeek,
  endOfWeek
} from 'date-fns';
import { DrawerToggle } from './DrawerToggle';
import { QuickSchedContainer } from './QuickSchedContainer';
import lets_go from '../../audio/lets_go.wav';
import ReactAudioPlayer from 'react-audio-player';


export const QuickSched = () => {
  const dispatch = useDispatch();
  const {isOpen} = useSelector(state => state.modal);
  const { userDetails } = useAuthState();
  const { currentDateObj } = useSelector(state => state.date);
  const { isPlaying } = useSelector(state => state.audio);
  const { activeBlock } = useSelector(state => state.blocks);

  useEffect(() => { 
    dispatch(getActiveBlock({
      userId: userDetails.id,
      onSuccess: () => console.log(' on success fetch current'),
      onError: () => console.log('on error fetch current'),
    }))
  }, [dispatch, userDetails.id]);

  useEffect(() => {
    dispatch(getTimeBlocks({
      onSuccess: () => console.log('success timeBlock'),
      onError: () => console.log('error timeBlock')
    }));
  }, [dispatch]);

  useEffect(() => {
    const start = startOfWeek(currentDateObj, {weekStartsOn: 1});
    const end = endOfWeek(currentDateObj, {weekStartsOn: 1});

    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: (resp) => console.log('success'),
      onError: () => console.log('errored'),
    }));
  }, [currentDateObj, dispatch, userDetails.id]);

  const closeModal = () => {
    dispatch(toggleModal(false));
  }

  const handleBeginning = () => {
    dispatch(playAudio({isPlaying: true}));
    dispatch(toggleModal({isOpen: true}));
    dispatch(setGoal({ id: activeBlock.goal_id, name: activeBlock.goal_name }));
    dispatch(setTimer({status: 'start'}))
  }

  const handleEnding = () => {
    dispatch(playAudio({isPlaying: true}));
    dispatch(toggleModal({isOpen: true}));
    dispatch(setGoal({ id: activeBlock.goal_id, name: activeBlock.goal_name }));
    dispatch(setTimer({ status: 'end' }));
  }

  return (
    <div className={styles.container}>
      <TaskModal
        onClose={closeModal}
        open={isOpen}
      >
        <TaskForm />
      </TaskModal>
      {Object.keys(activeBlock).length > 4 &&
        <Timer
          isShowing={false}
          onBeginning={handleBeginning}
          onEnding={handleEnding}
        />
      }
      <QuickSchedContainer />
      <DrawerToggle />
      <ActionsPanel />

      {isPlaying && <ReactAudioPlayer
        src={lets_go}
        autoPlay
        controls={false}
      />}
    </div>
  )
}

export default QuickSched;