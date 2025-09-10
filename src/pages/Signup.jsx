// src/pages/Signup.jsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import api from "../services/apiClient";
import "./Signup.css"; // Scoped Neumorphic styles for signup

const Signup = () => {
  const navigate = useNavigate();

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { data } = await api.post("/auth/signup", values);

      const token = data?.token;
      const user = data?.user;

      if (token) localStorage.setItem("token", token);

      toast.success("Signup successful!");

      // Role-based navigation
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
    <div className="signup-wrapper">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us and get started</p>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="signup-form">
              {/* Name */}
              <div className="form-group">
                <Field
                  name="name"
                  placeholder="Full Name"
                  className="neu-input"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="error"
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="neu-input"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error"
                />
              </div>

              {/* Password */}
              <div className="form-group">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className="neu-input"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="neu-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        {/* Footer */}
        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="signup-link">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
