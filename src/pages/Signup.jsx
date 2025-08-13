import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API } from '../config';
import jwt_decode from 'jwt-decode';

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Min 6 characters').required('Password is required')
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post(API.AUTH.SIGNUP, values);
      const { token } = res.data;
      localStorage.setItem('token', token);

      const decoded = jwt_decode(token);
      toast.success('Signup successful!');

      if (decoded.isStaff) {
        navigate('/staff-dashboard');
      } else {
        navigate('/'); // home page instead of login/questions
      }
    } catch (err) {
      console.error(err);
      const errorMsg = err.response?.data?.message || 'Signup failed';
      toast.error(errorMsg); // no forced form field error unless specific
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f1f3f5' }}
    >
      <div className="col-md-6 col-lg-5">
        <div className="card border-0 shadow rounded-4" style={{ backgroundColor: '#ffffff' }}>
          <div className="card-body p-5">
            <h2 className="text-center mb-4 fw-bold" style={{ color: '#1b262c' }}>
              Create Your Account
            </h2>
            <p className="text-center text-muted mb-4">
              Sign up to access your dashboard and begin your journey
            </p>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <Field
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger small mt-1" />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="Create a password"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger small mt-1" />
                  </div>

                  <button
                    type="submit"
                    className="btn w-100 py-2 fw-semibold"
                    style={{
                      backgroundColor: '#1b262c',
                      color: '#ffffff',
                      borderRadius: '8px',
                      transition: 'background-color 0.3s ease'
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Signing up...' : 'Signup'}
                  </button>
                </Form>
              )}
            </Formik>

            <p className="text-center mt-4 text-muted">
              Already have an account?{' '}
              <Link to="/login" className="text-decoration-none" style={{ color: '#3282b8' }}>
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
