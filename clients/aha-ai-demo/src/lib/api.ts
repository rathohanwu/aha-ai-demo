import axios from 'axios';
import cookies from 'js-cookie';

const api = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:3020',
});

api.interceptors.request.use(config => {
  const token = cookies.get('JWT_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {api};
