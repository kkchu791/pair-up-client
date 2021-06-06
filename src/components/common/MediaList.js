import React from 'react';
import styles from './MediaList.module.scss';
import { MEDIA_TYPES } from '../../constants';
import { ImageItem } from '../desktop/ImageItem';
import { AudioItem } from './AudioItem';
import { VideoItem } from './VideoItem';

export const MediaList = ({
  mediums
}) => {
  const renderMedia = (media) => {
    if (MEDIA_TYPES.IMAGE.includes(media.type)) {
      return <ImageItem image={media} />
    } else if (MEDIA_TYPES.AUDIO.includes(media.type)) {
      return <AudioItem audio={media} />
    } else if (MEDIA_TYPES.VIDEO.includes(media.type)) {
      return <VideoItem video={media} />
    }
  }

  return (
    <div className={styles.container}>
      {mediums.map(renderMedia)}
    </div>
  )
}

export default MediaList;