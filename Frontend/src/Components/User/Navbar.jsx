import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';

const NavBar = () => {
  const [userName, setUserName] = useState(localStorage.getItem("username") || ""); // Initial value
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUsername = localStorage.getItem("username");
      setUserName(updatedUsername || ""); // Update username when localStorage changes
    };

    window.addEventListener("storage", handleStorageChange); // Listen for changes

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    navigate("/", { replace: true });
  };

  return (
    <div className="flex bg-white p-4 rounded-lg border-2 border-black shadow-lg mt-4 w-full justify-between">
      <div className="flex items-center">
        <img src="/ca.png" alt="Restaurant" className="w-16 h-16 mr-2" />
        <div className="text-4xl font-semibold">User Dashboard</div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="text-lg font-bold text-black hover:text-green-800 cursor-pointer">
          Mutual Funds
        </div>
        <div className="text-lg font-bold text-black hover:text-green-800 cursor-pointer">
          Latest Stocks
        </div>
        <Link to="/insurance" className="text-lg font-bold text-black hover:text-green-800">
          Insurance
        </Link>
        <Link to="/sip" className="text-lg font-bold text-black hover:text-green-800">
          SIPs
        </Link>
      </div>

      <div className="flex items-center">
        <img src="/login.png" alt="Login" className="w-12 h-12 mr-2" />
        <div className="text-lg font-bold mr-4">{userName || "Guest"}</div> {/* Shows username */}
        <button onClick={handleLogout} className="flex items-center bg-red-500 text-white p-2 rounded-lg hover:bg-red-600">
          Logout <FaSignOutAlt className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
