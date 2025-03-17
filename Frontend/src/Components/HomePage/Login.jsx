import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import styles

const AuthForm = () => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bankBalance, setBankBalance] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP States
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpPopup, setOtpPopup] = useState(false);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      try {
        // Step 1: Send OTP to the user's email
        const otpResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/send-otp`, { email });

        if (otpResponse.data.success) {
          toast.success("OTP sent to your email!", { autoClose: 2000 });
          setOtpSent(true);
          setOtpPopup(true); // Show OTP popup
        } else {
          toast.error("Failed to send OTP. Try again.");
        }
      } catch (error) {
        toast.error("Error sending OTP.");
      }
    } else {
      // Handle Login
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, { email, password });
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.token);
          toast.success("Login Successful!", { autoClose: 2000 });
          setTimeout(() => navigate("/user"), 1500);
        }
      } catch (error) {
        toast.error("Login failed! Please check your credentials.");
      }
    }

    setLoading(false);
  };

  // Handle OTP Verification
  const handleVerifyOtp = async () => {
    try {
      const verifyResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/verify-otp`, { email, otp });

      if (verifyResponse.data.success) {
        // OTP verified, proceed with registration
        const registerResponse = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, {
          email,
          username,
          password,
          phone,
          bankBalance,
          annualIncome,
        });

        if (registerResponse.status === 201) {
          toast.success("Registration Successful!", { autoClose: 2000 });
          setOtpPopup(false);
          setIsRegister(false); // Switch to login
        }
      } else {
        toast.error("Invalid OTP. Try again.");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    }
  };

  return (
    <>
      {/* Toast Container for displaying notifications */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar closeOnClick pauseOnHover draggable />

      
      <form onSubmit={handleSubmit} className="w-full p-8 shadow-lg rounded-lg mx-auto">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            {isRegister ? "Register" : "Login"}
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          {isRegister && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Bank Balance:</label>
                <input
                  type="number"
                  value={bankBalance}
                  onChange={(e) => setBankBalance(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Annual Income:</label>
                <input
                  type="number"
                  value={annualIncome}
                  onChange={(e) => setAnnualIncome(e.target.value)}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
            }`}
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Login"}
          </button>

          <p className="text-center mt-4 text-gray-600">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <span
              onClick={() => setIsRegister(!isRegister)}
              className="text-green-500 cursor-pointer hover:underline transition-all"
            >
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </form>
      

      {/* OTP Verification Popup */}
      {otpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <button onClick={handleVerifyOtp} className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Verify OTP
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthForm;
