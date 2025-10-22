import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TransactionItem({ tx, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 w-full">
      
      {/* Description & Category */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        <div className="font-medium text-gray-800">{tx.description}</div>
        <div className="text-sm text-gray-500">
          {tx.category || "—"} • {new Date(tx.date).toLocaleString()}
        </div>
      </div>

      {/* Amount & Delete */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div
          className={`font-semibold text-lg ${
            tx.type === "income" ? "text-green-600" : "text-red-600"
          }`}
        >
          {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
        </div>
        <button
          onClick={() => onDelete(tx.id)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
          aria-label="Delete"
        >
          <FiTrash2 className="text-gray-600 hover:text-red-600 transition-colors duration-200" />
        </button>
      </div>
    </div>
  );
}
