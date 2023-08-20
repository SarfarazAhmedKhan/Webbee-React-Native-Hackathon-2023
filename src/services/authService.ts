import api from '../axiosInterceptor/api';

export const login = (credentials: {username: string; password: string}) => {
  return api.post('/login', credentials);
};

export const logout = () => {
  return api.post('/logout');
};
