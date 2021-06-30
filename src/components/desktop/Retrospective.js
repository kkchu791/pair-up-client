import React from 'react';
import styles from './Retrospective.module.scss';
import { useSelector } from 'react-redux';
import { Events } from './Events';
import { MediaList } from '../common';
import { format } from 'date-fns';
import {
  convertTimeTo24,
  serialize,
} from '../../utils';

export const Retrospective = () => {
  const {blocks, date} = useSelector(state => state.modal);

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
          <div className={styles.content}>
            {block.note}
          </div>
        </pre>

        <pre>
          <div className={styles.content}>
            {block.text && serialize(JSON.parse(block.text))}
          </div>
        </pre>

        <div className={styles.images}>
          <MediaList
            mediums={block.images || []}
          />
        </div>
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