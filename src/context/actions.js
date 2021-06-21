import {login} from '../api';
 
export const loginUser = async (dispatch, loginPayload) => {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let {data} = await login({
      email: loginPayload.email.toLowerCase(),
      password: loginPayload.password
    });
 
    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify({user: data.user, token: data.session}));
      return data.user;
    }
 
    dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
    return;
  } catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error.message });
  }
}
 
export const logout = async (dispatch)  => {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
};