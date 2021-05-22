import axios from 'axios';

export const getBlocks = async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/blocks`);
  return {data: response.data};
};

export const getBlocksByDateRange = async ({
  startDate,
  endDate,
  userId
}) => {
  // should be passing in user id and token
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/blocks`,
      {params: { startDate, endDate, userId }}
    );

    return {success: true, data: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};

export const getUpcomingBlock = async ({userId}) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/blocks/upcoming`,
    {params: { user_id: userId }}
  );

  return {data: response.data};
};

export const createBlock = async ({
  creator_id,
  time_block_id,
  date,
  task,
  goal_id,
  note,
  type,
}) => {
  try {
    const blockData = {
      creator_id,
      time_block_id,
      date,
      task,
      goal_id,
      note,
      type,
    };
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/blocks`, blockData);

    return {success: true, data: response.data};
  } catch (e) {
    return {success: false, error: e.message};
    }
}

export const updateBlock = async ({
  id,
  creator_id,
  time_block_id,
  date,
  task,
  goal_id,
  note,
  joinerId,
  roomUrl,
  images,
}) => {
  try {
    const blockData = {
      joiner_id: joinerId,
      room_url: roomUrl,
      id,
      creator_id,
      time_block_id,
      date,
      task,
      goal_id,
      note,
      images,
    }

    const response = await axios.put(`${process.env.REACT_APP_API_URL}/blocks/${id}`, blockData);

    return {data: response.data, success: true};
  } catch (e) {
    return {error: e.message, success: false};
  }
 
}

export const removeBlock = async ({
  userId,
  blockId,
}) => {
  try {
    const response = await axios.delete(
      `${process.env.REACT_APP_API_URL}/blocks`,
      {params: {block_id: blockId, user_id: userId}}
    );

    return {data: response.data, success: true};
  } catch (e) {
    return {error: e.message, success: false};
  }
} 

export const getActionBlocks = async ({
  userId,
  goalId,
}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/blocks/action`, {params: { goalId, userId }});
    return {success: true, data: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};