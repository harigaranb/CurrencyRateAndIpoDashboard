import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Registration.css";
import "../css/Home.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Registration successful for ${username}, Your're good to surf!`);
    navigate("/login");
  };

  return (
    <div className="page-container registration-container">
      <h2>Registration</h2>
      <form className="registration-form" onSubmit={handleSubmit}>
        <label>
          Username: &emsp;
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password: &emsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login" className="home-link">Login here</Link>.
      </p>
    </div>
  );
};

export default Registration;
