import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Login.css"; 
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, values);
      const { token, user } = res.data;

      // Save token
      localStorage.setItem("token", token);

      toast.success("Login successful!");

      // Redirect based on role
      if (user.isStaff) {
        navigate("/staff-dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {() => (
            <Form className="login-form">
              {/* Email */}
              <div className="form-group">
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="neu-input"
                />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              {/* Password */}
              <div className="form-group">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="neu-input"
                />
                <ErrorMessage name="password" component="div" className="error" />
              </div>

              {/* Submit button */}
              <button type="submit" className="neu-button" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <span className="signup-link" onClick={() => navigate("/signup")}>
              Sign up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
