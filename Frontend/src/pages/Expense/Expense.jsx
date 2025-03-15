import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const categories = ["Food", "Bills", "Shopping", "Entertainment", "Travel"];

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(5000);
  const [showChartModal, setShowChartModal] = useState(false);

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem("expenses"));
    const storedBudget = JSON.parse(localStorage.getItem("budget"));
    if (storedExpenses) setExpenses(storedExpenses);
    if (storedBudget) setBudget(storedBudget);
  }, []);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("budget", JSON.stringify(budget));
  }, [expenses, budget]);

  const addExpense = (expense) => {
    setExpenses([...expenses, { ...expense, id: Date.now() }]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col items-center p-6">
      <motion.h1 className="text-4xl font-bold mb-4 text-gray-800" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        💰 Expense Tracker
      </motion.h1>

      <div className="flex space-x-4">
        <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={() => setShowChartModal(true)}>
          View Charts 📊
        </button>
      </div>

      <ExpenseTracker expenses={expenses} addExpense={addExpense} deleteExpense={deleteExpense} budget={budget} setBudget={setBudget} />

      {showChartModal && <ChartModal expenses={expenses} onClose={() => setShowChartModal(false)} />}
    </div>
  );
};

const ExpenseTracker = ({ expenses, addExpense, deleteExpense, budget, setBudget }) => {
    const [newExpense, setNewExpense] = useState({ name: "", amount: "", category: "", date: "" });
  
    const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
    const remainingBudget = budget - totalSpent;
  
    const handleAddExpense = () => {
      const amount = Number(newExpense.amount);
  
      if (!newExpense.name || !newExpense.amount || !newExpense.category || !newExpense.date) {
        alert("Please fill all fields!");
        return;
      }
  
      if (amount <= 0) {
        alert("Expense amount must be greater than zero!");
        return;
      }
  
      if (amount > remainingBudget) {
        alert("Insufficient budget! Reduce the expense amount.");
        return;
      }
  
      addExpense(newExpense);
      setNewExpense({ name: "", amount: "", category: "", date: "" });
    };
  
    const handleBudgetChange = (e) => {
      const newBudget = Number(e.target.value);
      if (newBudget < totalSpent) {
        alert("Budget cannot be less than total expenses!");
        return;
      }
      setBudget(newBudget);
    };
  
    return (
      <motion.div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl mt-6"
        initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
        
        <h2 className="text-2xl font-semibold text-center mb-4">Set Budget</h2>
        <input 
          type="number" 
          className="border p-2 rounded w-full mb-4" 
          value={budget} 
          onChange={handleBudgetChange} 
          min={totalSpent} 
        />
  
        <h2 className="text-2xl font-semibold text-center mb-4">Add New Expense</h2>
        <div className="flex flex-col space-y-3">
          <input type="text" placeholder="Expense Name" className="border p-2 rounded" value={newExpense.name} onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })} />
          <input type="number" placeholder="Amount" className="border p-2 rounded" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} min="1" />
          <select className="border p-2 rounded" value={newExpense.category} onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}>
            <option value="">Select Category</option>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <input type="date" className="border p-2 rounded" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} />
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition" onClick={handleAddExpense}>Add Expense</button>
        </div>
  
        <h2 className="text-xl font-semibold mt-6">Budget Summary</h2>
        <p>Total Spent: ₹{totalSpent}</p>
        <p>Remaining: ₹{remainingBudget}</p>
      </motion.div>
    );
  };

const ChartModal = ({ expenses, onClose }) => {
    const categoryTotals = categories.map(cat =>
      expenses.filter(exp => exp.category === cat).reduce((sum, exp) => sum + Number(exp.amount), 0)
    );
  
    const months = ["Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
    const dummyData = [1200, 1500, 1100, 1800, 1600, 2000];
  
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-75 px-4">
        <motion.div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md sm:max-w-lg md:max-w-xl relative overflow-y-auto max-h-[90vh]"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.3 }}>
          
          {/* Close Button */}
          <button className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-xl"
            onClick={onClose}
          >
            ×
          </button>
  
          <h2 className="text-xl font-semibold text-center mb-3">📊 Expense Analysis</h2>
  
          <div className="grid grid-cols-1 gap-4">
            <div className="p-2">
              <h3 className="text-sm font-semibold text-center mb-1">Expense Distribution</h3>
              <Pie data={{ labels: categories, datasets: [{ data: categoryTotals, backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0", "#9966ff"] }] }} />
            </div>
            <div className="p-2">
              <h3 className="text-sm font-semibold text-center mb-1">Monthly Trend</h3>
              <Line data={{ labels: months, datasets: [{ label: "Expenses", data: dummyData, borderColor: "#36a2eb", backgroundColor: "rgba(54, 162, 235, 0.2)", fill: true }] }} />
            </div>
            <div className="p-2">
              <h3 className="text-sm font-semibold text-center mb-1">Category-wise Expenses</h3>
              <Bar data={{ labels: categories, datasets: [{ label: "Amount Spent", data: categoryTotals, backgroundColor: "#36a2eb" }] }} />
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

export default Expense;
