import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/commonStyles.css";

const IpoCalendar = () => {
  const [ipoData, setIpoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchIpoDataList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${process.env.REACT_APP_IEX_API_KEY}`
      );
      setIpoData(response.data);
    } catch (error) {
      console.error("Error while fetching IPO data:", error);
      setError("Error while fetching IPO data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIpoDataList();
  }, []);

  const handleRefresh = () => {
    fetchIpoDataList();
  };

  return (
    <div className="container">
      <h2>IPO Calendar</h2>
      {loading ? (
        <p>Fetching IPO List...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Symbol</th>
                <th>Volume</th>
                <th>Shares</th>
                <th>Offering Date</th>
              </tr>
            </thead>
            <tbody>
              {ipoData.map((ipo) => (
                <tr key={ipo.id}>
                  <td>{ipo.companyName}</td>
                  <td>{ipo.symbol}</td>
                  <td>{ipo.volume}</td>
                  <td>{ipo.shares}</td>
                  <td>{ipo.offeringDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleRefresh} className="back-to-dashboard">Refresh</button>
          <br />
          <br />
          <Link to="../dashboard" className="back-to-dashboard">Back to Dashboard</Link>
        </>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default IpoCalendar;
