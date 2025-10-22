import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

/**
 * Simple Income vs Expense pie chart
 * props.data = [{ name: 'Income', value: 100 }, { name: 'Expense', value: 50 }]
 */
export default function ChartCard({ data = [] }) {
  const COLORS = ["#10B981", "#EF4444"];

  return (
    <div className="card">
      <h3 className="font-medium mb-2">Income vs Expense</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
              {data.map((entry, idx) => (
                <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}