import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51R2y5aQibNF2Uoy0dMksaKRqVHaby023TBA4QG0eGqb1r8mnMqoxdcYYwnq5AjBpWb1hZfkt6VZnLaDZ3i5zoHCE00c0rQkVks");

const InsuranceForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    annualIncome: "",
    coverageAmount: "",
    policyType: "",
    tenure: "1",
    aadhaarNumber: "",
  });
  const [premium, setPremium] = useState(null);

  // Base premium rates (per ₹1000 coverage) based on policy type
  const policyRates = {
    "term-life": 1.2,
    "whole-life": 1.8,
    "health": 2.5,
    "auto": 3.0,
    "travel": 1.5,
    "property": 2.2,
  };

  // Function to calculate insurance premium
  const calculatePremium = (coverage, tenure, policyType, age) => {
    if (!coverage || !tenure || !policyType || !age) return null;

    const rate = policyRates[policyType] || 2.0;
    const ageFactor = age < 30 ? 1.0 : age < 50 ? 1.2 : 1.5;

    return ((coverage / 1000) * rate * tenure * ageFactor).toFixed(2);
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (["coverageAmount", "tenure", "policyType", "age"].includes(name)) {
      const coverage = parseFloat(name === "coverageAmount" ? value : formData.coverageAmount);
      const tenure = parseInt(name === "tenure" ? value : formData.tenure);
      const policyType = name === "policyType" ? value : formData.policyType;
      const age = parseInt(name === "age" ? value : formData.age);

      if (!isNaN(coverage) && !isNaN(tenure) && policyType && !isNaN(age)) {
        setPremium(calculatePremium(coverage, tenure, policyType, age));
      } else {
        setPremium(null);
      }
    }
  };

  // Validate form data before submission
  const validateFormData = () => {
    const { age, annualIncome, coverageAmount } = formData;
    if (age < 18 || age > 90) {
      alert("Age must be between 18 and 90.");
      return false;
    }
    if (annualIncome <= 0) {
      alert("Annual income must be a positive number.");
      return false;
    }
    if (coverageAmount <= 0) {
      alert("Coverage amount must be a positive number.");
      return false;
    }
    return true;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Buy Insurance</h2>
        <form className="space-y-4">
          <div>
            <label className="block font-medium">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              min="18"
              max="90"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Annual Income:</label>
            <input
              type="number"
              name="annualIncome"
              value={formData.annualIncome}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Coverage Amount (₹):</label>
            <input
              type="number"
              name="coverageAmount"
              value={formData.coverageAmount}
              onChange={handleChange}
              min="1"
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Tenure:</label>
            <select
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              {[...Array(30)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-medium">Aadhaar Number:</label>
            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block font-medium">Policy Type:</label>
            <select
              name="policyType"
              value={formData.policyType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select Policy Type</option>
              <option value="Term Life">Term Life</option>
              <option value="Whole Life">Whole Life</option>
              <option value="Health">Health</option>
              <option value="Auto">Auto</option>
              <option value="Travel">Travel</option>
              <option value="Property">Property</option>
            </select>
          </div>

          {premium !== null && (
            <div className="mt-2 text-center text-lg font-semibold text-green-700">
              Premium: ₹{premium.toLocaleString()}
            </div>
          )}
        </form>
        <StripeCheckoutButton formData={formData} premium={premium} validateFormData={validateFormData} />
      </div>
    </div>
  );
};

const StripeCheckoutButton = ({ formData, premium, validateFormData }) => {
  const stripe = useStripe();

  const handlePayment = async () => {
    if (!premium) {
      alert("Please enter valid insurance details.");
      return;
    }

    if (!validateFormData()) {
      return;
    }

    // Retrieve token from localStorage (or your auth state)
    const token = localStorage.getItem("token"); // Ensure you store this during login

    if (!token) {
      alert("Unauthorized: Please log in first.");
      return;
    }

    try {
      console.log("Submitting form data...");
      console.log("Form data:", formData);

      // First, submit the form data
      const formResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/user/insuranceForm`,
        formData, // Moved this outside headers
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 🛠 Include token properly
          },
        }
      );

      console.log("Form submitted successfully!", formResponse.data);

      console.log("Processing payment...");
      const paymentResponse = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/create-checkout-session`,
        {
          amount: premium,
          currency: "inr",
          description: `Insurance Policy: ${formData.policyType}, Tenure: ${formData.tenure} years`,
        }
      );

      const session = paymentResponse.data;
      console.log("Stripe session:", session);
      await stripe.redirectToCheckout({ sessionId: session.id });

    } catch (err) {
      console.error("Error:", err);
      alert("Error processing payment.");
    }
  };

  return <button onClick={handlePayment} className="w-full mt-4 bg-green-600 text-white py-2 rounded-md">Pay ₹{premium}</button>;
};

export default function App() {
  return <Elements stripe={stripePromise}><InsuranceForm /></Elements>;
}