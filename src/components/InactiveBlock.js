import React from 'react';
import styles from './InactiveBlock.module.scss';
import {useDispatch} from 'react-redux';
import clsx from 'clsx';
import {
  toggleModal,
  setBlock,
} from '../redux/actions';

export const InactiveBlock = ({
  isDisabled,
  date,
  timeBlock
})  => {
  const dispatch = useDispatch();
  
  const handleClick = (evt) => {
    evt.stopPropagation();

    dispatch(toggleModal({
      isOpen: true,
    }));

    dispatch(setBlock({
      date,
      timeBlockId: timeBlock.id,
    }))
  }


  return (
    <div 
      className={clsx(
        styles.container,
        {[styles.disabled]: isDisabled}
      )}
      onClick={(evt) => handleClick(evt)}
    >
    </div>
  )
}