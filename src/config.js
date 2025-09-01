// src/config.js
const BASE_URL =  'https://interviewreviewer-backend.onrender.com/api/v1';

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
  FEEDBACK: `http://localhost:5000/feedback/viewfeedback`,
  SUBMISSIONS: `http://localhost:5000/submit/viewsubmit`,
};
export default { BASE_URL };
