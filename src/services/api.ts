import axios from 'axios';

const api = axios.create({
  baseURL: 'http://13.82.140.89:8080/',
});

export default api;
