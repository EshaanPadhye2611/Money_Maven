import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51R2y5aQibNF2Uoy0dMksaKRqVHaby023TBA4QG0eGqb1r8mnMqoxdcYYwnq5AjBpWb1hZfkt6VZnLaDZ3i5zoHCE00c0rQkVks");

const InsuranceForm = () => {
  const [hasInsurance, setHasInsurance] = useState(null);
  const [policyId, setPolicyId] = useState("");
  const [policyNumber, setPolicyNumber] = useState(null);
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    coverageAmount: "",
    policyType: "",
    aadhaarNumber: "",
    agreeToTerms: false,
  });

  const [price, setPrice] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "coverageAmount") {
      const coverage = parseFloat(value);
      if (!isNaN(coverage)) {
        setPrice(coverage * 0.05); // 5% of coverage as premium
      } else {
        setPrice(null);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Insurance Verification</h2>

        {hasInsurance === null && (
          <div className="text-center">
            <p className="text-lg font-medium">Do you have an insurance policy?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button onClick={() => setHasInsurance(true)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                Yes
              </button>
              <button onClick={() => setHasInsurance(false)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
                No
              </button>
            </div>
          </div>
        )}

        {hasInsurance === true && (
          <div>
            <label className="block font-medium mt-6">Enter Your Policy ID:</label>
            <input type="text" value={policyId} onChange={(e) => setPolicyId(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-md" />
            <button className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white py-2 rounded-md">
              Search Policy
            </button>
          </div>
        )}

        {hasInsurance === false && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Buy Insurance</h2>
            <form className="space-y-4">
              <div>
                <label className="block font-medium">Age:</label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium">Annual Income:</label>
                <input type="number" name="income" value={formData.income} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium">Coverage Amount:</label>
                <input type="number" name="coverageAmount" value={formData.coverageAmount} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium">Aadhaar Number:</label>
                <input type="text" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
              </div>
              <div>
                <label className="block font-medium">Policy Type:</label>
                <select name="policyType" value={formData.policyType} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md">
                  <option value="">Select Policy Type</option>
                  <option value="term-life">Term Life</option>
                  <option value="whole-life">Whole Life</option>
                  <option value="health">Health</option>
                  <option value="auto">Auto</option>
                  <option value="travel">Travel</option>
                  <option value="property">Property</option>
                </select>
              </div>

              {price !== null && (
                <div className="mt-2 text-center text-lg font-semibold text-green-700">
                  Premium: ₹{price.toLocaleString()}
                </div>
              )}

              <div>
                <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleChange} className="mr-2" />
                <label>I agree to the <a href="#" className="text-blue-600 underline">terms & conditions</a>.</label>
              </div>
            </form>

            <StripeCheckoutButton formData={formData} price={price} setPolicyNumber={setPolicyNumber} />
            {policyNumber && (
              <div className="mt-4 text-center text-green-700 font-bold">
                Your Policy Number: {policyNumber}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const StripeCheckoutButton = ({ formData, price, setPolicyNumber }) => {
  const stripe = useStripe();

  const handlePayment = async () => {
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms before proceeding.");
      return;
    }

    if (!price) {
      alert("Please enter a valid coverage amount.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/create-checkout-session`, {
        amount: price , // Convert to cents
        currency: "usd",
        description: `Insurance Policy: ${formData.policyType}`,
      });

      const session = response.data;
      await stripe.redirectToCheckout({ sessionId: session.id });

      setTimeout(() => {
        const policyNum = `POLICY-${Math.floor(100000 + Math.random() * 900000)}`;
        setPolicyNumber(policyNum);
        alert(`Payment successful! Your Policy Number is: ${policyNum}`);
      }, 5000);
    } catch (err) {
      console.error("Payment Error:", err);
      alert("Error processing payment. Please try again.");
    }
  };

  return (
    <button onClick={handlePayment} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
      Pay ₹{price ? price.toLocaleString() : "0"} with Stripe
    </button>
  );
};

export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <InsuranceForm />
    </Elements>
  );
}
