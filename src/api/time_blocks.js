import axios from 'axios';

export const getTimeBlocks = async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/timeBlocks`);
    return {success: true, data: response.data};
  } catch (e) {
    return {success: false, error: e.message};
  }
};