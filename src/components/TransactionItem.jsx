import React from "react";
import { useExpense } from "../context/ExpenseContext"; // 👈 New Import

// --- COLOR PALETTE DEFINITIONS (Light Card Theme) ---
const COLOR_CARD_BASE = "#FFFFFF";        
const COLOR_NAVY_TEXT = "#1d2e4a";        
const COLOR_EMERALD = "#10B981";          
const COLOR_RED = "#E11D48";              
const COLOR_ACCENT_GRAY = "#6B7280";      
const COLOR_LIGHT_HOVER = "#F3F4F6";      
const COLOR_BORDER_DEFAULT = "#E5E7EB";   
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
    // 👈 Access the dynamic currency symbol
    const { currency } = useExpense(); 

    if (!tx || typeof tx.amount === 'undefined') {
        return null; 
    }
    
    const amountColor = tx.type === "income" ? COLOR_EMERALD : COLOR_RED;
    
    return (
      <div 
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 w-full border" 
        style={{ 
          backgroundColor: COLOR_CARD_BASE,
          borderColor: COLOR_BORDER_DEFAULT,
          // Slide-in animation for list entry
          animation: 'slideInFromTop 0.5s ease-out',
        }}
      >
        
        {/* Description & Category */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <div className="font-medium" style={{ color: COLOR_NAVY_TEXT }}>
            {tx.description}
          </div>
          <div className="text-sm" style={{ color: COLOR_ACCENT_GRAY }}>
            {tx.category || "General"} • {new Date(tx.date).toLocaleString()}
          </div>
        </div>

        {/* Amount & Delete */}
        <div className="flex items-center gap-4 mt-2 sm:mt-0">
          <div
            className={`font-bold text-lg transition-colors duration-300`}
            style={{ color: amountColor }}
          >
            {/* 👈 Use dynamic currency symbol */}
            {tx.type === "income" ? "+" : "-"}{currency.symbol}{Number(tx.amount).toFixed(2)}
          </div>
          
          <button
            onClick={() => onDelete(tx.id)}
            className="p-2 rounded-full transition-colors duration-200"
            style={{ color: COLOR_ACCENT_GRAY }}
            aria-label="Delete"
          >
            <TrashIcon 
              className="w-5 h-5 transition-transform duration-200 hover:scale-110"
              style={{ color: COLOR_ACCENT_GRAY }} 
              onMouseOver={e => {
                e.currentTarget.style.color = COLOR_RED;
                e.currentTarget.parentElement.style.backgroundColor = COLOR_LIGHT_HOVER;
              }}
              onMouseOut={e => {
                e.currentTarget.style.color = COLOR_ACCENT_GRAY;
                e.currentTarget.parentElement.style.backgroundColor = 'transparent';
              }}
            />
          </button>
        </div>
      </div>
    );
}