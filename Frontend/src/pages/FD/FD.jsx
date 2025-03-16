import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// FD Interest Rate Slabs (Example)
const BANK_INTEREST_RATES = {
  "regular": { "1-3": 5.5, "3-5": 6.2, "5-10": 6.8 },
  "senior": { "1-3": 6.0, "3-5": 6.8, "5-10": 7.5 },
};

const FD = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    depositAmount: "",
    tenure: "",
    
  });

  const [fdRecords, setFdRecords] = useState([]);
  const [fdId, setFdId] = useState("");
  const [foundFD, setFoundFD] = useState(null);
  const [calculator, setCalculator] = useState({
    depositAmount: "",
    tenure: "",
    rate: "",
    compounding: "quarterly",
    maturityAmount: "",
  });

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "tenure") {
      updateInterestRate(value);
    }
  };

  // Update interest rate based on tenure
  const updateInterestRate = (tenure) => {
    let rate = 0;
    if (tenure >= 1 && tenure <= 3) {
      rate = formData.fdType === "senior" ? BANK_INTEREST_RATES.senior["1-3"] : BANK_INTEREST_RATES.regular["1-3"];
    } else if (tenure > 3 && tenure <= 5) {
      rate = formData.fdType === "senior" ? BANK_INTEREST_RATES.senior["3-5"] : BANK_INTEREST_RATES.regular["3-5"];
    } else if (tenure > 5) {
      rate = formData.fdType === "senior" ? BANK_INTEREST_RATES.senior["5-10"] : BANK_INTEREST_RATES.regular["5-10"];
    }
    setFormData((prev) => ({ ...prev, interestRate: rate }));
  };

  // FD Calculation Formula
  const calculateFD = (principal, rate, tenure, compounding) => {
    const n = compounding === "monthly" ? 12 : compounding === "quarterly" ? 4 : 1;
    return (principal * Math.pow(1 + rate / (n * 100), n * tenure)).toFixed(2);
  };

  // Handle FD submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fullName, age, depositAmount, tenure, interestRate, compounding } = formData;

    if (!fullName || !age || !depositAmount || !tenure || !interestRate) {
      toast.error("Please fill all fields correctly!");
      return;
    }

    if (age < 18) {
      toast.error("Minimum age required is 18.");
      return;
    }

    if (depositAmount < 5000) {
      toast.error("Minimum FD amount is ₹5,000.");
      return;
    }

    if (tenure < 1 || tenure > 10) {
      toast.error("Tenure should be between 1 to 10 years.");
      return;
    }

    const fdID = uuidv4();
    const maturityAmount = calculateFD(depositAmount, interestRate, tenure, compounding);

    const newFD = {
      
      fullName,
      age,
      depositAmount,
      tenure,
    
     
    };

    try {
      // Sending the FD data to the backend using axios
      const response = await axios.post("api/v1/user/fdForm", newFD,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // 🛠 Include token properly
          },
        }
        
      );
      
      
      if (response.status === 200) {
        setFdRecords([...fdRecords, newFD]);
        toast.success(`FD created successfully! Your FD ID is: ${fdID}`);
      } else {
        toast.success("FD added successfully!");
      }
    } catch (error) {
      console.error("Error submitting FD form:", error);
      toast.error("Error submitting FD form. Please try again.");
    }
  };

  // FD Verification
  const handleVerifyFD = () => {
    const fdData = fdRecords.find((fd) => fd.fdID === fdId);
    if (fdData) {
      setFoundFD(fdData);
    } else {
      toast.error("No FD found with this ID.");
      setFoundFD(null);
    }
  };

  // FD Calculator Function
  const handleCalculateFD = () => {
    const { depositAmount, tenure, rate, compounding } = calculator;

    if (!depositAmount || !tenure || !rate) {
      toast.error("Enter valid values for calculation.");
      return;
    }

    const maturityAmount = calculateFD(depositAmount, rate, tenure, compounding);
    setCalculator({ ...calculator, maturityAmount });
  };

  return (
    <div className="min-h-screen bg-green-100 flex flex-col items-center p-8">
      <ToastContainer />

      {/* FD Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">Fixed Deposit Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="depositAmount"
            value={formData.depositAmount}
            onChange={handleChange}
            placeholder="Deposit Amount (₹)"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
          <input
            type="number"
            name="tenure"
            value={formData.tenure}
            onChange={handleChange}
            placeholder="Tenure (Years)"
            className="w-full px-3 py-2 border rounded-md"
            required
          />

          <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
            Create FD
          </button>
        </form>
      </div>

      {/* FD Calculator */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">FD Calculator</h2>
        <input
          type="number"
          name="depositAmount"
          value={calculator.depositAmount}
          onChange={(e) => setCalculator({ ...calculator, depositAmount: e.target.value })}
          placeholder="Principal (₹)"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          name="tenure"
          value={calculator.tenure}
          onChange={(e) => setCalculator({ ...calculator, tenure: e.target.value })}
          placeholder="Tenure (Years)"
          className="w-full px-3 py-2 border rounded-md"
        />
        <input
          type="number"
          name="rate"
          value={calculator.rate}
          onChange={(e) => setCalculator({ ...calculator, rate: e.target.value })}
          placeholder="Interest Rate (%)"
          className="w-full px-3 py-2 border rounded-md"
        />

        <button onClick={handleCalculateFD} className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
          Calculate
        </button>

        {calculator.maturityAmount && <p className="mt-4 text-center text-green-700 font-bold">Maturity Amount: ₹{calculator.maturityAmount}</p>}
      </div>
    </div>
  );
};

export default FD;
