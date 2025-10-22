import React, { createContext, useContext, useEffect, useState } from "react";
import { loadTransactions, addTransaction as storeAdd, removeTransaction as storeRemove } from "../lib/store";

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(loadTransactions());
  }, []);

  function addTransaction(tx) {
    const updated = storeAdd(tx);
    setTransactions(updated);
  }

  function removeTransaction(id) {
    const updated = storeRemove(id);
    setTransactions(updated);
  }

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, n) => s + Number(n.amount), 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, n) => s + Number(n.amount), 0);

  const chartData = [
    { name: "Income", value: +income.toFixed(2) },
    { name: "Expense", value: +expense.toFixed(2) },
  ];

  const value = {
    transactions,
    addTransaction,
    removeTransaction,
    income,
    expense,
    balance: income - expense,
    chartData,
  };

  return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
}

export function useExpense() {
  const ctx = useContext(ExpenseContext);
  if (!ctx) throw new Error("useExpense must be used within ExpenseProvider");
  return ctx;
}