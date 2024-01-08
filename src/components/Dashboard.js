import React from "react";
import { Link } from "react-router-dom";
import "../css/Dashboard.css";

const Dashboard = ({ user }) => {
  return (
    <div className="dashboard-container">
      <h2 align="center" className="dashboard-header">
        Hi, {user.username}!
      </h2>
      <br />
      <br />
      <nav className="dashboard-navigation">
        <Link to="./ipo-calendar">IPO Calendar</Link>
        <Link to="./exchange-rates">Currency Exchange Rates</Link>
      </nav>
    </div>
  );
};

export default Dashboard;
