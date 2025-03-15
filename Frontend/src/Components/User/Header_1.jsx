import React, { useState, useEffect } from "react";
import axios from "axios";
import { AlertTriangle, UtensilsCrossed, Users } from "lucide-react"; // Icons
import { FaRupeeSign } from "react-icons/fa";
import { ImTrophy } from "react-icons/im";
import { FaExclamationTriangle } from "react-icons/fa";

const Header_1 = () => {
  const [expiringSoonItems, setExpiringSoonItems] = useState([]);
  const [wastePrevented, setWastePrevented] = useState(0);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get("/api/v1/users/getFoodItems", {
          withCredentials: true,
        });
        const items = response.data.data || [];
        console.log("Fetched Food Items:", items);

        // Get today's date without time
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log("Today's Date:", today);

        // Filter items expiring in the next 3 days
        const expiringItems = items.filter((item) => {
          if (!item.expiryDate) return false;
          const expiryDate = new Date(item.expiryDate);
          expiryDate.setHours(0, 0, 0, 0);
          console.log("Item:", item.name, "Expiry Date:", expiryDate);

          const daysDiff = (expiryDate - today) / (1000 * 60 * 60 * 24);
          console.log("Days Difference for", item.name, ":", daysDiff);
          return daysDiff >= 0 && daysDiff <= 3;
        });

        console.log("Expiring Soon Items:", expiringItems);
        setExpiringSoonItems(expiringItems);
      } catch (err) {
        console.error("Failed to fetch food items:", err);
      }
    };

    const fetchWastePrevented = async () => {
      try {
        const response = await axios.get("/api/v1/users/donation-history", {
          withCredentials: true,
        });
        const donations = response.data.data || [];
        console.log("Fetched Donations:", donations);

        // Filter donations that are "Delivered" and sum up their quantities
        const totalDelivered = donations
          .filter((donation) => donation.status === "Delivered")
          .reduce((sum, donation) => sum + Number(donation.quantity || 0), 0);

        setWastePrevented(totalDelivered);
      } catch (err) {
        console.error("Failed to fetch waste prevented data:", err.response ? err.response.data : err.message);
      }
    };

    fetchFoodItems();
    fetchWastePrevented();
  }, []);

  // Calculate the estimated number of people fed
  const minPeopleFed = wastePrevented;
  const maxPeopleFed = wastePrevented + 10;

  return (
    <div className="grid grid-cols-4 gap-6 p-6">
      {/* Expiring Soon Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <AlertTriangle className="text-red-500 w-6 h-6" />
          Expiring Soon
        </h3>
        <p className="text-3xl font-bold text-red-600 mt-2">{expiringSoonItems.length} Policies</p>
        <span className="text-sm text-gray-500">
          {expiringSoonItems.length > 0
            ? `⚠ ${expiringSoonItems[0].name} expiring soon`
            : "No policies expiring soon"}
        </span>
      </div>

      {/* Food Distributed Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <FaExclamationTriangle className="text-red-600 w-6 h-6" />
          Stocks Downturn
        </h3>
        <p className="text-3xl font-bold text-green-700 mt-2">Tata</p>
        <span className="text-sm text-red-500 font-bold">
          MRF, HDFC stocks downturn
        </span>
      </div>

      {/* Entity Fed Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <ImTrophy className="text-blue-600 w-6 h-6" />
          Profit Earned
        </h3>
        <p className="text-3xl font-bold text-blue-700 mt-2">15000 ₹</p>
        <span className="text-sm text-green-600 font-bold">Your Profit is growing! 🌱</span>
      </div>

      {/* Money Saved Box */}
      <div className="bg-white shadow-lg rounded-2xl p-6 text-center border border-gray-300 hover:shadow-xl transition">
        <h3 className="text-xl font-semibold flex items-center justify-center gap-2">
          <FaRupeeSign className="text-gray-600 w-6 h-6" />
          Current Balance
        </h3>
        <p className="text-3xl font-bold text-gray-800 mt-2">40000 ₹</p>
        <span className="text-sm text-gray-500 font-bold">Consistently growing!</span>
      </div>
    </div>
  );
};

export default Header_1;