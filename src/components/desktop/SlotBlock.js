import React, { useState, useEffect } from 'react';
import { InactiveBlock } from './InactiveBlock';
import styles from './SlotBlock.module.scss';
import clsx from 'clsx';
import {isStartOfHour} from '../../utils';
import { useSelector, useDispatch } from 'react-redux';
import { Block } from '../common/Block';
import {
  updateBlock,
  setGoal,
} from '../../redux/actions';

export const SlotBlock = ({
  date,
  timeBlock,
}) => {
  const blocks = useSelector(state => state.blocksByDate[date] || []);
  const [block, setBlock] = useState(null);
  const dispatch = useDispatch();  

  useEffect(() => {
    setBlock(blocks.find(bl => bl.time_block_id === timeBlock.id));
  }, [blocks]);

  const handleScheduleSuccess = () => {
    dispatch(setGoal({
      id: block.goal_id,
      name: block.goal_name,
    }));
  }

  const onScheduleClick = () => {
    // it needs to update to block to have null timeID
    dispatch(updateBlock({
      id: block.id,
      time_block_id: null,
      date,
      onSuccess: () => handleScheduleSuccess(),
      onError: () => console.log('error update block')
    }))
  }

  return (
    <div
      className={clsx(
        styles.container,
        {[styles.hourStart]: isStartOfHour(timeBlock.start_time)},
        {[styles.minuteGrid]: !isStartOfHour(timeBlock.start_time)}
      )}
      key={timeBlock.id}
    >
      <InactiveBlock
        isDisabled={new Date(date + ' ' + timeBlock.start_time) < new Date()}
        date={date}
        timeBlock={timeBlock}
      />
      {block && 
        <Block
          block={block}
          onScheduleClick={onScheduleClick}
        />
      }
    </div>
  )
}

export default SlotBlock;

// import React, { useState, useEffect } from 'react';
// import { PendingBlock } from './PendingBlock';
// import { ActiveBlock } from './ActiveBlock';
// import { WaitingBlockCreator } from './WaitingBlockCreator';
// import { WaitingBlockJoiner } from './WaitingBlockJoiner';
// import { InactiveBlock } from './InactiveBlock';
// import styles from './SlotBlock.module.scss';
// import { blockStatuses } from '../../constants/blocks';
// import { useAuthState } from '../../context';
// import clsx from 'clsx';
// import {isStartOfHour} from '../../utils';


// export const SlotBlock = ({
//   timeBlock,
//   date,
//   blocks=[],
// }) => {
//   const {userDetails} = useAuthState();


//   useEffect(() => {
//     const selectedBlock = blocks.find(sBlock => {
//       return sBlock.time_block_id === timeBlock.id;
//     })

//     if (selectedBlock) {
//       setStatus(blockStatuses[selectedBlock.status]);
//     }

//     setBlock(selectedBlock);

//   }, [blocks, timeBlock.id]);

//   const BLOCKS = {
//     'inactive': null,
//     'pending': <PendingBlock
//                 setStatus={setStatus}
                
//                 timeBlock={timeBlock}
//                 date={date}
//                 setBlock={setBlock}
//               />,
//     'waiting': isCreator ? <WaitingBlockCreator
//                               setStatus={setStatus}
//                               timeBlock={timeBlock}
//                               block={block}
//                               date={date}
//                               setBlock={setBlock}
//                               userDetails={userDetails}
//                             /> :
//                             <WaitingBlockJoiner
//                               setStatus={setStatus}
//                               timeBlock={timeBlock}
//                               block={block}
//                               date={date}
//                               setBlock={setBlock}
//                               userDetails={userDetails}
//                             /> ,
//     'active': <ActiveBlock
//                 setStatus={setStatus}
//                 timeBlock={timeBlock}
//                 block={block}
//                 date={date}
//                 userDetails={userDetails}
//                 setBlock={setBlock}
//                 isDisabled={new Date(date + ' ' + timeBlock.end_time) < new Date()}
//               />,
//   }

//   return (
//     <div
//       className={clsx(
//         styles.container,
//         {[styles.hourStart]: isStartOfHour(timeBlock.start_time)},
//         {[styles.minuteGrid]: !isStartOfHour(timeBlock.start_time)}
//       )}
//       key={timeBlock.id}
//     >
//       <InactiveBlock
//         setStatus={setStatus}
//         status={status}
//         isDisabled={new Date(date + ' ' + timeBlock.start_time) < new Date()}
//         date={date}
//         timeBlock={timeBlock}
//       />
//       {BLOCKS[status]}
//     </div>
//   )
// }

// export default SlotBlock;