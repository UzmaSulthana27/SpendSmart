import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SummaryCards from "./components/SummaryCards";
import ChartCard from "./components/ChartCard";
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";
import { ExpenseProvider, useExpense } from "./context/ExpenseContext";

/* Small in-file page components using existing components in /src/components */
function DashboardView() {
  const { income, expense, balance, chartData, transactions } = useExpense();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <SummaryCards income={income} expense={expense} />

      <div className="card">
        <ChartCard data={chartData} />
      </div>

      <div className="card">
        <h3 className="font-medium mb-2">Recent Transactions</h3>
        {transactions.length === 0 ? (
          <div className="text-sm text-gray-500">No transactions yet.</div>
        ) : (
          <div className="space-y-3">
            {transactions.slice(0, 6).map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 bg-white rounded shadow">
                <div>
                  <div className="font-medium">{t.description}</div>
                  <div className="text-sm text-gray-500">{t.category || "—"} • {new Date(t.date).toLocaleString()}</div>
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
  );
}

function AddView() {
  return (
    <div>
      <TransactionForm />
    </div>
  );
}

function TransactionsView() {
  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Transactions</h2>
      <TransactionsList />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ExpenseProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="container-max p-4 flex-1">
            <Routes>
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