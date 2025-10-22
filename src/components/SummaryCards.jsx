import React from "react";
import { FiDollarSign, FiArrowUpCircle, FiArrowDownCircle } from "react-icons/fi";

export default function SummaryCards({ income = 0, expense = 0 }) {
  const balance = income - expense;

  const cards = [
    {
      title: "Balance",
      value: balance,
      icon: <FiDollarSign className="text-gray-700 w-6 h-6" />,
      bg: "bg-white",
      color: "text-gray-800",
    },
    {
      title: "Income",
      value: income,
      icon: <FiArrowUpCircle className="text-green-600 w-6 h-6" />,
      bg: "bg-white",
      color: "text-green-600",
    },
    {
      title: "Expense",
      value: expense,
      icon: <FiArrowDownCircle className="text-red-600 w-6 h-6" />,
      bg: "bg-white",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`flex items-center gap-4 p-5 rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105 hover:shadow-lg ${card.bg}`}
        >
          <div className="p-3 rounded-full bg-gray-100 flex items-center justify-center">
            {card.icon}
          </div>
          <div>
            <div className={`text-sm font-medium ${card.color} mb-1`}>{card.title}</div>
            <div className={`text-2xl font-bold ${card.color}`}>
              ${card.value.toFixed(2)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
