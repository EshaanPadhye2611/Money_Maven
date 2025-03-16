import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../../Components/User/Navbar';
import Sidebar from '../../Components/User/Sidebar';
import Header_1 from "../../Components/User/Header_1";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Analytics from "../../Components/User/Analytics";
import Insurance from '../../Components/User/Insurance';
import Schemes from '../../Components/User/Schemes';

const UserPage = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const successMessage = localStorage.getItem("loginSuccess");
    if (successMessage) {
      toast.success(successMessage);
      localStorage.removeItem("loginSuccess");
    }

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        
        if (!token) {
          throw new Error("No token found, please log in again.");
        }

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/user/userdetails`, {
          withCredentials: true,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const userData = response.data.data;
        console.log("Fetched User Details:", userData);

        // Save data to localStorage
        localStorage.setItem("username", userData.username);
        localStorage.setItem("bankBalance", userData.bankBalance);
        localStorage.setItem("annualIncome", userData.annualIncome);
        

        setUserDetails(userData);
        console.log("User details saved in localStorage:", userData);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error fetching user details!");
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <div className="animate-fadeIn">
      <Navbar />
      <div className="flex">
        <Sidebar />

        {/* Main content */}
        <div className="flex-1 p-6 bg-green-100">
          <Header_1 />

          {/* Main content section */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2">
              <Insurance />
            </div>
            <Schemes />
          </div>

          {/* Analytics component */}
          <div className="mt-6">
            <Analytics />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserPage;