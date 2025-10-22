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
        className={`group flex items-center gap-3 px-3 py-2 rounded-md transition transform duration-200
          ${active ? "bg-white/12 text-white" : "text-white/90 hover:bg-white/6 hover:scale-[1.02]"}
        `}
      >
        <Icon className="text-xl" />
        <span className="hidden sm:inline text-sm font-medium tracking-wide">{label}</span>
        <span className="sr-only">{label}</span>
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-800 via-sky-700 to-emerald-600 shadow-lg">
      <div className="container-max flex items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-3 no-underline" aria-label="SpendSmart home">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/6 transition-transform duration-200 hover:scale-105">
            <FiPieChart className="text-white/90" />
          </div>

          <div>
            <div className="text-white text-lg font-extrabold tracking-tight leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-pink-400 to-indigo-300">
                SpendSmart
              </span>
            </div>
            <div className="text-xs text-white/80 -mt-0.5">Budget • Track • Grow</div>
          </div>
        </Link>

        <nav className="hidden sm:flex items-center gap-2">
          {navLink("/", "Dashboard", FiPieChart)}
          {navLink("/add", "Add", FiPlusCircle)}
          {navLink("/transactions", "Transactions", FiList)}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          <div className="text-sm text-white/80">Balance</div>
          <div
            className={`px-3 py-1 rounded-md font-semibold transition-colors duration-500 ${
              balance >= 0 ? "bg-white/6 text-emerald-200" : "bg-white/6 text-rose-200"
            }`}
            aria-live="polite"
          >
            ${balance.toFixed(2)}
          </div>
        </div>

        {/* mobile toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 rounded-md text-white/95 hover:bg-white/6 transition"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      {/* mobile menu with animated transition */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-72 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2"
        }`}
      >
        <div className="bg-white/4 backdrop-blur-md border-t border-white/6 p-3">
          <div className="flex flex-col gap-2">
            <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/6 text-white">
              <FiPieChart /> <span>Dashboard</span>
            </Link>

            <Link to="/add" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/6 text-white">
              <FiPlusCircle /> <span>Add</span>
            </Link>

            <Link to="/transactions" onClick={() => setOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-white/6 text-white">
              <FiList /> <span>Transactions</span>
            </Link>

            <div className="mt-2 px-3 py-2 text-sm text-white/80">
              Balance: <span className={`font-semibold ${balance >= 0 ? "text-emerald-200" : "text-rose-200"}`}>${balance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}