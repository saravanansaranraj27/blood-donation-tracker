import { ArrowUp } from "../../Icons.jsx";
import { DONOR } from "../../data/donor.js";
import DashboardHeader from "../../components/dashboard/DashboardHeader.jsx";
import DashboardHero from "../../components/dashboard/DashboardHero.jsx";
import DonationRecordTable from "../../components/dashboard/DonationRecordTable.jsx";
import DonationRhythm from "../../components/dashboard/DonationRhythm.jsx";
import DonationSummary from "../../components/dashboard/DonationSummary.jsx";
import DonorAnalytics from "../../components/dashboard/DonorAnalytics.jsx";
import HemoglobinTrend from "../../components/dashboard/HemoglobinTrend.jsx";
import Loader from "../../components/common/Loader.jsx";
import useDashboardData from "../../hooks/useDashboardData.js";
import useScrollNavigation from "../../hooks/useScrollNavigation.js";
import useTheme from "../../hooks/useTheme.js";
import { useEffect, useState } from "react";

function Dashboard() {
  const [theme, setTheme] = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeSection, showBackToTop, scrollToSection, scrollToTop } =
    useScrollNavigation();
  const {
    sortedRecords,
    stats,
    yearlyStats,
    avgGap,
    nextDonationDate,
    consistencyData,
  } = useDashboardData();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loader />;

  const handleNavigate = (id) => {
    scrollToSection(id, () => setIsMobileMenuOpen(false));
  };

  return (
    <div className="app-shell">
      <DashboardHeader
        theme={theme}
        onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
        activeSection={activeSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobileMenu={() => setIsMobileMenuOpen((open) => !open)}
        onNavigate={handleNavigate}
      />

      <DashboardHero stats={stats} />

      <div className="container">
        <DonationSummary stats={stats} />
        <HemoglobinTrend records={sortedRecords} stats={stats} />
        <DonorAnalytics
          consistencyData={consistencyData}
          avgGap={avgGap}
          nextDonationDate={nextDonationDate}
          yearlyStats={yearlyStats}
        />
        <DonationRhythm records={sortedRecords} average={stats.average} />
        <DonationRecordTable records={sortedRecords} stats={stats} />

        <footer>
          <span>
            Data source: {DONOR.hospital}, {DONOR.place}
          </span>
          <span>
            Built with React &amp; Vite © {new Date().getFullYear()} Saran Raj
            Saravanan
          </span>
        </footer>
      </div>

      <button
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
}

export default Dashboard;
