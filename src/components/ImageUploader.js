import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import styles from './ImageUploader.module.scss';
import clsx from 'clsx';
import { ImageItem } from './ImageItem';
import { convertToBase64 } from '../utils';

export const ImageUploader = ({
  setTask,
  task
}) => {
  const [images, setImages] = useState(task.images);

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];

    setImages(prevState => [...images, file]);

    let base64Image = await convertToBase64(file);
    setTask(prevState => {
      let newImageArray = [...prevState['images'], base64Image];
      prevState['images'] = newImageArray;
      return prevState;
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive
  } = useDropzone({onDrop})

  return (
    <div className={styles.container}>
      <div className={clsx(styles.dropZone, {[styles.active]: isDragActive})}>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <div className={styles.dropText}>Add file</div>
        </div>
      </div>
      
      <div className={styles.images}>
        {
          images.map((image) => {
            return (
              <ImageItem image={image} />
            )
          })
        }
      </div>
    </div>
  )
}

export default ImageUploader;
