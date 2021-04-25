import React, {useState} from 'react';
import styles from './ColorPicker.module.scss';
import { HexColorPicker } from 'react-colorful';
import { Button } from '@material-ui/core';

export const ColorPicker = ({
  color,
  onChange,
}) => {
  const [isPicking, setIsPicking] = useState(false);

  const handleClick = () => {
    setIsPicking(true);
  }

  const doneClick = () => {
    setIsPicking(false);
  }

  return (
    <div className={styles.container}>
      {isPicking &&
        <div className={styles.pickerContainer}>
          <HexColorPicker
            color={color}
            onChange={(val) => onChange({'color': val})}
            className={styles.picker}
          />
          <Button
            onClick={doneClick}
            className={styles.doneButton}
            variant='contained'
            color='primary'
          >
            Done
          </Button>
        </div>
      }

      <div
        className={styles.display}
        style={{background: color}}
        onClick={handleClick}
      >  
      </div>
    </div>
  )
}

export default ColorPicker;
