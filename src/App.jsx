import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import ChartCard from "./components/ChartCard";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import { ExpenseProvider, useExpense } from "./context/ExpenseContext";

/* Small in-file page components using existing components in /src/components */

// Dashboard View
function DashboardView() {
  const { income, expense, balance, chartData, transactions } = useExpense();
  // Using simplified inline list for recent transactions on the dashboard, 
  // keeping the focus on the main component styles.
  const COLOR_NAVY_TEXT = "#1d2e4a";
  const COLOR_ACCENT_GRAY = "#6B7280";

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SummaryCards income={income} expense={expense} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ChartCard data={chartData} />

        <div className="p-5 rounded-xl shadow-lg border" style={{backgroundColor: '#F9FAFB', borderColor: '#E5E7EB'}}>
          <h3 className="text-xl font-bold mb-4" style={{ color: COLOR_NAVY_TEXT }}>
              Recent Activity
          </h3>
          {transactions.slice(0, 5).length === 0 ? (
            <div className="text-sm" style={{color: COLOR_ACCENT_GRAY}}>No recent transactions.</div>
          ) : (
            <div className="space-y-3">
              {transactions.slice(0, 5).map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg border" style={{backgroundColor: 'white', borderColor: '#F3F4F6'}}>
                  <div>
                    <div className="font-medium" style={{color: COLOR_NAVY_TEXT}}>{t.description}</div>
                    <div className="text-xs" style={{color: COLOR_ACCENT_GRAY}}>{t.category || "—"} • {new Date(t.date).toLocaleDateString()}</div>
                  </div>
                  <div className={`font-semibold ${t.type === "income" ? "text-green-600" : "text-red-600"}`}>
                    {t.type === "income" ? "+" : "-"}${Number(t.amount).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Add Transaction View
function AddView() {
  return (
    <div className="py-8">
      <TransactionForm />
    </div>
  );
}

// Full Transactions View
function TransactionsView() {
  return (
    <div className="max-w-3xl mx-auto space-y-4 py-4">
      <h2 className="text-3xl font-bold" style={{color: '#1d2e4a'}}>All Transactions</h2>
      <TransactionsList />
    </div>
  );
}

// Main App Component
export default function App() {
  return (
    <BrowserRouter>
      <ExpenseProvider>
        <div className="min-h-screen flex flex-col" style={{backgroundColor: '#F9FAFB'}}>
          <Navbar />
          <main className="container mx-auto px-4 py-8 flex-1">
            <Routes>
              {/* Correctly defined routes */}
              <Route path="/" element={<DashboardView />} />
              <Route path="/add" element={<AddView />} />
              <Route path="/transactions" element={<TransactionsView />} />
            </Routes>
          </main>
        </div>
      </ExpenseProvider>
    </BrowserRouter>
  );
}