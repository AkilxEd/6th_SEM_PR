import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();                                                                                                                 

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("role", role);

    navigate("/dashboard");
  
    // TEMPORARY LOGIC (NO BACKEND)
    if (role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h2>Login</h2>
        <p className="subtitle">
          Access the Urban Environmental Decision System
        </p>

        {/* ROLE SELECT */}
        <div className="role-select">
          <button
            className={role === "user" ? "active" : ""}
            onClick={() => setRole("user")}
          >
            User
          </button>
          <button
            className={role === "admin" ? "active" : ""}
            onClick={() => setRole("admin")}
          >
            Admin
          </button>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="auth-btn">
            Login as {role}
          </button>
        </form>

        <p className="switch-link">
          Don’t have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>

      </div>
    </div>
  );
} 
