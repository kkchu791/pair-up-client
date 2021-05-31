import React, {useState} from 'react';
import styles from './CancellingButtons.module.scss';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckIcon from '@material-ui/icons/Check';
import { IconButton } from '@material-ui/core';

export const CancellingButtons = ({
  confirmingCancelClick,
}) => {
  const [isCanceling, setIsCanceling] = useState(false);

  const cancelClick = async (evt) => {
    evt.stopPropagation();
    setIsCanceling(true);
  }

  const cancelCancelClick = (evt) => {
    evt.stopPropagation();
    setIsCanceling(false);
  }

  const confirmCancelClick = (evt) => {
    evt.stopPropagation();
    confirmingCancelClick();
    setIsCanceling(false);
  }
  
  return (
    <div className={styles.container}>
      {isCanceling ?
        <div className={styles.cancelConfirm}>
          <div className={styles.confirmText}>Are you sure?</div>
          <div className={styles.cancel}>
            <IconButton
              size={'small'}
              onClick={(evt) => cancelCancelClick(evt)}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </div>
          <div className={styles.confirm}>
            <IconButton
              size={'small'}
              onClick={(evt) => confirmCancelClick(evt)}
            >
              <CheckIcon />
            </IconButton>
          </div>
        </div>
        :
        <IconButton
          size={'small'}
          onClick={(evt) => cancelClick(evt)}
        >
          <CloseOutlinedIcon />
        </IconButton>
      }
    </div>
  )
}

export default CancellingButtons;