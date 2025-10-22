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
    <form onSubmit={submit} className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-lg font-semibold">Add Transaction</h2>

      <div className="flex gap-2">
        <button type="button" onClick={() => setType("income")} className={`flex-1 py-2 rounded ${type === "income" ? "bg-green-600 text-white" : "bg-gray-100"}`}>Income</button>
        <button type="button" onClick={() => setType("expense")} className={`flex-1 py-2 rounded ${type === "expense" ? "bg-red-600 text-white" : "bg-gray-100"}`}>Expense</button>
      </div>

      <input className="w-full p-2 border rounded" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="Category (optional)" value={category} onChange={(e) => setCategory(e.target.value)} />
      <input className="w-full p-2 border rounded" placeholder="Amount" type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />

      <div className="flex justify-end">
        <button className="btn-primary" type="submit">Add</button>
      </div>
    </form>
  );
}