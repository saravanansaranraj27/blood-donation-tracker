import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const YearlyChart = React.memo(({ data }) => {
  return (
    <div className="chart-panel">
      <h3 className="yearly-chart-title">Annual Donation Frequency</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            stroke="var(--text-faint)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="var(--text-faint)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              background: "var(--surface-raised)",
              border: "1px solid var(--border-strong)",
              borderRadius: "8px",
              color: "var(--text)",
            }}
            labelStyle={{
              color: "var(--text)",
              fontWeight: "bold",
              marginBottom: "4px",
            }}
            itemStyle={{ color: "var(--text-muted)" }}
            cursor={{ fill: "var(--surface-glass)" }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index % 2 === 0 ? "var(--teal)" : "var(--amber)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
});

export default YearlyChart;
