import axios from 'axios';

export const getGoals = async ({userId}) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/goals`, {params: { user_id: userId }});
  return {goals: response.data};
};

export const getGoal = async ({id}) => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/goals/${id}`);
  return {goal: response.data};
};

export const updateGoal = async ({
  note,
  id,
}) => {
  const goalData = {note}
  const response = await axios.put(`${process.env.REACT_APP_API_URL}/goals/${id}`, goalData);
  return {data: response.data};
};