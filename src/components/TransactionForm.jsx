import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext";
import { motion } from "framer-motion"; // Import Framer Motion

// Define animation variants for the form elements
const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function TransactionForm({ initialType = "expense" }) {
  const [type, setType] = useState(initialType);
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const { addTransaction } = useExpense();
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    const amt = parseFloat(amount);
    if (!desc || !amt || amt <= 0) return alert("Provide description and positive amount");
    addTransaction({ type, amount: amt, description: desc, category, date: new Date().toISOString() });
    navigate("/transactions");
  }

  // Improved responsiveness: max-w-sm for smaller screens, max-w-xl for medium/large
  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={submit}
      className="max-w-sm sm:max-w-md lg:max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-2xl space-y-5" // Added larger shadow and rounded-2xl
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-indigo-900 text-center">
        Add Transaction 💰
      </motion.h2>

      <motion.div variants={itemVariants} className="flex gap-2">
        {/* Type Toggle - Animated with Framer Motion 'layout' for smooth re-flow */}
        <motion.button
          layout
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors duration-300 ${ // Increased padding, roundedness, and duration
            type === "income" ? "bg-green-600 text-white shadow-lg scale-[1.03]" : "bg-gray-100 text-gray-700 hover:bg-green-100"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Income
        </motion.button>
        <motion.button
          layout
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors duration-300 ${ // Increased padding, roundedness, and duration
            type === "expense" ? "bg-red-600 text-white shadow-lg scale-[1.03]" : "bg-gray-100 text-gray-700 hover:bg-red-100"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Expense
        </motion.button>
      </motion.div>

      {/* Inputs - Animated on mount with itemVariants */}
      <motion.input
        variants={itemVariants}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg" // Increased padding, ring focus
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <motion.input
        variants={itemVariants}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
        placeholder="Category (optional)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <motion.input
        variants={itemVariants}
        className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
        placeholder="Amount"
        type="number"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      {/* Submit Button - Animated with Framer Motion and improved styling */}
      <motion.div variants={itemVariants} className="flex justify-center pt-3"> {/* Centered button for better mobile look */}
        <motion.button
          type="submit"
          className="w-full sm:w-auto bg-indigo-900 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-700 transition-colors duration-300" // Enhanced button styling
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          Add Transaction
        </motion.button>
      </motion.div>
    </motion.form>
  );
}