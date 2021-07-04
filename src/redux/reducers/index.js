import { combineReducers } from 'redux';
import modal from './modal';
import date from './date';
import blocksByDate from './blocksByDate';
import timeBlocks from './timeBlocks';
import goals from './goals';
import blocks from './blocks';
import drawer from './drawer';
import audio from './audio';
import timer from './timer';
import filter from './filter';
import editor from './editor';
import device from './device';

export default combineReducers({
  modal: modal,
  blocksByDate: blocksByDate,
  date: date,
  timeBlocks: timeBlocks,
  goals: goals,
  blocks: blocks,
  drawer: drawer,
  audio: audio,
  timer: timer,
  filter: filter,
  editor: editor,
  device, device,
});