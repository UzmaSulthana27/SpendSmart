import React from 'react';
import { useExpense } from '../context/ExpenseContext';
import CurrencySelector from './CurrencySelector';

// --- COLOR PALETTE DEFINITIONS ---
const COLOR_CARD_BASE = "#FFFFFF";
const COLOR_NAVY_TEXT = "#1d2e4a";
const COLOR_BORDER = "#E5E7EB";

export default function UserSettings() {
    const { currency, updateCurrency } = useExpense();

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <h1 className="text-3xl font-bold" style={{ color: COLOR_NAVY_TEXT }}>
                Settings
            </h1>

            <div 
                className="p-6 rounded-xl shadow-md border space-y-5"
                style={{ backgroundColor: COLOR_CARD_BASE, borderColor: COLOR_BORDER }}
            >
                <h2 className="text-xl font-semibold border-b pb-3" style={{ color: COLOR_NAVY_TEXT, borderColor: COLOR_BORDER }}>
                    General Preferences
                </h2>
                
                {/* Integrate the Currency Selector */}
                <CurrencySelector
                    currentCurrency={currency}
                    onSelectCurrency={updateCurrency}
                />
            </div>

            {/* Placeholder for future enhancements like Data Export */}
            <div 
                className="p-6 rounded-xl shadow-md border space-y-4"
                style={{ backgroundColor: COLOR_CARD_BASE, borderColor: COLOR_BORDER }}
            >
                <h2 className="text-xl font-semibold" style={{ color: COLOR_NAVY_TEXT }}>
                    Data Management
                </h2>
                <button
                    className="w-full py-2 border rounded-lg font-medium transition-colors duration-200"
                    style={{ color: COLOR_NAVY_TEXT, borderColor: COLOR_NAVY_TEXT, hoverBackgroundColor: '#F3F4F6' }}
                    onClick={() => alert("Data Export feature coming soon!")}
                >
                    Export Data (CSV)
                </button>
            </div>
        </div>
    );
}