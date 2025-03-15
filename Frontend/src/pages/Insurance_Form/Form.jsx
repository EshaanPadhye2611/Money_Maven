import React, { useState } from "react";

const InsuranceForm = () => {
  const [hasInsurance, setHasInsurance] = useState(null); // Stores Yes/No response
  const [policyId, setPolicyId] = useState(""); // Stores policy ID
  const [formData, setFormData] = useState({
    age: "",
    income: "",
    coverageAmount: "",
    policyType: "",
    tenure: "",
    premiumPaymentMode: "",
    medicalReport: null,
    reportCard: null,
    incomeCertificate: null,
    incomeTaxReturn: null,
    agreeToTerms: false,
  });

  // Handles input changes
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    }));
  };

  // Handle insurance check response
  const handleInsuranceCheck = (response) => {
    setHasInsurance(response);
  };

  // Search policy ID
  const handleSearchPolicy = () => {
    if (policyId.trim() === "") {
      alert("Please enter a valid policy ID.");
      return;
    }
    alert(`Searching for Policy ID: ${policyId}...`);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions before submitting.");
      return;
    }
    alert("Form Submitted Successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-96 animate-fadeIn transition-all duration-500">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Insurance Verification</h2>

        {/* Step 1: Ask if user has insurance */}
        {hasInsurance === null && (
          <div className="text-center">
            <p className="text-lg font-medium">Do you already have an insurance policy?</p>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={() => handleInsuranceCheck(true)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                Yes
              </button>
              <button
                onClick={() => handleInsuranceCheck(false)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300"
              >
                No
              </button>
            </div>
          </div>
        )}

        {/* Step 2: If user has insurance, ask for policy ID */}
        {hasInsurance === true && (
          <div className="transition-opacity duration-700 opacity-100">
            <label className="block font-medium mt-6">Enter Your Policy ID:</label>
            <input
              type="text"
              name="policyId"
              value={policyId}
              onChange={(e) => setPolicyId(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSearchPolicy}
              className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300"
            >
              Search Policy
            </button>
          </div>
        )}

        {/* Step 3: Show form if user does not have insurance */}
        {hasInsurance === false && (
          <div className="transition-opacity duration-700 opacity-100 mt-6">
            <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Buy Insurance</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium">Age:</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium">Annual Income:</label>
                <input
                  type="number"
                  name="income"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium">Coverage Amount:</label>
                <input
                  type="number"
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div>
                <label className="block font-medium">Insurance Policy Type:</label>
                <select
                  name="policyType"
                  value={formData.policyType}
                  onChange={handleChange}
                  required
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                >
                  <option value="">Select Policy Type</option>
                  <option value="term-life">Term Life Insurance</option>
                  <option value="whole-life">Whole Life Insurance</option>
                  <option value="health">Health Insurance</option>
                  <option value="auto">Auto Insurance</option>
                  <option value="disability">Long-Term Disability Insurance</option>
                  <option value="pension">Pension Scheme</option>
                </select>
              </div>

              <div>
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="font-medium">
                  I agree to the <a href="#" className="text-blue-600 underline">terms and conditions</a>.
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-700 text-white py-2 rounded-md transition-all duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  return <InsuranceForm />;
}
