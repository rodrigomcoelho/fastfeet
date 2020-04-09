import axios from 'axios';

const api = axios.create({ baseURL: process.env.REACT_APP_API_URL });

export const { CancelToken, isCancel } = axios;

export default api;
