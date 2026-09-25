import HbChart from "../charts/HbChart.jsx";
import SectionHeader from "./SectionHeader.jsx";

export default function HemoglobinTrend({ records, stats }) {
  return (
    <section id="trend" className="block">
      <SectionHeader
        title="Haemoglobin Trend"
        note="g/dl per donation, in donation order"
      />
      <div className="chart-panel">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-swatch teal" /> Haemoglobin level
          </div>
          <div className="legend-item">
            <span className="legend-swatch amber" /> Personal average
          </div>
          <div className="legend-item">
            <span className="legend-dot threshold" /> Eligibility threshold (≥
            12.5 g/dl)
          </div>
        </div>
        <HbChart records={records} stats={stats} />
      </div>
    </section>
  );
}
