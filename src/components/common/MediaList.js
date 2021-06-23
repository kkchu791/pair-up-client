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
      return <div key={media.url}><ImageItem image={media} /></div>
    } else if (MEDIA_TYPES.AUDIO.includes(media.type)) {
      return  <div key={media.url}><AudioItem audio={media} /></div>
    } else if (MEDIA_TYPES.VIDEO.includes(media.type)) {
      return  <div key={media.url}><VideoItem video={media} /></div>
    }
  }

  return (
    <div className={styles.container}>
      {mediums.map(renderMedia)}
    </div>
  )
}

export default MediaList;