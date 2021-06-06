import React from 'react';
import styles from './ImageItem.module.scss';

export const ImageItem = ({
  image
}) => {
  const imageUrl = image['url'] ? image['url'] : URL.createObjectURL(image);

  const itemClick = (evt) => {
    window.open(imageUrl);
  }

  return (
    <div
      key={imageUrl}
      className={styles.container}
      onClick={itemClick}
    >
      <div className={styles.thumbnail}>
        <img
          className={styles.thumbnail}
          src={imageUrl}
          alt='image-item-thumbnail'
        />
      </div>
    </div>
  )
}

export default ImageItem;
