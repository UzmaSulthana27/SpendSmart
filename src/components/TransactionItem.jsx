import React from "react";
import { FiTrash2 } from "react-icons/fi";

export default function TransactionItem({ tx, onDelete }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white rounded shadow">
      <div>
        <div className="font-medium">{tx.description}</div>
        <div className="text-sm text-gray-500">{tx.category || "—"} • {new Date(tx.date).toLocaleString()}</div>
      </div>

      <div className="flex items-center gap-3">
        <div className={`font-semibold ${tx.type === "income" ? "text-green-600" : "text-red-600"}`}>
          {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
        </div>
        <button onClick={() => onDelete(tx.id)} className="p-2 rounded hover:bg-gray-100" aria-label="Delete">
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}