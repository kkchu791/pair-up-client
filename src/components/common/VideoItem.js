import React from 'react';
import styles from './VideoItem.module.scss';

export const VideoItem = ({
  video
}) => {
  const videoUrl = video['url'] ? video['url'] : URL.createObjectURL(video);

  return (
    <div
      className={styles.container}
      key={videoUrl}
    >
      <video controls  className={styles.thumbnail}>
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
    </div>
  )
}

export default VideoItem;
