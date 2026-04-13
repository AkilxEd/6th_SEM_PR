import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="navbar">
      <div className="navbar-inner">

        <div className="logo">
          Urban<span>EDS</span>
        </div>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/prediction">Prediction</Link>
          <Link to="/reports">Reports</Link>
        </div>

        <div className="nav-auth">

          {/* If on HOME page always show Login/Signup */}
          {isHomePage && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

          {/* If logged in and not on home page show Logout */}
          {!isHomePage && isLoggedIn && (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          )}

          {/* If not logged in */}
          {!isHomePage && !isLoggedIn && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup" className="signup-btn">Sign Up</Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}