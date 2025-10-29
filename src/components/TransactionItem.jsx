import React from "react";

// --- COLOR PALETTE DEFINITIONS (Light Card Theme) ---
const COLOR_CARD_BASE = "#FFFFFF";        // White card background
const COLOR_NAVY_TEXT = "#1d2e4a";        // Dark Navy text color
const COLOR_EMERALD = "#10B981";          // Income (Vibrant Green)
const COLOR_RED = "#E11D48";              // Expense (Vibrant Red)
const COLOR_ACCENT_GRAY = "#6B7280";      // Darker gray for categories/dates
const COLOR_LIGHT_HOVER = "#F3F4F6";      // Light gray for hover background
const COLOR_BORDER_DEFAULT = "#E5E7EB";   // Light border color
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

// --- CSS Keyframes for Slide-In/Fade-In (usually in an external CSS file) ---
// Note: In a real project, define these keyframes in your index.css or global stylesheet.
// For this example, we assume this animation class is available globally via Tailwind configuration.
/*
  @keyframes slideInFromTop {
    0% { transform: translateY(-20px); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-slide-in {
    animation: slideInFromTop 0.5s ease-out;
  }
*/


export default function TransactionItem({ tx, onDelete }) {
  
    if (!tx || typeof tx.amount === 'undefined') {
        return null; 
    }
    
    const amountColor = tx.type === "income" ? COLOR_EMERALD : COLOR_RED;
    
    return (
      <div 
        // 1. ANIMATION CLASS ADDED: 'animate-slide-in' (Requires global CSS definition)
        // 2. White card background, subtle shadow, responsive layout
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl shadow-md transition-all duration-300 w-full border animate-slide-in" 
        style={{ 
          backgroundColor: COLOR_CARD_BASE,
          borderColor: COLOR_BORDER_DEFAULT,
          // --- Fallback/Inline style for animation (Less ideal, but for demonstration) ---
          animation: 'slideInFromTop 0.5s ease-out',
        }}
      >
        
        {/* Description & Category */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
          
          {/* Description: Dark Navy text for high contrast */}
          <div className="font-medium" style={{ color: COLOR_NAVY_TEXT }}>
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
            className={`font-bold text-lg transition-colors duration-300`}
            style={{ color: amountColor }}
          >
            {tx.type === "income" ? "+" : "-"}${Number(tx.amount).toFixed(2)}
          </div>
          
          {/* Delete Button with Hover Effect (Dynamic) */}
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

