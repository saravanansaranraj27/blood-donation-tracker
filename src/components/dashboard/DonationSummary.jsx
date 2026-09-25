import { Activity, Droplet, TrendingDown, TrendingUp } from "../../Icons.jsx";
import { DONOR } from "../../data/donor.js";
import SectionHeader from "./SectionHeader.jsx";

export default function DonationSummary({ stats }) {
  return (
    <section id="summary" className="block">
      <SectionHeader
        title="Donation Summary"
        note={`${DONOR.hospital}, ${DONOR.place}`}
      />
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-icon teal">
            <Droplet />
          </div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total Donations</div>
          <div className="stat-foot">Since {stats.first.date}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon navy">
            <Activity />
          </div>
          <div className="stat-value">{stats.average.toFixed(2)}</div>
          <div className="stat-label">Average Hb (g/dl)</div>
          <div className="stat-foot">Across all recorded visits</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon teal">
            <TrendingUp />
          </div>
          <div className="stat-value">{stats.highest.hb.toFixed(1)}</div>
          <div className="stat-label">Highest Hb (g/dl)</div>
          <div className="stat-foot">
            {stats.highest.date} · Donation #{stats.highest.sno}
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">
            <TrendingDown />
          </div>
          <div className="stat-value">{stats.lowest.hb.toFixed(1)}</div>
          <div className="stat-label">Lowest Hb (g/dl)</div>
          <div className="stat-foot">
            {stats.lowest.date} · Donation #{stats.lowest.sno}
          </div>
        </div>
      </div>
    </section>
  );
}
