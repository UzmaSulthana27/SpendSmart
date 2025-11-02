import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useExpense } from "../context/ExpenseContext"; // 👈 New Import

// --- COLOR PALETTE DEFINITIONS (Light Theme with Dark Navy Text) ---
const COLOR_CARD_BASE = "#FFFFFF";       
const COLOR_NAVY_TEXT = "#1d2e4a";        
const COLOR_SKY_BLUE = "#0284C7";         
const COLOR_EMERALD = "#10B981";          
const COLOR_RED = "#E11D48";              
const COLOR_BORDER = "#E5E7EB";           
// -----------------------------------

export default function ChartCard({ data = [] }) {
  // 👈 Access the dynamic currency symbol
  const { currency } = useExpense();
  const COLORS = [COLOR_EMERALD, COLOR_RED];

  // Calculate Net Balance for the center display
  const income = data.find(item => item.name === 'Income')?.value || 0;
  const expense = data.find(item => item.name === 'Expense')?.value || 0;
  const netBalance = income - expense;
  const netBalanceColor = netBalance >= 0 ? COLOR_EMERALD : COLOR_RED; 

  return (
    <div 
      className="w-full h-80 p-5 rounded-xl shadow-lg flex flex-col border animate-slide-in" 
      style={{ 
        backgroundColor: COLOR_CARD_BASE,
        color: COLOR_NAVY_TEXT,
        borderColor: COLOR_BORDER, 
        // Slide-in animation on render
        animation: `slideInFromTop 0.5s ease-out forwards`,
        animationDelay: '0.1s',
        opacity: 0, 
      }}
    >
      
      <h3 className="text-xl font-bold mb-4 text-center" style={{ color: COLOR_NAVY_TEXT }}>
        Income vs. Expense Breakdown
      </h3>
      
      {/* Chart Wrapper */}
      <div className="relative flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie 
              data={data} 
              dataKey="value" 
              nameKey="name"
              innerRadius="70%" 
              outerRadius="95%"
              paddingAngle={2}
              isAnimationActive={true}
            >
              {data.map((entry, idx) => (
                <Cell 
                  key={`cell-${idx}`} 
                  fill={COLORS[idx % COLORS.length]} 
                  stroke={COLOR_CARD_BASE} 
                  strokeWidth={2}
                />
              ))}
            </Pie>
            
            {/* Tooltip Styling: Uses dynamic currency symbol */}
            <Tooltip 
              formatter={(value, name, props) => {
                const dataName = props.payload && props.payload.length ? props.payload[0].name : 'Amount';
                // 👈 Use dynamic currency symbol
                return [`${currency.symbol}${Number(value).toFixed(2)}`, dataName]; 
              }}
              contentStyle={{ 
                backgroundColor: COLOR_CARD_BASE, 
                border: `1px solid ${COLOR_SKY_BLUE}`, 
                color: COLOR_NAVY_TEXT,
                borderRadius: '8px',
                padding: '8px',
                fontSize: '14px' 
              }}
              labelStyle={{ fontWeight: 'bold', color: COLOR_NAVY_TEXT }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Net Balance Display in Center: Uses dynamic currency symbol */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="text-sm font-medium opacity-80 mb-1" style={{ color: COLOR_SKY_BLUE }}>NET BALANCE</div>
          <div className="text-xl font-extrabold transition-colors duration-500" style={{ color: netBalanceColor }}>
            {/* 👈 Use dynamic currency symbol */}
            {currency.symbol}{netBalance.toFixed(2)}
          </div>
        </div>
      </div>
      
      {/* Custom Legend */}
      <div className="flex justify-center gap-6 mt-4 pt-3 border-t" style={{ borderColor: COLOR_BORDER }}>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_EMERALD }}></div>
            <span className="text-sm opacity-90" style={{ color: COLOR_NAVY_TEXT }}>Income</span>
        </div>
        <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_RED }}></div>
            <span className="text-sm opacity-90" style={{ color: COLOR_NAVY_TEXT }}>Expense</span>
        </div>
      </div>
    </div>
  );
}