import React, { useEffect } from 'react'
import Navbar from '../../Components/User/Navbar'
import Sidebar from '../../Components/User/Sidebar';
import Header_1 from "../../Components/User/Header_1";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Analytics from "../../Components/User/Analytics";
import Insurance from '../../Components/User/Insurance';
import Schemes from '../../Components/User/Schemes';
import PieChart from '../../Components/User/pie-chart';

const UserPage = () => {
  useEffect(() => {
    const successMessage = localStorage.getItem("loginSuccess");

    if (successMessage) {
      toast.success(successMessage);

      // Remove the message from localStorage so it doesn't show again on refresh
      localStorage.removeItem("loginSuccess");
    }
  }, []); 
  return (
    
    <div className="animate-fadeIn">
      
      <Navbar />
      <div className="flex ">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 p-6 bg-green-100">
          <Header_1 />
          
          {/* Main content section with food items and AI Recipe */}
          <div className="grid grid-cols-3 gap-6 mt-6">
            <div className="col-span-2">
            <Insurance/>
            </div>
           <Schemes/>
          </div>

          {/* Analytics component */}
          <div className="mt-6">
            <Analytics />
          </div>
        
         
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default UserPage;
