export const getNearestTimeBlock = (timeBlocks) => {
  return timeBlocks.find(tb => {
    const d = new Date();
    const currentTime = `${d.getHours()}:${d.getMinutes()}:00`;
    const current = new Date(`1/01/2021 ${currentTime}`);
    const blockStart = new Date(`1/01/2021 ${tb.start_time}`);
    return current < blockStart;
  });
}