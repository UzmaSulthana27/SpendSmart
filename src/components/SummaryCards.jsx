import React from "react";

// --- COLOR PALETTE DEFINITIONS ---
const COLOR_NAVY = "#1d2e4a"; // Primary Base/Header (User specified)
const COLOR_SKY_BLUE = "#0284C7"; // Secondary Action/Brand Accent (SpendSmart Color)
const COLOR_EMERALD = "#10B981"; // Income (Positive)
const COLOR_RED = "#E11D48";     // Expense (Negative)
const COLOR_TEXT_WHITE = "#E5E7EB"; // Primary Text Color
const COLOR_LINK_HOVER = "#1D2E4A"; // Icon background/Shadow base
// -----------------------------------

/**
 * Inline SVG Icons (Replacing react-icons/fi for compilation safety)
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
  const balance = income - expense;

  const cards = [
    {
      title: "Net Balance",
      value: balance,
      // Icon color is white for balance against dark background
      icon: <DollarSignIcon className="w-6 h-6" style={{ color: COLOR_TEXT_WHITE }} />,
      color: COLOR_SKY_BLUE,
      border: COLOR_SKY_BLUE,
    },
    {
      title: "Total Income",
      value: income,
      icon: <ArrowUpCircleIcon className="w-6 h-6" style={{ color: COLOR_EMERALD }} />,
      color: COLOR_EMERALD,
      border: COLOR_EMERALD,
    },
    {
      title: "Total Expense",
      value: expense,
      icon: <ArrowDownCircleIcon className="w-6 h-6" style={{ color: COLOR_RED }} />,
      color: COLOR_RED,
      border: COLOR_RED,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {cards.map((card, idx) => {
        // Determine value color: Green for positive balance, Red for negative, 
        // or the specific color for Income/Expense cards.
        const valueColor = idx === 0 
          ? (card.value >= 0 ? COLOR_EMERALD : COLOR_RED)
          : card.color;
        
        // Use the defined border color
        const borderColor = card.border;

        return (
          <div
            key={idx}
            className={`flex items-center gap-4 p-5 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl`}
            style={{ 
              backgroundColor: COLOR_NAVY, // Use the user-specified navy color
              color: COLOR_TEXT_WHITE, 
              borderLeft: `5px solid ${borderColor}` // Colored strip on the left
            }}
          >
            {/* Icon container - clean dark background */}
            <div className="flex items-center justify-center p-3 rounded-full shadow-inner" 
                 style={{ backgroundColor: COLOR_LINK_HOVER }}>
              {card.icon}
            </div>
            <div>
              {/* Title color is uniform white/light gray */}
              <div className={`text-sm font-medium mb-1`} style={{ color: COLOR_TEXT_WHITE }}>
                {card.title}
              </div>
              {/* Value color is dynamically set */}
              <div className={`text-2xl font-bold transition-colors duration-300`} style={{ color: valueColor }}>
                ${card.value.toFixed(2)}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
