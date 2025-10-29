import React from "react";
import { Link } from "react-router-dom"; // 👈 Import Link
import { useExpense } from "../context/ExpenseContext";
import TransactionItem from "./TransactionItem";

// --- COLOR PALETTE DEFINITIONS ---
const COLOR_NAVY_TEXT = "#1d2e4a";      
const COLOR_BORDER = "#E5E7EB";         
const COLOR_ACCENT_GRAY = "#6B7280";    
const COLOR_SKY_BLUE = "#0284C7";       
const COLOR_SKY_BLUE_HOVER = "#0C4A6E"; 
// -----------------------------------


export default function TransactionsList() {
  const { transactions = [], removeTransaction } = useExpense();

  function handleDelete(id) {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    removeTransaction(id);
  }

  // Handle empty state: Display a clear, styled, ACTIONABLE message
  if (!transactions || transactions.length === 0) {
    return (
      <div 
        className="p-8 rounded-xl border-2 border-dashed flex flex-col justify-center items-center text-center space-y-4 transition-opacity duration-500 animate-fade-in"
        style={{ 
          borderColor: COLOR_BORDER, 
          color: COLOR_ACCENT_GRAY,
          backgroundColor: '#FAFAFA', 
          minHeight: '180px',
          animation: `fadeIn 0.5s ease-out forwards`,
          opacity: 0,
        }}
      >
        <span className="text-lg font-medium">
          Looks empty! Start managing your finances now. 🚀
        </span>
        
        {/* FIX: Link component target is now /add to match App.js routes */}
        <Link 
          to="/add" 
          className="px-6 py-2 rounded-lg font-semibold text-white transition-colors duration-200 shadow-md"
          style={{ 
            backgroundColor: COLOR_SKY_BLUE,
            color: 'white',
          }}
          onMouseOver={e => e.currentTarget.style.backgroundColor = COLOR_SKY_BLUE_HOVER}
          onMouseOut={e => e.currentTarget.style.backgroundColor = COLOR_SKY_BLUE}
        >
          Add New Transaction
        </Link>
      </div>
    );
  }

  // Main Transaction List View
  return (
    <div 
      className="space-y-4 p-4 rounded-xl border animate-slide-in"
      style={{ 
        borderColor: COLOR_BORDER,
        backgroundColor: '#F9FAFB',
        animation: `slideInFromTop 0.5s ease-out forwards`,
        animationDelay: '0.1s',
        opacity: 0, 
      }}
    >
      <h2 className="text-xl font-bold mb-4 px-2" style={{ color: COLOR_NAVY_TEXT }}>
          Recent Transactions
      </h2>
      
      <div className="space-y-3">
        {transactions.map((t) => (
          <TransactionItem 
            key={t.id} 
            tx={t} 
            onDelete={handleDelete} 
          />
        ))}
      </div>
    </div>
  );
}