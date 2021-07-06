import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './CurrentBlockDisplay.module.scss';
import { Block, Timer, BlockForm } from '../common';
import {
  playAudio, 
  setTimer,
  setActiveBlock,
  updateBlock,
 } from '../../redux/actions';
import lets_go from '../../audio/lets_go.wav';
import ReactAudioPlayer from 'react-audio-player';

export const CurrentBlockDisplay = () => {
  const { activeBlock } = useSelector(state => state.blocks);
  const {isPlaying} = useSelector(state => state.audio);
  const { currentDateStr} = useSelector(state => state.date);
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleBlockClick = () => {
    setIsEditing(true);
  }

  const handleScheduleClick = (block) => {
    dispatch(updateBlock({
      id: block.id,
      time_block_id: null,
      date: currentDateStr,
      onSuccess: () => console.log('success in updating block'),
      onError: () => console.log('success in updating error'),
    }));

    dispatch(setActiveBlock({}));
  }

  const handleBeginning = () => {
    dispatch(playAudio({isPlaying: true}));
    dispatch(setTimer({status: 'start'}))
  }

  const handleEnding = () => {
    dispatch(playAudio({isPlaying: true}));
    dispatch(setActiveBlock({}));
    dispatch(setTimer({ status: 'end' }));
  }
 
  return (
    <div className={styles.container}>
      <div className={styles.goal}>
        {activeBlock.goal_name}
      </div>

      <div className={styles.timer}>
         <Timer
          isShowing={true}
          onBeginning={handleBeginning}
          onEnding={handleEnding}
        />
      </div>

      
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
            onScheduleClick={handleScheduleClick}
            onBoxClick={handleBlockClick}
          />
        </div>
      }

      {/* {isPlaying && <ReactAudioPlayer
        src={lets_go}
        autoPlay
        controls={false}
      />} */}
    </div>
  )
}

export default CurrentBlockDisplay;