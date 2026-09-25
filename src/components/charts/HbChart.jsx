import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { ELIGIBILITY_THRESHOLD } from "../../data/donor.js";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="custom-tooltip">
      <div className="tt-title">
        Donation #{d.sno} · {d.date}
      </div>
      <div className="tt-row">
        Haemoglobin: <b>{d.hb.toFixed(1)} g/dl</b>
      </div>
      <div className="tt-row">{d.place}</div>
    </div>
  );
}

const HbChart = React.memo(({ records, stats }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={records}
        margin={{ top: 10, right: 18, left: -14, bottom: 0 }}
      >
        <defs>
          <linearGradient id="hbFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--teal)" stopOpacity={0.45} />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="var(--grid-line)" vertical={false} />
        <XAxis
          dataKey="sno"
          tickFormatter={(v) => `#${v}`}
          stroke="var(--text-faint)"
          fontSize={12}
          tickLine={false}
          axisLine={{ stroke: "var(--border)" }}
        />
        <YAxis
          domain={[11, 17]}
          stroke="var(--text-faint)"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          width={36}
        />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine
          y={stats.average}
          stroke="var(--amber)"
          strokeDasharray="5 5"
          strokeWidth={1.5}
        />
        <ReferenceLine
          y={ELIGIBILITY_THRESHOLD}
          stroke="#E0603F"
          strokeDasharray="2 4"
          strokeWidth={1.2}
        />
        <Area
          type="monotone"
          dataKey="hb"
          stroke="var(--teal)"
          strokeWidth={2.5}
          fill="url(#hbFill)"
          dot={{ r: 3.5, fill: "var(--teal)", strokeWidth: 0 }}
          activeDot={{ r: 5.5 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

export default HbChart;
