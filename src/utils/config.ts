import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://morocco-nig.fly.dev',
  headers: {
    Accept: 'application/json',
  },
});
