import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiPieChart, FiPlusCircle, FiList } from "react-icons/fi";
import { useExpense } from "../context/ExpenseContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const { balance } = useExpense();

  const navLink = (to, label, Icon) => (
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className={`flex items-center gap-2 px-3 py-2 rounded-md ${
        loc.pathname === to ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );

  return (
    <header className="bg-white shadow sticky top-0 z-20">
      <div className="container-max flex items-center justify-between py-3">
        <Link to="/" className="text-lg font-semibold">SpendSmart</Link>

        <nav className="hidden sm:flex items-center gap-2">
          {navLink("/", "Dashboard", FiPieChart)}
          {navLink("/add", "Add", FiPlusCircle)}
          {navLink("/transactions", "Transactions", FiList)}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <div className="text-sm text-gray-500">Balance</div>
          <div className={`font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>${balance.toFixed(2)}</div>
        </div>

        <div className="sm:hidden">
          <button
            onClick={() => setOpen(v => !v)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {open ? <FiX size={20}/> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden bg-white border-t">
          <div className="flex flex-col p-2 gap-1">
            <Link to="/" onClick={()=>setOpen(false)} className="px-3 py-2 rounded hover:bg-gray-100">Dashboard</Link>
            <Link to="/add" onClick={()=>setOpen(false)} className="px-3 py-2 rounded hover:bg-gray-100">Add</Link>
            <Link to="/transactions" onClick={()=>setOpen(false)} className="px-3 py-2 rounded hover:bg-gray-100">Transactions</Link>
            <div className="px-3 py-2 text-sm text-gray-700">Balance: <span className={`font-semibold ${balance >= 0 ? "text-green-600" : "text-red-600"}`}>${balance.toFixed(2)}</span></div>
          </div>
        </div>
      )}
    </header>
  );
}