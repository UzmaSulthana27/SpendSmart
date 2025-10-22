import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext";

export default function TransactionForm({ initialType = "expense" }) {
  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const { addTransaction } = useExpense();
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!desc || !amt || amt <= 0) return alert("Provide description and positive amount");
    addTransaction({ type, amount: amt, description: desc, category, date: new Date().toISOString() });
    navigate("/transactions");
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-5">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Add Transaction</h2>

      {/* Type Toggle */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-2 rounded-lg font-medium transition-transform duration-200 ${
            type === "income" ? "bg-green-600 text-white shadow-md scale-105" : "bg-gray-100 text-gray-700 hover:bg-green-100"
          }`}
        >
          Income
        </button>
        <button
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-2 rounded-lg font-medium transition-transform duration-200 ${
            type === "expense" ? "bg-red-600 text-white shadow-md scale-105" : "bg-gray-100 text-gray-700 hover:bg-red-100"
          }`}
        >
          Expense
        </button>
      </div>

      {/* Inputs */}
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
        placeholder="Amount"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-indigo-700 transition-all transform hover:scale-105"
        >
          Add
        </button>
      </div>
    </form>
  );
}
