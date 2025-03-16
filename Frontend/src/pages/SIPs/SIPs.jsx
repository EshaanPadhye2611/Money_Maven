import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify"; // Import react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import styles

const SipInvestment = () => {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [sipAmount, setSipAmount] = useState("");
  const [frequency, setFrequency] = useState("monthly");
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyFunds = [
      { id: 1, name: "HDFC Top 100 Fund", nav: 890, category: "Equity", riskLevel: "High" },
      { id: 2, name: "SBI Bluechip Fund", nav: 650, category: "Equity", riskLevel: "Moderate" },
      { id: 3, name: "ICICI Prudential Balanced Advantage Fund", nav: 450, category: "Balanced", riskLevel: "Low" },
      { id: 4, name: "Axis Growth Opportunities Fund", nav: 780, category: "Equity", riskLevel: "High" },
      { id: 5, name: "Kotak Small Cap Fund", nav: 320, category: "Equity", riskLevel: "High" },
      { id: 6, name: "Tata Digital India Fund", nav: 590, category: "Sectoral", riskLevel: "High" },
      { id: 7, name: "Mirae Asset Emerging Bluechip", nav: 720, category: "Equity", riskLevel: "Moderate" },
      { id: 8, name: "Parag Parikh Flexi Cap Fund", nav: 1010, category: "Flexi Cap", riskLevel: "Moderate" },
      { id: 9, name: "UTI Nifty Index Fund", nav: 250, category: "Index", riskLevel: "Low" },
      { id: 10, name: "ICICI Prudential Technology Fund", nav: 1200, category: "Technology", riskLevel: "High" },
    ];

    setTimeout(() => {
      setFunds(dummyFunds);
      setLoading(false);
    }, 1000);

    axios.get("http://localhost:5000/portfolio").then((res) => setPortfolio(res.data));
  }, []);

  const handleInvest = async () => {
    if (!selectedFund || sipAmount < 500) {
      alert("Please select a fund and enter a valid amount (Min ₹500).");
      return;
    }

    const investment = { fund: selectedFund.name, amount: sipAmount, frequency };

    try {
      const res = await axios.post("http://localhost:5000/invest", investment);

      if (res.data.success) {
        // Get current date and time
        const now = new Date();
        const startDate = now.toLocaleString();

        // Show toast notification with start date
        toast.success(`✅ SIP Started for ${selectedFund.name} on ${startDate}`, {
          position: "top-right",
          autoClose: 5000,
        });

        setPortfolio([...portfolio, res.data.sip]);
      } else {
        toast.error("⚠️ Investment failed. Please try again.");
      }
    } catch (error) {
      toast.error("⚠️ Error connecting to server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <ToastContainer /> {/* Toast Container for Notifications */}

      <motion.div
        className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">💰 Start Your SIP Investment</h2>
        <p className="text-gray-600 text-center mb-6">Invest in top mutual funds & grow your wealth over time!</p>

        {/* Fund Selection */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">Select Mutual Fund:</label>
          <select
            className="w-full p-3 border rounded-lg"
            onChange={(e) => setSelectedFund(funds.find(f => f.name === e.target.value))}
          >
            <option value="">-- Select a Fund --</option>
            {funds.map((fund) => (
              <option key={fund.id} value={fund.name}>
                {fund.name} (NAV: ₹{fund.nav})
              </option>
            ))}
          </select>
        </div>

        {/* Fund Details */}
        {selectedFund && (
          <motion.div
            className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4 rounded-lg shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h3 className="text-lg font-semibold text-blue-600">{selectedFund.name}</h3>
            <p className="text-gray-600">NAV: ₹{selectedFund.nav}</p>
            <p className="text-gray-600">Category: {selectedFund.category}</p>
            <p className="text-gray-600">Risk: <span className="font-semibold">{selectedFund.riskLevel}</span></p>
          </motion.div>
        )}

        {/* SIP Amount */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-2">SIP Amount (Min ₹500):</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg"
            placeholder="Enter SIP amount"
            value={sipAmount}
            onChange={(e) => setSipAmount(e.target.value)}
            min="500"
          />
        </div>

        {/* Invest Button */}
        <button
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition"
          onClick={handleInvest}
        >
          🚀 Start SIP Now
        </button>
      </motion.div>

      {/* Portfolio Section */}
      <motion.div
        className="w-full max-w-3xl bg-white shadow-xl rounded-lg p-6 mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">📊 Your Portfolio</h2>
        {portfolio.length > 0 ? (
          <div className="mt-6">
            {portfolio.map((sip) => (
              <motion.div
                key={sip.id}
                className="p-4 bg-gray-50 rounded-lg mb-4 border-l-4 border-blue-500 shadow-sm"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="text-lg font-semibold text-blue-600">{sip.fund}</h3>
                <p>Amount: ₹{sip.amount}</p>
                <p>Frequency: {sip.frequency}</p>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No active SIPs yet. Start investing today!</p>
        )}
      </motion.div>
    </div>
  );
};

export default SipInvestment;
