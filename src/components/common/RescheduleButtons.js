import React, {useState} from 'react';
import styles from './RescheduleButtons.module.scss';
import { IconButton } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import CheckIcon from '@material-ui/icons/Check';

export const RescheduleButtons = ({
  isScheduled,
  confirmingRescheduleClick,
}) => {
  const [isRescheduling, setIsRescheduling] = useState(false);

  const rescheduleClick = async (evt) => {
    evt.stopPropagation();
    setIsRescheduling(true);
  }

  const cancelRescheduleClick = (evt) => {
    evt.stopPropagation();
    setIsRescheduling(false);
  }

  const confirmRescheduleClick = (evt) => {
    evt.stopPropagation();
    confirmingRescheduleClick();
  }
  
  return (
    <div className={styles.container}>
      {isRescheduling ?
        <div className={styles.rescheduleConfirm}>
          <div className={styles.confirmText}>Are you sure?</div>
          <div className={styles.reschedule}>
            <IconButton
              size={'small'}
            >
              <CloseOutlinedIcon onClick={(evt) => cancelRescheduleClick(evt)} />
            </IconButton>
          </div>
          <div className={styles.confirm}>
            <IconButton
              size={'small'}
            >
              <CheckIcon onClick={(evt) => confirmRescheduleClick(evt)} />
            </IconButton>
          </div>
        </div>
        :
        <IconButton
          size={'small'}
        >
          {isScheduled ? 
            <NavigateNextIcon onClick={(evt) => rescheduleClick(evt)} />
            :
            <NavigateBeforeIcon onClick={(evt) => rescheduleClick(evt)} />
          }
        </IconButton>
      }
    </div>
  )
}

export default RescheduleButtons;