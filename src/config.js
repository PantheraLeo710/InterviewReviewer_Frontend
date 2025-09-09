const BASE_URL = import.meta.env.VITE_API_URL;
export const API = {
  AUTH: {
    SIGNUP: `${BASE_URL}/auth/signup`,
    LOGIN: `${BASE_URL}/auth/login`,
  },
  QUESTIONS: `/questions`,
  MYSUBMISSIONS: `/answers/submissions`,
  APPLICANTS: '/users/applicants',
  FEEDBACK: '/feedback/viewfeedback',
  SUBMISSIONS: '/submit/viewsubmit'
};
export default API;
