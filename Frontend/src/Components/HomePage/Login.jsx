import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

const AuthForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [isRegister, setIsRegister] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [bankBalance, setBankBalance] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const url = isRegister
        ? `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`
        : `${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`;

      const payload = isRegister
        ? { email, username, password, phone, bankBalance, annualIncome }
        : { email, password };

      const response = await axios.post(url, payload);
      console.log(response);

      if (response.status === (isRegister ? 201 : 200)) {
        localStorage.setItem("accessToken", response.data.token);

        if (isRegister) {
          // After registration, switch to login form
          setTimeout(() => {
            setIsRegister(false);
          }, 1500);
        } else {
          // After login, redirect to /user
          setTimeout(() => {
            navigate("/user");
          }, 1500);
        }
      } else {
        setMessage({ text: "Something went wrong!", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Failed to process request", type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          {isRegister ? "Register" : "Login"}
        </h2>

        {message && (
          <div className={`mb-4 p-3 text-center rounded-md ${
            message.type === "success"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}>
            {message.text}
          </div>
        )}

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
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700"
          }`}
        >
          {loading ? "Processing..." : isRegister ? "Register" : "Login"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            onClick={() => setIsRegister(!isRegister)}
            className="text-blue-500 cursor-pointer hover:underline transition-all"
          >
            {isRegister ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthForm;