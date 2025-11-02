import React from "react";
import { useExpense } from "../context/ExpenseContext"; // 👈 New Import

// --- COLOR PALETTE DEFINITIONS (Light Card Theme) ---
const COLOR_CARD_BASE = "#FFFFFF";       
const COLOR_NAVY = "#1d2e4a";             
const COLOR_SKY_BLUE = "#0284C7";         
const COLOR_EMERALD = "#10B981";          
const COLOR_RED = "#E11D48";              
const COLOR_TEXT_DARK = COLOR_NAVY;       
const COLOR_ICON_BACKGROUND = "#F3F4F6";  
// -----------------------------------

/**
 * Inline SVG Icons (Kept for completeness)
 */

// FiDollarSign SVG for Balance
const DollarSignIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

// FiArrowUpCircle SVG for Income
const ArrowUpCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="16 12 12 8 8 12"></polyline>
    <line x1="12" y1="16" x2="12" y2="8"></line>
  </svg>
);

// FiArrowDownCircle SVG for Expense
const ArrowDownCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="8 12 12 16 16 12"></polyline>
    <line x1="12" y1="8" x2="12" y2="16"></line>
  </svg>
);


export default function SummaryCards({ income = 0, expense = 0 }) {
  // 👈 Access the dynamic currency symbol
  const { currency } = useExpense();
  const balance = income - expense;

  const cards = [
    // ... (card definitions remain the same) ...
    { title: "Net Balance", value: balance, icon: <DollarSignIcon className="w-6 h-6" style={{ color: COLOR_SKY_BLUE }} />, color: COLOR_SKY_BLUE, border: COLOR_SKY_BLUE, },
    { title: "Total Income", value: income, icon: <ArrowUpCircleIcon className="w-6 h-6" style={{ color: COLOR_EMERALD }} />, color: COLOR_EMERALD, border: COLOR_EMERALD, },
    { title: "Total Expense", value: expense, icon: <ArrowDownCircleIcon className="w-6 h-6" style={{ color: COLOR_RED }} />, color: COLOR_RED, border: COLOR_RED, },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        const valueColor = idx === 0 
          ? (card.value >= 0 ? COLOR_EMERALD : COLOR_RED)
          : card.color;
        
        const borderColor = card.border;
        const delay = `${0.1 + idx * 0.15}s`; // Staggered delay for animation

        return (
          <div
            key={idx}
            className={`flex items-center gap-4 p-5 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl border border-gray-200 animate-slide-in`} 
            style={{ 
              backgroundColor: COLOR_CARD_BASE,
              color: COLOR_TEXT_DARK,
              borderLeft: `5px solid ${borderColor}`,
              // Animation styles
              animation: `slideInFromTop 0.5s ease-out forwards`,
              animationDelay: delay,
              opacity: 0,
            }}
          >
            {/* ... (Icon container) ... */}
            <div className="flex items-center justify-center p-3 rounded-full" 
              style={{ backgroundColor: COLOR_ICON_BACKGROUND }}>
              {card.icon}
            </div>
            <div>
              <div className={`text-sm font-medium mb-1`} style={{ color: COLOR_TEXT_DARK }}>
                {card.title}
              </div>
              <div className={`text-2xl font-bold transition-colors duration-300`} style={{ color: valueColor }}>
                {/* 👈 Use dynamic currency symbol */}
                {currency.symbol}{card.value.toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}