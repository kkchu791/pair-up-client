import React from 'react';
import styles from './Retrospective.module.scss';
import { useSelector } from 'react-redux';
import { Events } from './Events';
import { format } from 'date-fns';
import {
  convertTimeTo24
} from '../utils';

export const Retrospective = () => {
  const {date} = useSelector(state => state.modal);
  const block = useSelector(state => state.block);
  const dayBlocks = useSelector(state => state.blocksByDate[date]);
  const blocks = block ? [block] : dayBlocks;

  const renderRetro = (block) => {
    return (
      <div
        style={{ background: block.color }}
        className={styles.retro}
      >
        <div className={styles.task}>
          {convertTimeTo24(block.start_time)} - {block.task}
        </div>

        <pre>
          <p className={styles.content}>
            {block.note}
          </p>
        </pre>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.retrospective}>

        <div className={styles.title}>
          {format(new Date(date + ' 00:00'), 'EEEE MMMM d, yyy')}
        </div>

        <div className={styles.body}>
          {blocks.map(renderRetro)}
        </div>
      </div>

      <div className={styles.events}>
        <Events />
      </div>
    </div>
  )
}

export default Retrospective;