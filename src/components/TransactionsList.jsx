import React, { useEffect, useState } from "react";
import { loadTransactions, removeTransaction } from "../lib/store";
import TransactionItem from "./TransactionItem";

export default function TransactionsList() {
  const [txs, setTxs] = useState([]);

  useEffect(() => setTxs(loadTransactions()), []);

  function handleDelete(id) {
    if (!confirm("Delete transaction?")) return;
    setTxs(removeTransaction(id));
  }

  if (txs.length === 0) {
    return <div className="card">No transactions yet.</div>;
  }

  return (
    <div className="space-y-3">
      {txs.map((t) => (
        <TransactionItem key={t.id} tx={t} onDelete={handleDelete} />
      ))}
    </div>
  );
}