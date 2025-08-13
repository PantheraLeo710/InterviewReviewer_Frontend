import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API } from '../config';
import { toast } from 'react-toastify';

const FeedbackForm = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      applicantId: '',
      interviewerName: '',
      feedbackText: '',
      result: 'pass',
    },
    validationSchema: Yup.object({
      applicantId: Yup.string().required('Applicant ID is required'),
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

        await axios.post(API.FEEDBACK, values, {
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

  return (
    <div className="container mt-5">
      <h2>Submit Feedback</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Applicant ID</label>
          <input
            type="text"
            name="applicantId"
            className={`form-control ${formik.touched.applicantId && formik.errors.applicantId ? 'is-invalid' : ''}`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.applicantId}
          />
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
