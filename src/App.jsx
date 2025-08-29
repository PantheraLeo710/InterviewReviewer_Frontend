import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/login";
import QuestionsPage from "./pages/questions";
import SubmissionResult from './pages/SubmissionResult';
import Home from "./pages/Home";
import History from "./pages/History";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import StaffDashboard from "./pages/StaffDashboard";
import FeedbackForm from './pages/FeedbackForm';
import StaffWelcome from "./pages/staffLanding";
import Profile from "./pages/Profile";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/theme.css';

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/questions" element={<QuestionsPage />} />
          <Route path="/submission-result" element={<SubmissionResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<History />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/staff-welcome" element={<StaffWelcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/staff-dashboard"
            element={
              <ProtectedRoute isStaffOnly={true}>
                <StaffDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/unauthorized" element={<h2 className="text-center mt-5">Unauthorized Access</h2>} />

        </Routes>


        <ToastContainer position="top-right" autoClose={3000} />
      </div>

    </Router>
  );
}

export default App;

