// src/config.js
const BASE_URL = import.meta.env.VITE_API_URL || 'https://interviewreviewer-backend.onrender.com/api/v1';

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
  FEEDBACK: `${BASE_URL}/feedback/viewfeedback`,
  SUBMISSIONS: `${BASE_URL}/submit/viewsubmit`,
};
export default { BASE_URL };
