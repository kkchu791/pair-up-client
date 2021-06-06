import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styles from './MediaUploader.module.scss';
import clsx from 'clsx';
import { convertToBase64 } from '../../utils';
import { MediaList } from './MediaList';

export const MediaUploader = ({
  setTask,
  task
}) => {
  const [mediums, setMediums] = useState(task.images || []);
  const maxSize = 27000000;

  const processMedia = useCallback(async (file) => {
    setMediums(prevState => [...prevState, file]);
    let base64Media = await convertToBase64(file);
    
    setTask(prevState => {
      const newMediums = [...prevState['images'], base64Media];
      prevState['images'] = newMediums;
      return prevState;
    });
  }, [setTask]);

  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      processMedia(file);
    });
  }, [processMedia]);

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({
    onDrop,
    accept: 'image/*,audio/*,video/*',
    maxSize,
  })

  return (
    <div className={styles.container}>
      <div className={clsx(styles.dropZone, {[styles.active]: isDragActive})}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={styles.dropTextContainer}>
            <div className={styles.dropText}>Add Media File</div>
            <div className={styles.acceptedTypes}>
              (image/png, image/jpeg, audio/mpeg, video/mp4)
            </div>
          </div>
        </div>
      </div>

      <MediaList
        mediums={mediums}
      />
    </div>
  )
}

export default MediaUploader;
