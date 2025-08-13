// src/config.js
const isDev = process.env.NODE_ENV === 'development';
const BASE_URL = isDev
  ? 'http://localhost:5000/api/v1'
  : 'https://your-live-domain.com/api/v1';

export const API = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
  },
  QUESTIONS: `${BASE_URL}/questions`,
  ANSWERS: {
    SUBMIT: `${BASE_URL}/answers`,
    MY_ANSWERS: `${BASE_URL}/answers/mine`,
    MY_SUBMISSIONS: `${BASE_URL}/answers/submissions/mine`,
  },
  FEEDBACK: `${BASE_URL}/feedback`,
  ALL_SUBMISSIONS: `${BASE_URL}/answers/submissions/all`,
};

/*
export const API = {
  AUTH: {
    LOGIN: import.meta.env.VITE_API_URL + '/auth/login',
    SIGNUP: import.meta.env.VITE_API_URL + '/auth/signup',
  },
  QUESTIONS: import.meta.env.VITE_API_URL + '/questions',
  ANSWERS: import.meta.env.VITE_API_URL + '/answers',
  FEEDBACK: import.meta.env.VITE_API_URL + '/feedback',
  SUBMISSIONS: import.meta.env.VITE_API_URL + '/answers/submissions/all',
};
*/
