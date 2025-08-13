import { Link, NavLink, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { UserRoundPen } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let username = "";
  let isStaff = false;

  try {
    if (token && token !== "undefined") {
      const decoded = jwt_decode(token);
      username = decoded.name || decoded.username || "";
      isStaff = decoded.isStaff || false;
    } else {
      localStorage.removeItem("token");
    }
  } catch (err) {
    console.error(" Invalid token:", err.message);
    localStorage.removeItem("token");
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Interview Reviewer</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center gap-2">
            {!token ? (
              <li className="nav-item">
                <NavLink to="/login" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                  Login
                </NavLink>
              </li>
            ) : (
              <>
                {/* Core User Links */}
                <li className="nav-item">
                  <NavLink to="/dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/questions" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    Questions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                    History
                  </NavLink>
                </li>

                {/* Staff-only Links */}
                {isStaff && (
                  <>
                    <li className="nav-item">
                      <NavLink to="/staff-dashboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Staff
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink to="/feedback" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                        Feedback
                      </NavLink>
                    </li>
                  </>
                )}

                {/* User Info & Logout */}
                <li className="nav-item">
                  <div className="d-flex align-items-center gap-2 bg-secondary text-white px-3 py-1 rounded">
                    <UserRoundPen size={15} />
                    <span>{username}</span>
                  </div>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-outline-light ms-2"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
