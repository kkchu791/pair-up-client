import React, {useState} from 'react';
import styles from './ActionsPanel.module.scss';
import {Events} from './Events';
import {ActionBlocks} from './ActionBlocks';
import {Goals} from './Goals';
import clsx from 'clsx';
import { Slide } from '@material-ui/core';
import { useSelector } from 'react-redux';

export const ActionsPanel = () => {
  const drawerIsOpen = useSelector(state => state.drawer.isOpen);

  const VIEWS = {
    ACTIONS: 0,
    ACTION_BLOCKS: 1,
    GOALS: 2
  }
  const [currentView, setCurrentView] = useState(VIEWS.ACTIONS);

  const ACTION_PANEL_COMPONENTS = {
    0: <Events />,
    1: <ActionBlocks />,
    2: <Goals />
  };

  const handleClick = (view) => {
    setCurrentView(view);
  }

  const isActive = (view) => {
    return currentView === view;
  }

  return (
    <Slide
      direction='left'
      in={drawerIsOpen}
      mountOnEnter
      unmountOnExit
    >
      <div className={styles.container}>
        <div className={styles.subNav}>
          <div className={clsx(styles.navLink, {[styles.active]: isActive(VIEWS.ACTIONS)})} onClick={() => handleClick(VIEWS.ACTIONS)}>
            Notes
          </div>


          <div className={clsx(styles.navLink, {[styles.active]: isActive(VIEWS.ACTION_BLOCKS)})} onClick={() => handleClick(VIEWS.ACTION_BLOCKS)}>
            Action Blocks
          </div>

          <div className={clsx(styles.navLink, {[styles.active]: isActive(VIEWS.GOALS)})} onClick={() => handleClick(VIEWS.GOALS)}>
            Goals
          </div>
        </div>

        <div className={styles.actionContainer}>
          {ACTION_PANEL_COMPONENTS[currentView]}
        </div>
      </div>
    </Slide>
  )
}

export default ActionsPanel;
