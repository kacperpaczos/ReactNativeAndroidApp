import axios from 'axios';
import { ApiError } from '@/types/api';

const API_BASE_URL = 'https://api.coinpaprika.com/v1';
const DEFAULT_TIMEOUT = 5000;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: DEFAULT_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: 'Wystąpił błąd podczas komunikacji z serwerem',
      status: error.response?.status
    };

    if (error.response) {
      apiError.message = error.response.data.message || apiError.message;
    } else if (error.request) {
      apiError.message = 'Brak odpowiedzi z serwera';
    }

    return Promise.reject(apiError);
  }
);