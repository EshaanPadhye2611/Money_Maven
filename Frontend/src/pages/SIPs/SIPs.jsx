import React, { useState, useEffect } from "react";
import axios from "axios";

const SipInvestment = () => {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState("");
  const [sipAmount, setSipAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [portfolio, setPortfolio] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/mutualfunds").then((res) => setFunds(res.data));
    axios.get("http://localhost:5000/portfolio").then((res) => setPortfolio(res.data));
  }, []);

  const handleInvest = async () => {
    if (!selectedFund || sipAmount <= 0) {
      alert("Please select a fund and enter a valid amount.");
      return;
    }

    const investment = { fund: selectedFund, amount: sipAmount, frequency };

    const res = await axios.post("http://localhost:5000/invest", investment);
    if (res.data.success) {
      alert("SIP Started Successfully!");
      setPortfolio([...portfolio, res.data.sip]);
    } else {
      alert("Investment failed.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4">💰 Start SIP Investment</h2>

      <select className="w-full p-2 border mb-4" onChange={(e) => setSelectedFund(e.target.value)}>
        <option value="">Select a Mutual Fund</option>
        {funds.map((fund) => (
          <option key={fund.id} value={fund.name}>
            {fund.name} (₹{fund.nav})
          </option>
        ))}
      </select>

      <input
        type="number"
        className="w-full p-2 border mb-4"
        placeholder="SIP Amount (Min ₹500)"
        value={sipAmount}
        onChange={(e) => setSipAmount(e.target.value)}
      />

      <select className="w-full p-2 border mb-4" onChange={(e) => setFrequency(e.target.value)}>
        <option value="monthly">Monthly</option>
        <option value="weekly">Weekly</option>
        <option value="quarterly">Quarterly</option>
      </select>

      <button className="bg-blue-500 text-white p-2 w-full rounded" onClick={handleInvest}>
        Start SIP
      </button>

      <h2 className="text-lg font-bold mt-6">📊 Your Portfolio</h2>
      {portfolio.length > 0 ? (
        <ul className="mt-4">
          {portfolio.map((sip) => (
            <li key={sip.id} className="p-2 border-b">
              {sip.fund} - ₹{sip.amount} ({sip.frequency})
            </li>
          ))}
        </ul>
      ) : (
        <p>No active SIPs</p>
      )}
    </div>
  );
};

export default SipInvestment;
