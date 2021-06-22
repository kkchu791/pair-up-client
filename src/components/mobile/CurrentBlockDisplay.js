import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CurrentBlockDisplay.module.scss';
import { Block, Timer, BlockForm } from '../common';
import {
  toggleModal,
  playAudio, 
  setGoal,
  setTimer,
 } from '../../redux/actions';
import lets_go from '../../audio/lets_go.wav';
import ReactAudioPlayer from 'react-audio-player';

export const CurrentBlockDisplay = () => {
  const { activeBlock } = useSelector(state => state.blocks);
  const {currentGoal} = useSelector(state => state.goals);
  const {isPlaying} = useSelector(state => state.audio);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleBlockClick = () => {
    setIsEditing(true);
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
      <div className={styles.goal}>
        {activeBlock.goal_name || currentGoal.name}
      </div>

      <div className={styles.timer}>
         <Timer
          isShowing={true}
          onBeginning={handleBeginning}
          onEnding={handleEnding}
        />
      </div>

      {isPlaying && <ReactAudioPlayer
        src={lets_go}
        autoPlay
        controls={false}
      />}

      
      {isEditing ?
        <div className={styles.blockForm}>
          <BlockForm
            onClose={() => setIsEditing(false)}
          />
        </div>
        :
        <div className={styles.currentBlockContainer}>
          <Block
            block={activeBlock}
            onScheduleClick={() => console.log('scheduled for later')}
            onBoxClick={handleBlockClick}
          />
        </div>
      }
    </div>
  )
}

export default CurrentBlockDisplay;