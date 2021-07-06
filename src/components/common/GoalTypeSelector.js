import React from 'react';
import styles from './GoalTypeSelector.module.scss';
import Select from 'react-select';
import {
  GOAL_TYPE_NAMES,
  GOAL_TYPE_OPTIONS,
} from '../../constants'


export const GoalTypeSelector = ({
  goal,
  handleChange,
}) => {
  return (
    <div className={styles.container}>
      <Select
        options={GOAL_TYPE_OPTIONS}
        placeholder='Select Goal Type'
        name='goalType'
        onChange={({value}) => handleChange({type: value})}
        className={styles.selector}
        defaultValue={{
          label: GOAL_TYPE_NAMES[goal.type],
          value: goal.type
        } || ''}
        value={{
          label: GOAL_TYPE_NAMES[goal.type],
          value: goal.type
        } || ''}
      />
    </div>
  )
}

export default GoalTypeSelector;