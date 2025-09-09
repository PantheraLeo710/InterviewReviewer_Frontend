import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../services/apiClient';

const FeedbackForm = () => {
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState([]);
  const [result, setresult] = useState('select result')

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/users/applicants", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setApplicants(res.data.applicants);
      } catch (err) {
        console.error("Error fetching applicants:", err);
      }
    };
    fetchApplicants();
  }, []);
  console.log('applicants', applicants);
  const formik = useFormik({
    initialValues: {
      applicantId: '',
      interviewerName: '',
      feedbackText: '',
      result: '',
    },
    validationSchema: Yup.object({
      applicantId: Yup.string().required('Applicant is required'),
      interviewerName: Yup.string().required('Interviewer name is required'),
      feedbackText: Yup.string().required('Feedback is required'),
      result: Yup.string().oneOf(['pass', 'fail'], 'Invalid result').required('Result is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token || token === 'undefined') {
          toast.info('Please login to submit feedback');
          navigate('/login');
          return;
        }
        await api.post('/feedback/submit', values, {
          headers: { Authorization: `Bearer ${token}` },
        });

        toast.success('Feedback submitted!');
        resetForm();
        navigate('/staff-dashboard');
      } catch (err) {
        console.error('Error submitting feedback:', err);
        toast.error('Failed to submit feedback');
      }
    },
  });
  const handleGetValue = (selectedId) => {
    console.log(selectedId, 'selectedId');
    const applicantResult = applicants.find((ele) => ele._id === selectedId)
    console.log("applicantResult", applicantResult);
    setresult(applicantResult.result)
  }
  const uniqueApplicants = applicants.filter(
  (app, index, self) =>
    index === self.findIndex((a) => a._id === app._id)
);


  return (
    <div className="container mt-5">
      <h2>Submit Feedback</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Applicant</label>
          <select
            name="applicantId"
            className={`form-select ${formik.touched.applicantId && formik.errors.applicantId ? 'is-invalid' : ''}`}
            onChange={(e) => {
              formik.handleChange(e);
              handleGetValue(e.target.value);
            }}
            onBlur={formik.handleBlur}
            value={formik.values.applicantId}
          >
            <option value="">Select an applicant</option>
            {uniqueApplicants && uniqueApplicants.length > 0 ? (
              uniqueApplicants.map((app) => (
                <option key={app._id} value={app._id}>
                  {app.name} ({app.email})
                </option>
              ))
            ) : (
              <option value="">No applicants available</option>
            )}
          </select>
          {formik.touched.applicantId && formik.errors.applicantId && (
            <div className="invalid-feedback">{formik.errors.applicantId}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Interviewer Name</label>
          <input
            type="text"
            name="interviewerName"
            className={`form-control ${formik.touched.interviewerName && formik.errors.interviewerName ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.interviewerName}
          />
          {formik.touched.interviewerName && formik.errors.interviewerName && (
            <div className="invalid-feedback">{formik.errors.interviewerName}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Feedback</label>
          <textarea
            name="feedbackText"
            className={`form-control ${formik.touched.feedbackText && formik.errors.feedbackText ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.feedbackText}
          />
          {formik.touched.feedbackText && formik.errors.feedbackText && (
            <div className="invalid-feedback">{formik.errors.feedbackText}</div>
          )}
        </div>
        <div className="mb-3">
          <label>Result</label>
          <select
            name="result"
            className={`form-select ${formik.touched.result && formik.errors.result ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.result}
          >
            <option value="">{result}</option>
            <option value="pass">Pass</option>
            <option value="fail">Fail</option>
          </select>
          {formik.touched.result && formik.errors.result && (
            <div className="invalid-feedback">{formik.errors.result}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};
export default FeedbackForm;
