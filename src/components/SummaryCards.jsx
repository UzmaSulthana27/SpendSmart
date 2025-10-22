import React from "react";

export default function SummaryCards({ income = 0, expense = 0 }) {
  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="card">
        <div className="text-sm text-gray-500">Balance</div>
        <div className="text-2xl font-semibold">${balance.toFixed(2)}</div>
      </div>

      <div className="card">
        <div className="text-sm text-gray-500">Income</div>
        <div className="text-2xl font-semibold text-green-600">${income.toFixed(2)}</div>
      </div>

      <div className="card">
        <div className="text-sm text-gray-500">Expense</div>
        <div className="text-2xl font-semibold text-red-600">${expense.toFixed(2)}</div>
      </div>
    </div>
  );
}