import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

export default function Signup() {
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <div className="auth-box">

        <h2>Sign Up</h2>
        <p className="subtitle">
          Create an account to access UrbanEDS
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

        {/* SIGNUP FORM */}
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email address" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="auth-btn">
            Sign Up as {role}
          </button>
        </form>

        <p className="switch-link">
          Already have an account? <span onClick={() => navigate("/login")}>Login</span>
        </p>

      </div>
    </div>
  );
}
