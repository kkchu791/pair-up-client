import React, { useState, useEffect } from 'react';
import { WaitingBlockCreator } from './WaitingBlockCreator';
import { InactiveBlock } from './InactiveBlock';
import styles from './SlotBlock.module.scss';
import { useAuthState } from '../context';
import clsx from 'clsx';
import {isStartOfHour} from '../utils';

export const SlotBlock = ({
  timeBlock,
  date,
  blocks=[],
}) => {
  const {userDetails} = useAuthState();
  const [block, setBlock] = useState({});

  useEffect(() => {
    setBlock(blocks.find(bl => bl.time_block_id === timeBlock.id));
  }, [blocks]);

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
        <WaitingBlockCreator
          timeBlock={timeBlock}
          date={date}
          userDetails={userDetails}
          block={block}
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
// import { blockStatuses } from '../constants/blocks';
// import { useAuthState } from '../context';
// import clsx from 'clsx';
// import {isStartOfHour} from '../utils';


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