// src/api.ts
import axios from 'axios';
import { path } from './path';
const api = axios.create({
  baseURL: path,
  timeout: 10000, 
});

export default api;
