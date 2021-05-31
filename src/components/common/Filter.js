import React, { useState } from 'react';
import styles from './Filter.module.scss';
import {Button, ButtonGroup} from '@material-ui/core';
import { FILTERS } from '../../constants';
import clsx from 'clsx';

export const Filter = ({
  onFilterClick,
}) => {
  const [isActive, setIsActive] = useState(FILTERS.day);

  const onButtonClick = (filter) => {
    onFilterClick(filter)
    setIsActive(FILTERS[filter]);
  }

  const renderButtons = (filter) => {
    return (
      <Button
        className={clsx(
          styles.button,
          {[styles.active]: isActive === FILTERS[filter]}
        )}
        onClick={() => onButtonClick(filter)}
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