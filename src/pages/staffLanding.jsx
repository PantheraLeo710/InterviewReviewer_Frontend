import React from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, PartyPopper } from "lucide-react";

const StaffWelcome = () => {
  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-gradient bg-dark text-light">
      <div className="text-center p-5 rounded shadow-lg bg-opacity-75 bg-secondary">
        <div className="mb-4">
          <PartyPopper size={48} className="text-warning" />
        </div>
        <h1 className="display-4 fw-bold"> Well Done!</h1>
        <p className="lead">You've officially been <span className="text-success fw-bold">promoted to Staff</span>.</p>
        <p className="fs-5">Welcome to the company! We're thrilled to have you onboard as part of our mission to shape the future of interviews and feedback.</p>
      
        <div className="my-4">
          <BadgeCheck size={32} className="text-info" />
          <p className="mt-2">Your contributions matter. Let’s make great things happen together.</p>
        </div>

        <Link to="/staff-dashboard" className="btn btn-outline-light btn-lg mt-3">
          Go to Staff Dashboard
        </Link>
      </div>
    </div>
  );
};

export default StaffWelcome;
