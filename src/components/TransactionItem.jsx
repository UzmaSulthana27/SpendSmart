// ❌ ERROR FIX: Replaced external icon import with inline SVG to ensure compilation.
import React from "react";

// --- COLOR PALETTE DEFINITIONS (Using the dark theme context) ---
const COLOR_NAVY = "#1d2e4a";       // Card Background
const COLOR_EMERALD = "#10B981";    // Income
const COLOR_RED = "#E11D48";        // Expense
const COLOR_TEXT_WHITE = "#E5E7EB"; // Primary Text Color
const COLOR_ACCENT_GRAY = "#A0AEC0"; // Lighter gray for categories/dates
// -----------------------------------

// Inline SVG for the trash icon (FiTrash2 equivalent)
const TrashIcon = ({ className, style, onMouseOver, onMouseOut }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className={className}
        style={style}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
    >
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>
);


export default function TransactionItem({ tx, onDelete }) {
  // 💡 FIX: Add defensive check for undefined or null tx prop to prevent "Cannot read properties of undefined" error
  if (!tx || typeof tx.amount === 'undefined') {
      return null; 
  }
    
  const amountColor = tx.type === "income" ? COLOR_EMERALD : COLOR_RED;
  
  return (
    <div 
      // Dark card background, sharp shadow, and padding
      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl shadow-lg transition-shadow duration-300 w-full border border-transparent hover:border-white/10" 
      style={{ backgroundColor: COLOR_NAVY }}
    >
      
      {/* Description & Category */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        
        {/* Description: White text for high contrast */}
        <div className="font-medium" style={{ color: COLOR_TEXT_WHITE }}>
          {tx.description}
        </div>
        
        {/* Category & Date: Lighter accent color */}
        <div className="text-sm" style={{ color: COLOR_ACCENT_GRAY }}>
          {tx.category || "General"} • {new Date(tx.date).toLocaleString()}
        </div>
      </div>

      {/* Amount & Delete */}
      <div className="flex items-center gap-4 mt-2 sm:mt-0">
        <div
          // Amount: Dynamic color based on transaction type
          className={`font-bold text-lg`}
          style={{ color: amountColor }}
        >
          {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
        </div>
        
        {/* Delete Button */}
        <button
          onClick={() => onDelete(tx.id)}
          // Clear hover background, using Red for the hover state
          className="p-2 rounded-full transition-colors duration-200"
          aria-label="Delete"
        >
          <TrashIcon 
            className="w-5 h-5 transition-colors duration-200" 
            style={{ color: COLOR_ACCENT_GRAY }} 
            onMouseOver={e => e.currentTarget.style.color = COLOR_RED}
            onMouseOut={e => e.currentTarget.style.color = COLOR_ACCENT_GRAY}
          />
        </button>
      </div>
    </div>
  );
}
