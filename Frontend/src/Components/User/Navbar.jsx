import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const NavBar = () => {
  const [userName, setUserName] = useState(localStorage.getItem("username") || ""); // Initial value
  const [fdRecords, setFdRecords] = useState([]); // State to hold FD data
  const [insuranceRecords, setInsuranceRecords] = useState([]); // State to hold Insurance data
  const [isFdModalOpen, setIsFdModalOpen] = useState(false); // State to control FD modal visibility
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false); // State to control Insurance modal visibility
  const navigate = useNavigate();

  // Fetch FD data from the backend
  useEffect(() => {
    const fetchFDData = async () => {
      try {
        const response = await axios.get("/api/v1/user/getFD", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log("API Response:", response); // Print the response for debugging

        if (response.status === 200) {
          setFdRecords(response.data.data); // Set FD data in state
          console.log("FD Records:", response.data.data); // Print FD records for debugging
        } else {
          console.error("Error fetching FD data");
        }
      } catch (error) {
        console.error("Error fetching FD data:", error);
      }
    };

    fetchFDData();
  }, []); // Runs only on component mount

  // Fetch Insurance data from the backend
  useEffect(() => {
    const fetchInsuranceData = async () => {
      try {
        const response = await axios.get("/api/v1/user/getInsurance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        console.log("API Response:", response); // Print the response for debugging

        if (response.status === 200) {
          setInsuranceRecords(response.data.data); // Set Insurance data in state
          console.log("Insurance Records:", response.data.data); // Print Insurance records for debugging
        } else {
          console.error("Error fetching Insurance data");
        }
      } catch (error) {
        console.error("Error fetching Insurance data:", error);
      }
    };

    fetchInsuranceData();
  }, []); // Runs only on component mount

  // Handle storage changes (for username)
  useEffect(() => {
    const handleStorageChange = () => {
      const updatedUsername = localStorage.getItem("username");
      setUserName(updatedUsername || ""); // Update username when localStorage changes
      console.log("Username updated:", updatedUsername); // Print updated username for debugging
    };

    window.addEventListener("storage", handleStorageChange); // Listen for changes

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    navigate("/", { replace: true });
    console.log("User logged out"); // Print logout action for debugging
  };

  // Open the FD records modal
  const openFdModal = () => {
    setIsFdModalOpen(true);
    console.log("FD Modal opened"); // Print modal open action for debugging
  };

  // Close the FD records modal
  const closeFdModal = () => {
    setIsFdModalOpen(false);
    console.log("FD Modal closed"); // Print modal close action for debugging
  };

  // Open the Insurance records modal
  const openInsuranceModal = () => {
    setIsInsuranceModalOpen(true);
    console.log("Insurance Modal opened"); // Print modal open action for debugging
  };

  // Close the Insurance records modal
  const closeInsuranceModal = () => {
    setIsInsuranceModalOpen(false);
    console.log("Insurance Modal closed"); // Print modal close action for debugging
  };

  return (
    <div className="flex bg-white p-4 rounded-lg border-2 border-black shadow-lg mt-4 w-full justify-between">
      <div className="flex items-center">
        <img src="/ca.png" alt="Restaurant" className="w-16 h-16 mr-2" />
        <div className="text-4xl font-semibold">User Dashboard</div>
      </div>

      <div className="flex items-center space-x-8">
        <div className="text-lg font-bold text-black hover:text-green-800 cursor-pointer">
          Overview
        </div>
        <div 
          className="text-lg font-bold text-black hover:text-green-800 cursor-pointer"
          onClick={openFdModal} // Trigger the FD modal when clicked
        >
          FDs
        </div>
        <div 
          className="text-lg font-bold text-black hover:text-green-800 cursor-pointer"
          onClick={openInsuranceModal} // Trigger the Insurance modal when clicked
        >
          Insurance
        </div>
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

      {/* Modal for FD records */}
      {isFdModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Your Fixed Deposits</h2>
            <ul className="space-y-4">
              {fdRecords.length > 0 ? (
                fdRecords.map((fd, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="font-bold">FD ID: {fd.fdID}</div>
                    <div>Name: {fd.fullName}</div>
                    <div>Principal: ₹{fd.depositAmount}</div>
                    <div>Tenure: {fd.tenure} years</div>
                  </li>
                ))
              ) : (
                <div className="text-center text-gray-600">No FD records found</div>
              )}
            </ul>
            <button onClick={closeFdModal} className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Insurance records */}
      {isInsuranceModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Your Insurance</h2>
            <ul className="space-y-4">
              {insuranceRecords.length > 0 ? (
                insuranceRecords.map((insurance, index) => (
                  <li key={index} className="border-b pb-2">
                    <div className="font-bold">Policy ID: {insurance.policyID}</div>
                    <div>Policy Type: {insurance.policyType}</div>
                    <div>Age: {insurance.age}</div>
                    <div>Annual Income: ₹{insurance.annualIncome}</div>
                    <div>Coverage: ₹{insurance.coverageAmount}</div>
                   
                    <div>Tenure: {insurance.tenure} years</div>
                    <div>Purchase Date: {new Date(insurance.purchaseDate).toLocaleDateString()}</div>
                  </li>
                ))
              ) : (
                <div className="text-center text-gray-600">No Insurance records found</div>
              )}
            </ul>
            <button onClick={closeInsuranceModal} className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
