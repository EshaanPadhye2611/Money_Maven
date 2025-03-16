import React, { useState, useEffect } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";
import { FaExclamationTriangle } from "react-icons/fa";
import { AlertTriangle } from "lucide-react";

const Header_1 = () => {
  const [bankBalance, setBankBalance] = useState(localStorage.getItem("bankBalance") || "Loading...");

  useEffect(() => {
    const updateBalance = () => {
      const storedBalance = localStorage.getItem("bankBalance");
      if (storedBalance) {
        setBankBalance(storedBalance);
      }
    };

    // Fetch initial value
    updateBalance();

    // Listen for changes in localStorage
    window.addEventListener("storage", updateBalance);

    return () => {
      window.removeEventListener("storage", updateBalance);
    };
  }, []);

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {/* Expiring Soon Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <AlertTriangle className="text-red-500 w-6 h-6" />
          Expiring Soon
        </h3>
        <p className="text-3xl font-bold text-red-600 mt-2">1 Policies</p>
        <span className="text-sm text-gray-500">1 policies expiring soon</span>
      </div>

      {/* Stocks Downturn */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <FaExclamationTriangle className="text-red-600 w-6 h-6" />
          Stocks Downturn
        </h3>
        <p className="text-3xl font-bold text-green-700 mt-2">Tata</p>
        <span className="text-sm text-red-500 font-bold">MRF, HDFC stocks downturn</span>
      </div>

      {/* Profit Earned */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <ImTrophy className="text-blue-600 w-6 h-6" />
          Profit Earned
        </h3>
        <p className="text-3xl font-bold text-blue-700 mt-2">15,000 ₹</p>
        <span className="text-sm text-green-600 font-bold">Your profit is growing! 🌱</span>
      </div>

      {/* Account Balance (Updated) */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <FaRupeeSign className="text-gray-600 w-6 h-6" />
          Current Balance
        </h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">{bankBalance} ₹</p>
        <span className="text-sm text-gray-500 font-bold">Consistently growing!</span>
      </div>
    </div>
  );
};

export default Header_1;
