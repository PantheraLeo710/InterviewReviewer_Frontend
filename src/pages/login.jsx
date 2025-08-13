import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../config';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await axios.post(API.AUTH.LOGIN, { email: email.trim(), password });

      if (res.data.token && res.data.user) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        toast.success('Login successful!');
        navigate('/');
      } else {
        toast.error("Unexpected server response. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div className="col-md-5">
        <div className="card shadow-sm border-0 rounded" style={{ backgroundColor: '#ffffff' }}>
          <div className="card-body p-4">
            <div className="text-center mb-3">
              <LogIn size={36} color="#555" />
            </div>
            <h3 className="text-center mb-2" style={{ color: '#333' }}>Login to Your Account</h3>
            <p className="text-center mb-4" style={{ color: '#777' }}>Access your dashboard and continue your journey</p>

            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  autoComplete="off"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  id="password"
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter your password"
                  autoComplete="off"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <label htmlFor="password">Password</label>
              </div>

              <button 
                type="submit" 
                className="btn w-100 btn-dark btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-3 text-center" style={{ color: '#666' }}>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: '#444', textDecoration: 'underline' }}>
                Sign-up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
