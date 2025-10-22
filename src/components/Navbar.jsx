import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiPieChart, FiPlusCircle, FiList } from "react-icons/fi";
import { useExpense } from "../context/ExpenseContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const { balance } = useExpense();

  const navLink = (to, label, Icon) => {
    const active = loc.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setOpen(false)}
        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 hover:scale-105 ${
          active ? "bg-white/20 text-white font-semibold" : "text-white/90 hover:bg-white/10"
        }`}
      >
        <Icon className="text-xl" />
        <span className="hidden sm:inline text-sm font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-indigo-900 via-sky-800 to-emerald-700 shadow-lg backdrop-blur-md border-b border-white/10 w-full">
      <div className="flex justify-between items-center w-full h-16">
        {/* Website Name - Top Left */}
        <Link
          to="/"
          className="flex items-center gap-3 ml-2 sm:ml-4 hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10">
            <FiPieChart className="text-white/90 text-xl" />
          </div>
          <div className="flex flex-col">
            <div className="text-white text-lg font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300">
                SpendSmart
              </span>
            </div>
            <div className="text-xs text-white/80">Budget • Track • Grow</div>
          </div>
        </Link>

        {/* Nav Links + Balance - Top Right */}
        <div className="hidden sm:flex items-center gap-6 mr-2 sm:mr-4">
          <nav className="flex items-center gap-3">
            {navLink("/", "Dashboard", FiPieChart)}
            {navLink("/add", "Add", FiPlusCircle)}
            {navLink("/transactions", "Transactions", FiList)}
          </nav>

          <div className="flex items-center gap-3 border-l border-white/20 pl-4">
            <div className="text-sm text-white/80">Balance</div>
            <div
              className={`px-3 py-1 rounded-md font-semibold ${
                balance >= 0 ? "bg-white/10 text-emerald-200" : "bg-white/10 text-rose-200"
              }`}
            >
              ${balance.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="sm:hidden flex justify-end mr-2">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-white/95 hover:bg-white/10 transition-all duration-300"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-72 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"
        }`}
      >
        <div className="bg-white/10 backdrop-blur-md border-t border-white/10 p-3">
          <div className="flex flex-col gap-2">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 text-white transition"
            >
              <FiPieChart /> <span>Dashboard</span>
            </Link>

            <Link
              to="/add"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 text-white transition"
            >
              <FiPlusCircle /> <span>Add</span>
            </Link>

            <Link
              to="/transactions"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/10 text-white transition"
            >
              <FiList /> <span>Transactions</span>
            </Link>

            <div className="mt-2 px-3 py-2 text-sm text-white/80">
              Balance:{" "}
              <span
                className={`font-semibold ${
                  balance >= 0 ? "text-emerald-200" : "text-rose-200"
                }`}
              >
                ${balance.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
