// src/pages/Login.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../services/apiClient";

const Login = () => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await api.post("/auth/login", values);
      const token = data?.token;
      const user = data?.user;
      if (token) localStorage.setItem("token", token);
      toast.success("Login successful!");
      if (user?.isStaff) navigate("/staff-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Login Error:", err);
      toast.error(err?.response?.data?.message || "Invalid credentials");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Login</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="border p-4 rounded bg-light shadow">
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <Field name="email" type="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger small" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <Field name="password" type="password" className="form-control" />
                  <ErrorMessage name="password" component="div" className="text-danger small" />
                </div>
                <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-3">
            Don't have an account? <Link to="/signup">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
