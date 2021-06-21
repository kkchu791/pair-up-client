import React from 'react';
import styles from './QuickSchedContainer.module.scss';
import { QuickSchedButton } from './QuickSchedButton';
import { QuickSchedBlock } from './QuickSchedBlock';
import { useSelector} from 'react-redux' 

export const QuickSchedContainer = () => {
  const { activeBlock } = useSelector(state => state.blocks);

  return (
    <div className={styles.container}>
      {Object.keys(activeBlock).length > 4 ?
        <QuickSchedBlock /> 
        :
        <QuickSchedButton />
      }
    </div>
  );
};

export default QuickSchedContainer;