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
      <video width="750" height="500" controls >
        <source
          src={videoUrl}
          type="video/mp4"
        />
      </video>
    </div>
  )
}

export default VideoItem;
