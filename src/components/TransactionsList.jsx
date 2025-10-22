import React from "react";
import { useExpense } from "../context/ExpenseContext";
import TransactionItem from "./TransactionItem";

export default function TransactionsList() {
  const { transactions = [], removeTransaction } = useExpense();

  function handleDelete(id) {
    if (!confirm("Delete transaction?")) return;
    removeTransaction(id);
  }

  if (!transactions || transactions.length === 0) {
    return <div className="card">No transactions yet.</div>;
  }

  return (
    <div className="space-y-3">
      {transactions.map((t) => (
        <TransactionItem key={t.id} tx={t} onDelete={handleDelete} />
      ))}
    </div>
  );
}