import React from 'react';
import styles from './AudioItem.module.scss';

export const AudioItem = ({
  audio
}) => {
  const audioUrl = audio['url'] ? audio['url'] : URL.createObjectURL(audio);

  return (
    <div
      className={styles.container}
      key={audioUrl}
    >
      <audio 
        src={audioUrl}
        controls
        type="audio/mpeg"
        className={styles.thumbnail}
      />
    </div>
  )
}

export default AudioItem;
