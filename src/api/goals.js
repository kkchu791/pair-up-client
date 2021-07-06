import axios from 'axios';

export const getGoals = async ({
  userId,
  type,
}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/goals`, {params: { user_id: userId, type }});
    return {success: true, goals: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};

export const getGoal = async ({id}) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${id}`);
    return {success: true, goal: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};

export const createGoal = async ({
  userId,
  color,
  name,
  type,
}) => {
  try {
    const goalData = {color, name, user_id: userId, type};
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/goals`, goalData);
    return {success: true, data: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};

export const updateGoal = async ({
  note,
  id,
  coachesNote,
  color,
  name,
  type
}) => {
  try {
    const goalData = {note, coaches_note: coachesNote, color, name, type};
    const response = await axios.put(`${process.env.REACT_APP_API_URL}/goals/${id}`, goalData);
    return {success: true, data: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};

export const removeGoal = async ({
  id,
}) => {
  try {
    const response = await axios.delete(`${process.env.REACT_APP_API_URL}/goals/${id}`);
    return {success: true, data: response.data};
  } catch(e) {
    return {success: false, error: e.message};
  }
};