import {
  Activity,
  AlertCircle,
  Calendar,
  Clock,
  ShieldCheck,
  TrendingDown,
} from "../../Icons.jsx";
import YearlyChart from "../charts/YearlyChart.jsx";
import SectionHeader from "./SectionHeader.jsx";

const CONSISTENCY_ICONS = {
  clock: Clock,
  alert: AlertCircle,
  activity: Activity,
  trendingDown: TrendingDown,
  shield: ShieldCheck,
};

export default function DonorAnalytics({
  consistencyData,
  avgGap,
  nextDonationDate,
  yearlyStats,
}) {
  const ConsistencyIcon = CONSISTENCY_ICONS[consistencyData.icon];

  return (
    <section id="analytics" className="block">
      <SectionHeader title="Donor Analytics" note="Patterns & Predictions" />
      <div className="stat-grid analytics-grid">
        <div className="stat-card">
          <div className="stat-icon teal">
            <ConsistencyIcon />
          </div>
          <div className="stat-value">{consistencyData.status}</div>
          <div className="stat-label">Hb Consistency</div>
          <div className="stat-foot">{consistencyData.detail}</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon navy">
            <Clock />
          </div>
          <div className="stat-value">{avgGap || "N/A"}</div>
          <div className="stat-label">Avg. Gap (Days)</div>
          <div className="stat-foot">Between donations</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon amber">
            <Calendar />
          </div>
          <div className="stat-value next-donation-value">
            {nextDonationDate
              ? nextDonationDate.toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : "N/A"}
          </div>
          <div className="stat-label">Est. Next Donation</div>
          <div className="stat-foot">Based on your rhythm</div>
        </div>
      </div>
      <YearlyChart data={yearlyStats} />
    </section>
  );
}
