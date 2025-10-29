import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExpense } from "../context/ExpenseContext";
import { motion } from "framer-motion";

// Define animation variants
const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

// Define colors
const COLOR_INDIGO_900 = "#3730A3";
const COLOR_GREEN_600 = "#059669";
const COLOR_RED_600 = "#DC2626";

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
    // Redirects to /transactions after successful submission
    navigate("/transactions");
  }

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={submit}
      className="max-w-sm sm:max-w-md lg:max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-2xl space-y-5"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-center" style={{color: COLOR_INDIGO_900}}>
        Add Transaction 💰
      </motion.h2>

      <motion.div variants={itemVariants} className="flex gap-2">
        {/* Type Toggle - Income */}
        <motion.button
          layout
          type="button"
          onClick={() => setType("income")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors duration-300 ${
            type === "income" ? "text-white shadow-lg scale-[1.03]" : "bg-gray-100 text-gray-700 hover:bg-green-100"
          }`}
          style={{backgroundColor: type === "income" ? COLOR_GREEN_600 : undefined}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Income
        </motion.button>
        {/* Type Toggle - Expense */}
        <motion.button
          layout
          type="button"
          onClick={() => setType("expense")}
          className={`flex-1 py-3 rounded-xl font-semibold transition-colors duration-300 ${
            type === "expense" ? "text-white shadow-lg scale-[1.03]" : "bg-gray-100 text-gray-700 hover:bg-red-100"
          }`}
          style={{backgroundColor: type === "expense" ? COLOR_RED_600 : undefined}}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          Expense
        </motion.button>
      </motion.div>

      {/* Inputs */}
      {["Description", "Category (optional)", "Amount"].map((placeholder, index) => {
        const value = index === 0 ? desc : index === 1 ? category : amount;
        const setter = index === 0 ? setDesc : index === 1 ? setCategory : setAmount;
        const typeAttr = index === 2 ? "number" : "text";

        return (
          <motion.input
            key={index}
            variants={itemVariants}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 text-lg"
            placeholder={placeholder}
            type={typeAttr}
            step={typeAttr === "number" ? "0.01" : undefined}
            value={value}
            onChange={(e) => setter(e.target.value)}
          />
        );
      })}
      
      {/* Submit Button */}
      <motion.div variants={itemVariants} className="flex justify-center pt-3">
        <motion.button
          type="submit"
          className="w-full sm:w-auto text-white px-8 py-3 rounded-xl font-bold text-lg shadow-xl hover:bg-indigo-700 transition-colors duration-300"
          style={{backgroundColor: COLOR_INDIGO_900}}
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.95 }}
        >
          Add Transaction
        </motion.button>
      </motion.div>
    </motion.form>
  );
}