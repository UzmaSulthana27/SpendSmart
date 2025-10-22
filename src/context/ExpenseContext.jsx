import React, { createContext, useContext, useEffect, useState } from "react";

const KEY = "spendsmart_transactions";

function loadTransactionsFromStorage() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveTransactionsToStorage(list) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // ignore write errors
  }
}

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

const ExpenseContext = createContext(null);

export function ExpenseProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    setTransactions(loadTransactionsFromStorage());
  }, []);

  function addTransaction(tx) {
    const newTx = { id: generateId(), ...tx };
    const updated = [newTx, ...transactions];
    setTransactions(updated);
    saveTransactionsToStorage(updated);
    return updated;
  }

  function removeTransaction(id) {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    saveTransactionsToStorage(updated);
    return updated;
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