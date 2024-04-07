import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://morocco-nigeria.fly.dev',
  headers: {
    Accept: 'application/json',
  },
});
