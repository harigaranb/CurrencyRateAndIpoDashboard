import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../css/commonStyles.css";

const CurrencyExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchExchangeRatesList = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${process.env.REACT_APP_IEX_API_KEY}`
      );
      setExchangeRates(response.data);
    } catch (error) {
      console.error("Error while fetching exchange rates:", error);
      setError("Error while fetching exchange rates. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRatesList();
  }, []);

  const handleRefresh = () => {
    fetchExchangeRatesList();
  };

  return (
    <div className="container">
      <h2>Currency Exchange Rates List</h2>
      {loading ? (
        <p>Fetching Exchange Rates...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Currency Pair</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {exchangeRates.map((rate) => (
                <tr key={rate.symbol}>
                  <td>{rate.symbol}</td>
                  <td>{rate.rate}</td>
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

export default CurrencyExchangeRates;
