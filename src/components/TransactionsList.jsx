import React from "react";
import { useExpense } from "../context/ExpenseContext";
import TransactionItem from "./TransactionItem";

// --- COLOR PALETTE DEFINITIONS ---
const COLOR_NAVY_TEXT = "#1d2e4a";      // Dark Navy text color
const COLOR_BORDER = "#E5E7EB";         // Light border color
const COLOR_ACCENT_GRAY = "#6B7280";    // Accent gray for secondary text
// -----------------------------------


export default function TransactionsList() {
  // Destructure transactions and removeTransaction from the ExpenseContext
  const { transactions = [], removeTransaction } = useExpense();

  // Handler function passed to TransactionItem for deletion
  function handleDelete(id) {
    // Standard confirmation dialog before deletion
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    removeTransaction(id);
  }

  // Handle empty state: Display a clear, styled message
  if (!transactions || transactions.length === 0) {
    return (
      <div 
        className="p-8 rounded-xl border-2 border-dashed flex justify-center items-center text-center"
        style={{ 
          borderColor: COLOR_BORDER, 
          color: COLOR_ACCENT_GRAY,
          backgroundColor: '#FAFAFA', // Very light background for contrast
          minHeight: '150px' // Ensure a visible area
        }}
      >
        <span className="text-lg font-medium">
          Looks empty! Start adding your first **Income** or **Expense** transaction. 📝
        </span>
      </div>
    );
  }

  // Main Transaction List View
  return (
    <div 
      // Enhanced container styling
      className="space-y-4 p-4 rounded-xl border"
      style={{ 
        borderColor: COLOR_BORDER,
        backgroundColor: '#F9FAFB', // Slight off-white background to contain the list
      }}
    >
      <h2 className="text-xl font-bold mb-4 px-2" style={{ color: COLOR_NAVY_TEXT }}>
          Recent Transactions
      </h2>
      
      {/* List of TransactionItem components */}
      <div className="space-y-3">
        {transactions.map((t) => (
          // TransactionItem is expected to handle its own key and rendering/animation
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