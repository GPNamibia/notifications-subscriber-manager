import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
import CustomLoginPage from './Login/Login';

export default (type, params) => {
  if (type === AUTH_LOGIN) {
    return Promise.resolve({ loginPage: <CustomLoginPage /> });
  }

  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    // Check if the user is authenticated
    const token = localStorage.getItem('token');
    return token ? Promise.resolve() : Promise.reject();
  }

  return Promise.reject('Unknown method');
};
