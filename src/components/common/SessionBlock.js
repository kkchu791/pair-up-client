import React from 'react';
import styles from './SessionBlock.module.scss';

export const SessionBlock = ({
  block
}) => {


  return (
    <div
      className={styles.container}
      style={{border: `3px solid ${block.color}`}}
    >
      <div className={styles.imageContainer}>
        {block.images && 
          block.images.map(image => {
          return (
            <div
              className={styles.imageContainer}
              key={image.url}
            >
              <img
                className={styles.image}
                src={image.url}
                alt={image.name}
              />
            </div>
          )
        })}
      </div>

      <div className={styles.blockInfoContainer}>
        <div className={styles.name}>
          {block.task}
        </div>

        <div className={styles.note}>
          {block.note}
        </div>
      </div>
    </div>
  )
}

export default SessionBlock;