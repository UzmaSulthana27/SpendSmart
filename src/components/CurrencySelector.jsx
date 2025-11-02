import React from 'react';

// Common currencies (you can expand this list)
const CURRENCIES = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
];

export default function CurrencySelector({ currentCurrency, onSelectCurrency }) {
    const COLOR_NAVY_TEXT = "#1d2e4a";
    const COLOR_SKY_BLUE = "#0284C7";

    return (
        <div className="flex flex-col space-y-2">
            <label 
                htmlFor="currency-select" 
                className="text-sm font-medium" 
                style={{ color: COLOR_NAVY_TEXT }}
            >
                Primary Currency
            </label>
            <select
                id="currency-select"
                value={currentCurrency.code}
                onChange={(e) => {
                    const selected = CURRENCIES.find(c => c.code === e.target.value);
                    if (selected) {
                        onSelectCurrency(selected);
                    }
                }}
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-2 transition-all duration-300 appearance-none cursor-pointer"
                style={{borderColor: '#E5E7EB', outlineColor: COLOR_SKY_BLUE}}
            >
                {CURRENCIES.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                        {currency.symbol} - {currency.name} ({currency.code})
                    </option>
                ))}
            </select>
            <div className="text-xs mt-1" style={{color: '#6B7280'}}>
                This symbol will be used throughout the application.
            </div>
        </div>
    );
}