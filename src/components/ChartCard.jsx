import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// --- COLOR PALETTE DEFINITIONS (Matched to Navbar) ---
const COLOR_NAVY = "#1d2e4a";       // Primary Base/Card Container
const COLOR_SKY_BLUE = "#0284C7";    // Accent for Net Balance Label
const COLOR_EMERALD = "#10B981";     // Income (Positive)
const COLOR_RED = "#E11D48";         // Expense (Negative)
const COLOR_TEXT_WHITE = "#E5E7EB";  // Primary Text Color
// -----------------------------------

/**
 * Simple Income vs Expense pie chart with net balance display in the center.
 * props.data = [{ name: 'Income', value: 100 }, { name: 'Expense', value: 50 }]
 */
export default function ChartCard({ data = [] }) {
  const COLORS = [COLOR_EMERALD, COLOR_RED];

  // Calculate Net Balance for the center display
  const income = data.find(item => item.name === 'Income')?.value || 0;
  const expense = data.find(item => item.name === 'Expense')?.value || 0;
  const netBalance = income - expense;
  const netBalanceColor = netBalance >= 0 ? COLOR_EMERALD : COLOR_RED;

  return (
    // Styled Card Container using the specific Navy background
    <div className="w-full h-80 p-5 rounded-xl shadow-2xl flex flex-col" style={{ backgroundColor: COLOR_NAVY, color: COLOR_TEXT_WHITE }}>
      
      <h3 className="text-xl font-bold mb-4 text-center">Income vs. Expense Breakdown</h3>
      
      {/* Chart Wrapper - Relative position required for absolute center text */}
      <div className="relative flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name"
              innerRadius="70%" // Donut style
              outerRadius="95%"
              paddingAngle={2}
              isAnimationActive={true}
            >
              {data.map((entry, idx) => (
                <Cell 
                  key={`cell-${idx}`} 
                  fill={COLORS[idx % COLORS.length]} 
                  stroke={COLOR_NAVY} // Stroke matches background for separation
                  strokeWidth={2}
                />
              ))}
            </Pie>
            {/* Tooltip: Updated formatter to display the data point's 'name' (Income/Expense) */}
            <Tooltip 
              formatter={(value, name, props) => {
                const dataName = props.payload && props.payload.length ? props.payload[0].name : 'Amount';
                return [`$${Number(value).toFixed(2)}`, dataName];
              }}
              contentStyle={{ 
                backgroundColor: '#FFFFFF', // White background for hover visibility
                border: `1px solid ${COLOR_SKY_BLUE}`, 
                color: '#000000', // Black text
                borderRadius: '8px',
                padding: '8px',
                fontSize: '14px' 
              }}
              labelStyle={{ fontWeight: 'bold' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Unique Feature: Net Balance Display in Center */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Net Balance Label: Sky Blue, smaller size (text-sm) */}
          <div className="text-sm font-medium opacity-80 mb-1" style={{ color: COLOR_SKY_BLUE }}>NET BALANCE</div>
          {/* Net Balance Value: Green/Red, size reduced to text-xl */}
          <div className="text-xl font-extrabold transition-colors duration-500" style={{ color: netBalanceColor }}>
            ${netBalance.toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mt-4 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_EMERALD }}></div>
            <span className="text-sm opacity-90">Income</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_RED }}></div>
            <span className="text-sm opacity-90">Expense</span>
        </div>
      </div>
    </div>
  );
}
