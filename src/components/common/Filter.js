import React from 'react';
import styles from './Filter.module.scss';
import {Button, ButtonGroup} from '@material-ui/core';
import { FILTERS, FILTER_DATES } from '../../constants';
import clsx from 'clsx';
import {
  setFilter,
  getBlocksByDate
} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useAuthState } from '../../context';


export const Filter = () => {
  const dispatch = useDispatch();
  const { currentDateObj } = useSelector(state => state.date);
  const { range } = useSelector(state => state.filter);
  const { userDetails } = useAuthState();


  const handleFilterClick = (filter) => {
    dispatch(setFilter({range: filter}));
  
    const [start, end] = FILTER_DATES[filter](currentDateObj);
    dispatch(getBlocksByDate({
      start, 
      end,
      userId: userDetails.id,
      onSuccess: () => console.log('success'),
      onError: (e) => console.log('errored', e),
    }));
  }

  const renderButtons = (filter) => {
    return (
      <Button
        className={clsx(
          styles.button,
          {[styles.active]: range === FILTERS[filter]}
        )}
        onClick={() => handleFilterClick(filter)}
        key={filter}
      >
        {FILTERS[filter]}
      </Button>
    )
  }

  return (
    <div className={styles.container}>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        {Object.keys(FILTERS).map(renderButtons)}
      </ButtonGroup>
    </div>
  )
}

export default Filter;