import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

// --- Default Currency Definition ---
const DEFAULT_CURRENCY = { code: 'USD', symbol: '$' };

// Initial Context State (including new currency values)
const ExpenseContext = createContext({
    transactions: [],
    income: 0,
    expense: 0,
    balance: 0,
    chartData: [],
    currency: DEFAULT_CURRENCY, // 👈 New: Default currency
    addTransaction: () => {},
    removeTransaction: () => {},
    updateCurrency: () => {}, // 👈 New: Function to update currency
});

export const useExpense = () => useContext(ExpenseContext);

// Load initial transactions from localStorage or use a default set
const loadInitialTransactions = () => {
    try {
        const stored = localStorage.getItem('expense_tracker_transactions');
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error("Could not load transactions from local storage", error);
        return [];
    }
};

export const ExpenseProvider = ({ children }) => {
    const [transactions, setTransactions] = useState(loadInitialTransactions);
    const [currency, setCurrency] = useState(DEFAULT_CURRENCY); // 👈 New State

    // Helper function to save to localStorage
    const saveTransactions = useCallback((newTxs) => {
        setTransactions(newTxs);
        localStorage.setItem('expense_tracker_transactions', JSON.stringify(newTxs));
    }, []);

    const addTransaction = useCallback((tx) => {
        const newTx = { id: Date.now(), date: new Date().toISOString(), ...tx };
        saveTransactions([newTx, ...transactions]);
    }, [transactions, saveTransactions]);

    const removeTransaction = useCallback((id) => {
        saveTransactions(transactions.filter(tx => tx.id !== id));
    }, [transactions, saveTransactions]);

    // New function to update currency
    const updateCurrency = useCallback((newCurrency) => {
        setCurrency(newCurrency);
    }, []);
    
    // Recalculate summary data whenever transactions change
    const { income, expense, balance, chartData } = useMemo(() => {
        const income = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const expense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        const balance = income - expense;

        const chartData = [
            { name: 'Income', value: income || 1 }, // Ensure chart renders if 0
            { name: 'Expense', value: expense || 1 },
        ];

        return { income, expense, balance, chartData };
    }, [transactions]);

    const contextValue = useMemo(() => ({
        transactions,
        income,
        expense,
        balance,
        chartData,
        currency,           // 👈 Expose currency state
        addTransaction,
        removeTransaction,
        updateCurrency,     // 👈 Expose update function
    }), [transactions, income, expense, balance, chartData, currency, addTransaction, removeTransaction, updateCurrency]);

    return (
        <ExpenseContext.Provider value={contextValue}>
            {children}
        </ExpenseContext.Provider>
    );
};