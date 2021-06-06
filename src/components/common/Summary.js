import React from 'react';
import { GoalBlockCount } from './GoalBlockCount';
import styles from './Summary.module.scss';
import Speech from 'react-speech';
import May16Audio from '../../audio/May16.m4a';
import ReactAudioPlayer from 'react-audio-player';
export const Summary = ({
  blocks
}) => {
  const text = blocks.reduce((acc, block) => {
    acc += 'task:' + block.task;
    acc += 'improvement:' + block.note;
    return acc;
  }, '')

  return (
    <div className={styles.container}>
      <div className={styles.totalBlocksCount}>
        <div className={styles.total}>
          {`${blocks.length} Blocks` || '0 Blocks'}
        </div>        
      </div>

      <div
        className={styles.audio}
      >
        <ReactAudioPlayer
          src={May16Audio}
          autoPlay
          controls
        />
      </div>

      <GoalBlockCount
        blocks={blocks}
      />
    </div>
  )
}

export default Summary;