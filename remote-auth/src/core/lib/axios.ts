import Axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { VITE_BASE_API_URL } from '../config';
import storage from './authStorage';

const publicEndpoint = ['/api/login', '/session/createClientSession'];

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = storage.getAccessTokenClient();

  if (accessToken) {
    const user: UserInfo = jwtDecode(accessToken);
    config.headers['x-user-id'] = user?.id;
    config.headers['access-token'] = `${accessToken}`;
  }

  config.headers.Accept = 'application/json';

  return config;
}

export const axios = Axios.create({
  baseURL: VITE_BASE_API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  response => response,
  async error => {
    const originalConfig = error.config;
    const refreshToken = storage.getRefreshTokenClient();

    if (!publicEndpoint.includes(originalConfig.url)) {
      // if (!refreshToken) {
      //   window.location.href = '/login';
      // }
      if (error.response.data.statusCode === 401 && refreshToken) {
        try {
          const res = await axios.post('/session/refreshSession', {
            token: refreshToken,
          });
          const { accessToken } = res.data;
          storage.setAccessTokenClient(accessToken);
          originalConfig.headers['access-token'] = `${accessToken}`;
          return axios(originalConfig);
        } catch (error) {
          window.location.href = '/login';
        }
      }
      if (error.response.data.statusCode === 403) {
        storage.clearTokensClient();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);
