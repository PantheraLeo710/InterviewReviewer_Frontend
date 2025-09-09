// src/pages/Signup.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../services/apiClient";

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Min 6 characters").required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await api.post("/auth/signup", values);
      const token = data?.token;
      const user = data?.user;
      if (token) localStorage.setItem("token", token);
      toast.success("Signup successful!");
      if (user?.isStaff) navigate("/staff-dashboard");
      else navigate("/");
    } catch (err) {
      console.error("Signup Error:", err);
      toast.error(err?.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Create Account</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            {({ isSubmitting }) => (
              <Form className="border p-4 rounded bg-light shadow">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <Field name="name" className="form-control" />
                  <ErrorMessage name="name" component="div" className="text-danger small" />
                </div>
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
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
