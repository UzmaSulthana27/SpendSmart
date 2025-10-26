import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX, FiPieChart, FiPlusCircle, FiList } from "react-icons/fi";
import { useExpense } from "../context/ExpenseContext";
import { motion, AnimatePresence } from "framer-motion"; // 👈 Import Framer Motion

// --- COLOR PALETTE DEFINITIONS ---
const COLOR_NAVY = "#0F172A";       // Primary Base/Header
const COLOR_SKY_BLUE = "#0284C7";    // Secondary Action/Brand Accent (SpendSmart Color)
const COLOR_EMERALD = "#10B981";     // Income (Positive)
const COLOR_RED = "#E11D48";         // Expense (Negative)
const COLOR_TEXT_WHITE = "#E5E7EB";  // Primary Text Color
const COLOR_LINK_HOVER = "#1D2E4A";  // A slightly lighter navy for hover state background
// -----------------------------------

// NOTE: menuVariants is NOT USED for the mobile menu body in this version, 
// but is kept for the animated menu icon.
const menuVariants = {
  hidden: { rotate: 0 },
  visible: { rotate: 90 },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const loc = useLocation();
  const { balance } = useExpense();

  // Scroll effect (Kept for header color change)
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // NOTE: Body scroll lock is removed to respect the original code's simplicity.

  // Original navLink function, updated with new colors and hover effects
  const navLink = (to, label, Icon) => {
    const active = loc.pathname === to;
    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
        <Link
          to={to}
          onClick={() => setOpen(false)}
          className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-300 ${
            active 
              ? `bg-[${COLOR_LINK_HOVER}] font-semibold` 
              : `hover:bg-[${COLOR_LINK_HOVER}]`
          }`}
        >
          {/* Apply Sky Blue to active link elements */}
          <Icon className="text-xl" style={{ color: active ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }} />
          <span className="hidden sm:inline text-sm font-medium" style={{ color: active ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }}>
            {label}
          </span>
        </Link>
      </motion.div>
    );
  };

  return (
    <header
      // Apply Deep Navy colors to the header
      style={{
        backgroundColor: scrolled ? COLOR_NAVY : "#1d2e4a",
      }}
      className={`sticky top-0 z-50 transition-all duration-300 shadow-2xl backdrop-blur-md w-full border-b border-white/10`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full h-16">
          
          {/* Website Name - Top Left */}
          <Link
            to="/"
            className="flex items-center gap-2 ml-2 sm:ml-0 hover:scale-[1.03] transition-transform duration-300"
          >
            {/* Logo: White icon for contrast */}
            <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 p-1`}>
              <FiPieChart className={`text-xl`} style={{ color: '#FFFFFF' }} />
            </div>
            <div className="flex flex-col leading-none">
              {/* Brand Name: Sky Blue */}
              <div className={`text-xl font-extrabold tracking-tight`}>
                <span style={{ color: COLOR_SKY_BLUE }}>
                  SpendSmart
                </span>
              </div>
              {/* Tagline: Sky Blue */}
              <div className={`text-[10px] italic hidden sm:block`} style={{ color: COLOR_SKY_BLUE }}>Budget • Track • Grow</div>
            </div>
          </Link>

          {/* Nav Links + Balance - Top Right (Desktop) */}
          <div className="hidden sm:flex items-center gap-6 mr-2 sm:mr-0">
            <nav className="flex items-center gap-3">
              {navLink("/", "Dashboard", FiPieChart)}
              {navLink("/add", "Add", FiPlusCircle)}
              {navLink("/transactions", "Transactions", FiList)}
            </nav>

            <div className="flex items-center gap-3 border-l border-white/20 pl-4">
              {/* Balance Label: Sky Blue */}
              <div className="text-sm" style={{ color: COLOR_SKY_BLUE }}>Balance</div>
              {/* Balance Pill: Green/Red colors */}
              <div
                style={{
                  backgroundColor: balance >= 0 ? COLOR_EMERALD : COLOR_RED,
                }}
                className={`px-3 py-1 rounded-md font-semibold text-white`}
              >
                ${balance.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Mobile Balance (Always visible in the header) */}
          <div className="flex items-center sm:hidden">
            <div
                style={{
                  backgroundColor: balance >= 0 ? COLOR_EMERALD : COLOR_RED,
                }}
                className={`px-2 py-1 mr-2 rounded-lg text-sm font-bold text-white transition-colors duration-500`}
            >
                ${balance.toFixed(0)}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex justify-end mr-2">
            <button
              onClick={() => setOpen((v) => !v)}
              className={`p-2 rounded-md text-white/95 hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[${COLOR_SKY_BLUE}]`}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {/* Framer Motion Icon Rotation */}
              <motion.div
                key={open ? "open" : "closed"}
                initial="hidden"
                animate={open ? "visible" : "hidden"}
                variants={menuVariants}
                transition={{ duration: 0.3 }}
              >
                {open ? <FiX size={24} /> : <FiMenu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN - Original Logic with Updated Colors */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          open ? "max-h-72 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-3"
        }`}
      >
        {/* Mobile menu background color update */}
        <div className={`bg-[${COLOR_NAVY}]/95 backdrop-blur-md border-t border-white/10 p-3`}>
          <div className="flex flex-col gap-2">
            
            {/* Link 1: Dashboard */}
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded transition"
            >
                <FiPieChart style={{ color: loc.pathname === '/' ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }} /> 
                <span style={{ color: loc.pathname === '/' ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }}>Dashboard</span>
            </Link>

            {/* Link 2: Add */}
            <Link
              to="/add"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded transition"
            >
                <FiPlusCircle style={{ color: loc.pathname === '/add' ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }} /> 
                <span style={{ color: loc.pathname === '/add' ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }}>Add</span>
            </Link>

            {/* Link 3: Transactions */}
            <Link
              to="/transactions"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-3 py-2 rounded transition"
            >
                <FiList style={{ color: loc.pathname === '/transactions' ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }} /> 
                <span style={{ color: loc.pathname === '/transactions' ? COLOR_SKY_BLUE : COLOR_TEXT_WHITE }}>Transactions</span>
            </Link>

            {/* Mobile Balance Display */}
            <div className="mt-2 px-3 py-2 text-sm" style={{ color: COLOR_SKY_BLUE }}>
              Balance:{" "}
              <span
                style={{
                  color: balance >= 0 ? COLOR_EMERALD : COLOR_RED,
                }}
                className={`font-semibold`}
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