import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import {Fade} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
    padding: '20px',
    marginBottom: '10px',
    outline: 'none',
  },
}));


export const TaskModal = ({
  onClose,
  open,
  children
}) => {
  const classes = useStyles();
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{timeout: 500}}
    >
        <Fade
          in={open}
          disableStrictModeCompat={true}
        >
          <div className={classes.paper}>
            {children}
          </div>
        </Fade>
    </Modal>
  );
}

export default TaskModal;