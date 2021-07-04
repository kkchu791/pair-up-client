import React from 'react';
import { GoalBlockCount } from './GoalBlockCount';
import styles from './Summary.module.scss';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/actions';

// import Speech from 'react-speech';
// import May16Audio from '../../audio/May16.m4a';
// import ReactAudioPlayer from 'react-audio-player';

export const Summary = ({
  isDesktop=true
}) => {
  const dispatch = useDispatch();
  let { blocksByDate } = useSelector(state => state);
  const {currentDateStr} = useSelector(state => state.date);
  
  const blocks = Object.keys(blocksByDate).reduce((acc, date) => {
    return [...acc, ...blocksByDate[date]];
  }, []);

  const handleRetroClick = () => {
    dispatch(toggleModal({
      isOpen: true,
      blocks,
      date: currentDateStr,
    }));
  }

  return (
    <div className={styles.container}>
      <div className={styles.totalBlocksCount}>
        <div className={styles.total}>
          {`${blocks.length} Blocks` || '0 Blocks'}
        </div>

        {isDesktop &&
          <Button
            variant='contained'
            color='primary'
            className={styles.retro}
            onClick={handleRetroClick}
          >
            Retro
          </Button>   
        }  
      </div>

      <div
        className={styles.audio}
      >
        
      </div>

      <GoalBlockCount
        blocks={blocks}
      />
    </div>
  )
}

export default Summary;