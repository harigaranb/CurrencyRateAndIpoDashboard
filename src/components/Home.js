import React from "react";
import "../css/Home.css";

const Home = () => {
  return (
    <div className="page-container home-container">
      <h1>Welcome to Dashboard</h1>
      <p>
        To Get Started, Please &nbsp;
        <a className="home-link" href="/login">
          Login
        </a>{" "}
        or{" "}
        <a className="home-link" href="/registration">
          Register
        </a>{" "}
      </p>
    </div>
  );
};

export default Home;
