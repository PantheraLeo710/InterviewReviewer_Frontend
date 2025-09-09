import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { FaClipboardList, FaHistory, FaUser } from "react-icons/fa";
import { RiLogoutBoxRLine } from 'react-icons/ri';
import '../App.css'
import { LayoutDashboard, MessageSquareMore } from "lucide-react";

export default function AppNavbar() {
  const navigate = useNavigate();
  const [tokenData, setTokenData] = useState(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt_decode(token);
        setTokenData(decoded);
      } catch {
        setTokenData(null);
      }
    }
  }, [token]);
  console.log("tokenData",tokenData);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setTokenData(null);
    navigate("/login");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm mb-1 sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" style={{ fontFamily: "Roboto, Tirra, sans-serif" }}>Interview Reviewer</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">

            {/* User Links */}
            {tokenData && !tokenData.isStaff && (
              <>
                <Nav.Link as={Link} to="/dashboard"><LayoutDashboard className="me-1" /> Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/questions"><FaClipboardList className="me-1" /> Questions</Nav.Link>
                <Nav.Link as={Link} to="/history"><FaHistory className="me-1" /> History</Nav.Link>
              </>
            )}

            {/* Staff Links */}
            {tokenData?.isStaff && (
              <>
                <Nav.Link as={Link} to="/staff-dashboard"><LayoutDashboard className="me-1" /> Staff Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/feedback"><MessageSquareMore className="me-1" /> Feedback</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {tokenData ? (
              <NavDropdown title={tokenData.name || "Account"} align="end">
                <NavDropdown.Item as={Link} to="/profile"><FaUser /> Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}><RiLogoutBoxRLine className="me-1" />Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
