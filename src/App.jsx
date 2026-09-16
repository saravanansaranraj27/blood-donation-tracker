import React, { useEffect, useMemo, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Droplet,
  Sun,
  Moon,
  Calendar,
  MapPin,
  Activity,
  TrendingUp,
  TrendingDown,
  HeartPulse,
  ShieldCheck,
  Clock,
  AlertCircle,
  Linkedin,
  Menu,
  X,
  ArrowUp,
} from "./Icons.jsx";

const DONOR = {
  name: "Saran Raj Saravanan",
  dob: "27 Jan 2002",
  place: "Dindigul, Tamil Nadu",
  hospital: "Vadamalayan Hospitals",
};

const RECORDS_RAW = [
  {
    sno: 1,
    date: "04 Sep 2023",
    hb: 13.0,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 2,
    date: "05 Dec 2023",
    hb: 14.2,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 3,
    date: "06 Mar 2024",
    hb: 13.1,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 4,
    date: "24 Jun 2024",
    hb: 14.2,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 5,
    date: "22 Sep 2024",
    hb: 15.4,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 6,
    date: "22 Dec 2024",
    hb: 16.2,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 7,
    date: "29 Mar 2025",
    hb: 13.3,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 8,
    date: "29 Jun 2025",
    hb: 13.8,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 9,
    date: "28 Sep 2025",
    hb: 13.4,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 10,
    date: "29 Dec 2025",
    hb: 12.5,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 11,
    date: "12 Apr 2026",
    hb: 14.2,
    place: "Vadamalayan Hospitals, Dindigul",
  },
  {
    sno: 12,
    date: "08 Jul 2026",
    hb: 15.6,
    place: "Vadamalayan Hospitals, Dindigul",
  },
];

const ELIGIBILITY_THRESHOLD = 12.5;

const monthMap = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

function parseDate(dateStr) {
  const [day, month, year] = dateStr.split(" ");
  return new Date(parseInt(year), monthMap[month], parseInt(day));
}

function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("bdr-theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? "light"
      : "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("bdr-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

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

const YearlyChart = React.memo(({ data }) => {
  return (
    <div className="chart-panel">
      <h3 style={{ marginBottom: "20px", fontSize: "18px", marginTop: 0 }}>
        Annual Donation Frequency
      </h3>
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

const NAV_LINKS = [
  { id: "summary", label: "Summary" },
  { id: "trend", label: "Trend" },
  { id: "analytics", label: "Analytics" },
  { id: "rhythm", label: "Rhythm" },
  { id: "record", label: "Record" },
];

const PageLoader = () => (
  <div className="app-shell">
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span
            className="skeleton"
            style={{ width: 34, height: 34, borderRadius: 8 }}
          />
          <span
            className="skeleton"
            style={{ width: 150, height: 20, borderRadius: 4 }}
          />
        </div>
        <div
          className="skeleton"
          style={{ width: 42, height: 42, borderRadius: 8 }}
        />
      </div>
    </div>

    <div className="hero">
      <div className="hero-inner">
        <div className="hero-content-skeleton">
          <div
            className="skeleton"
            style={{
              width: 120,
              height: 24,
              borderRadius: 12,
              marginBottom: 16,
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "80%",
              height: 48,
              borderRadius: 8,
              marginBottom: 12,
            }}
          />
          <div
            className="skeleton"
            style={{
              width: "60%",
              height: 48,
              borderRadius: 8,
              marginBottom: 24,
            }}
          />
          <div className="hero-meta-skeleton">
            <div
              className="skeleton"
              style={{ width: 140, height: 36, borderRadius: 8 }}
            />
            <div
              className="skeleton"
              style={{ width: 160, height: 36, borderRadius: 8 }}
            />
            <div
              className="skeleton"
              style={{ width: 180, height: 36, borderRadius: 8 }}
            />
          </div>
        </div>
        <div
          className="skeleton"
          style={{ width: "100%", height: 280, borderRadius: 32 }}
        />
      </div>
    </div>

    <div className="container" style={{ paddingTop: 40 }}>
      <div
        className="skeleton"
        style={{ width: 200, height: 32, borderRadius: 8, marginBottom: 24 }}
      />
      <div className="stat-grid">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="skeleton"
            style={{ height: 180, borderRadius: 24 }}
          />
        ))}
      </div>

      <div style={{ marginTop: 64 }}>
        <div
          className="skeleton"
          style={{ width: 200, height: 32, borderRadius: 8, marginBottom: 24 }}
        />
        <div className="skeleton" style={{ height: 350, borderRadius: 32 }} />
      </div>

      <div style={{ marginTop: 64 }}>
        <div
          className="skeleton"
          style={{ width: 200, height: 32, borderRadius: 8, marginBottom: 24 }}
        />
        <div
          className="stat-grid"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
        >
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="skeleton"
              style={{ height: 180, borderRadius: 24 }}
            />
          ))}
        </div>
        <div
          className="skeleton"
          style={{ height: 300, borderRadius: 32, marginTop: 32 }}
        />
      </div>
    </div>
  </div>
);

export default function App() {
  const [theme, setTheme] = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("summary");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);

      const sections = NAV_LINKS.map((link) =>
        document.getElementById(link.id),
      );
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (
          section &&
          section.offsetTop <= scrollPosition &&
          section.offsetTop + section.offsetHeight > scrollPosition
        ) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const sortedRecords = useMemo(() => {
    return [...RECORDS_RAW].sort(
      (a, b) => parseDate(a.date) - parseDate(b.date),
    );
  }, []);

  const stats = useMemo(() => {
    const hbValues = sortedRecords.map((r) => r.hb);
    const total = sortedRecords.length;
    const sum = hbValues.reduce((a, b) => a + b, 0);
    const average = sum / total;
    const highest = sortedRecords.reduce((a, b) => (b.hb > a.hb ? b : a));
    const lowest = sortedRecords.reduce((a, b) => (b.hb < a.hb ? b : a));
    const first = sortedRecords[0];
    const latest = sortedRecords[sortedRecords.length - 1];
    return { total, average, highest, lowest, first, latest };
  }, [sortedRecords]);

  const yearlyStats = useMemo(() => {
    const years = {};
    sortedRecords.forEach((r) => {
      const year = r.date.split(" ")[2];
      years[year] = (years[year] || 0) + 1;
    });
    return Object.keys(years).map((year) => ({
      name: year,
      count: years[year],
    }));
  }, [sortedRecords]);

  const avgGap = useMemo(() => {
    if (sortedRecords.length < 2) return 0;
    let totalDays = 0;
    for (let i = 1; i < sortedRecords.length; i++) {
      const prev = parseDate(sortedRecords[i - 1].date);
      const curr = parseDate(sortedRecords[i].date);
      totalDays += (curr - prev) / (1000 * 60 * 60 * 24);
    }
    return Math.round(totalDays / (sortedRecords.length - 1));
  }, [sortedRecords]);

  const nextDonationDate = useMemo(() => {
    if (sortedRecords.length === 0) return null;
    const lastDate = parseDate(stats.latest.date);
    const nextDate = new Date(lastDate);
    nextDate.setDate(nextDate.getDate() + (avgGap || 90));
    return nextDate;
  }, [stats.latest, avgGap, sortedRecords.length]);

  const recent = sortedRecords.slice(-3);
  let consistencyData = {
    status: "Building Data",
    detail: "Need 3+ records",
    icon: <Clock />,
  };

  if (recent.length >= 3) {
    const values = recent.map((r) => r.hb);
    const mean = values.reduce((a, b) => a + b, 0) / values.length;

    const squareDiffs = values.map((value) => Math.pow(value - mean, 2));
    const avgSquareDiff =
      squareDiffs.reduce((a, b) => a + b, 0) / values.length;
    const stdDev = Math.sqrt(avgSquareDiff);

    const cv = (stdDev / mean) * 100;

    const isBelowThreshold = values.some((v) => v < ELIGIBILITY_THRESHOLD);
    const isDropping = values[2] < values[1] && values[1] < values[0];

    if (isBelowThreshold) {
      consistencyData = {
        status: "Attention Needed",
        detail: "Recent Hb < 12.5 g/dl",
        icon: <AlertCircle />,
      };
    } else if (cv > 5) {
      consistencyData = {
        status: "Variable",
        detail: "High fluctuation in recent readings",
        icon: <Activity />,
      };
    } else if (isDropping) {
      consistencyData = {
        status: "Declining Trend",
        detail: "Consistent drop in last 3 visits",
        icon: <TrendingDown />,
      };
    } else {
      consistencyData = {
        status: "Stable",
        detail: "Consistent healthy levels",
        icon: <ShieldCheck />,
      };
    }
  }

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <div className="app-shell">
      <div className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark">
              <Droplet size={16} strokeWidth={2.5} />
            </span>
            Blood Donation Tracker
          </div>

          <nav className="desktop-nav">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`nav-link ${
                  activeSection === link.id ? "active" : ""
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="topbar-actions">
            <button
              className="theme-toggle"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={`Switch to ${
                theme === "dark" ? "light" : "dark"
              } mode`}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={`mobile-nav ${isMobileMenuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`mobile-nav-link ${
                activeSection === link.id ? "active" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <div className="hero">
        <svg
          className="pulse-svg"
          viewBox="0 0 1000 300"
          preserveAspectRatio="none"
        >
          <path
            className="pulse-path"
            d="M -20 210 L 140 210 L 175 210 L 195 120 L 225 280 L 255 60 L 285 210 L 340 210
               L 500 210 L 535 210 L 555 130 L 585 270 L 615 80 L 645 210 L 700 210
               L 860 210 L 895 210 L 915 140 L 945 260 L 975 100 L 1005 210 L 1050 210"
          />
        </svg>
        <div className="hero-inner">
          <div>
            <div className="eyebrow">
              <HeartPulse size={14} /> Voluntary Blood Donor
            </div>
            <h1 className="hero-name">
              Saran Raj <span>Saravanan</span>
            </h1>
            <div className="hero-meta">
              <div>
                <Calendar /> DOB {DONOR.dob}
              </div>
              <div>
                <MapPin /> {DONOR.place}
              </div>
              <div>
                <Droplet /> {stats.total} donations since {stats.first.date}
              </div>
              <a
                href="https://www.linkedin.com/in/saran-raj-saravanan/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div>
                  <Linkedin /> Connect on LinkedIn
                </div>
              </a>
            </div>
          </div>

          <div className="hero-figure">
            <div className="num">{stats.total}</div>
            <div className="num-label">Total voluntary donations recorded</div>
            <div className="divider" />
            <div className="sub-stat">
              <span>Average Hb</span>
              <b>{stats.average.toFixed(2)} g/dl</b>
            </div>
            <div className="sub-stat">
              <span>Highest reading</span>
              <b>{stats.highest.hb.toFixed(1)} g/dl</b>
            </div>
            <div className="sub-stat">
              <span>Latest donation</span>
              <b>{stats.latest.date}</b>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <section id="summary" className="block">
          <div className="section-head">
            <h2>Donation Summary</h2>
            <span className="section-note">
              {DONOR.hospital}, {DONOR.place}
            </span>
          </div>
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

        <section id="trend" className="block">
          <div className="section-head">
            <h2>Haemoglobin Trend</h2>
            <span className="section-note">
              g/dl per donation, in donation order
            </span>
          </div>
          <div className="chart-panel">
            <div className="chart-legend">
              <div className="legend-item">
                <span
                  className="legend-swatch"
                  style={{ background: "var(--teal)" }}
                />{" "}
                Haemoglobin level
              </div>
              <div className="legend-item">
                <span
                  className="legend-swatch"
                  style={{ background: "var(--amber)", opacity: 0.8 }}
                />{" "}
                Personal average
              </div>
              <div className="legend-item">
                <span
                  className="legend-dot"
                  style={{ background: "#E0603F", borderRadius: "50%" }}
                />{" "}
                Eligibility threshold (≥ 12.5 g/dl)
              </div>
            </div>
            <HbChart records={sortedRecords} stats={stats} />
          </div>
        </section>

        <section id="analytics" className="block">
          <div className="section-head">
            <h2>Donor Analytics</h2>
            <span className="section-note">Patterns & Predictions</span>
          </div>

          <div
            className="stat-grid"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              marginBottom: "32px",
            }}
          >
            <div className="stat-card">
              <div className="stat-icon teal">{consistencyData.icon}</div>
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
              <div className="stat-value" style={{ fontSize: "20px" }}>
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

        <section id="rhythm" className="block">
          <div className="section-head">
            <h2>Donation Rhythm</h2>
            <span className="section-note">Hover a marker for details</span>
          </div>
          <div className="chart-panel rhythm-wrap">
            <div className="rhythm-strip">
              {sortedRecords.map((r) => {
                const tier =
                  r.hb < ELIGIBILITY_THRESHOLD
                    ? "low"
                    : r.hb >= stats.average
                      ? "high"
                      : "mid";
                return (
                  <div
                    className="drop"
                    key={r.sno}
                    role="button"
                    tabIndex={0}
                    title={`#${r.sno} · ${r.date} · ${r.hb.toFixed(1)} g/dl`}
                    aria-label={`Donation ${r.sno} on ${r.date}, Haemoglobin ${r.hb.toFixed(1)} grams per deciliter`}
                  >
                    <span className={`drop-mark ${tier}`} />
                    <span className="drop-idx">#{r.sno}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="record" className="block">
          <div className="section-head">
            <h2>Full Record</h2>
            <span className="section-note">{stats.total} entries</span>
          </div>
          <div className="table-panel">
            <div className="table-scroll">
              <table className="records">
                <thead>
                  <tr>
                    <th>S.No</th>
                    <th>Date</th>
                    <th>Haemoglobin (g/dl)</th>
                    <th>Place</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedRecords.map((r) => (
                    <tr key={r.sno}>
                      <td className="mono">{r.sno}</td>
                      <td className="mono">{r.date}</td>
                      <td className="mono">{r.hb.toFixed(1)}</td>
                      <td>{r.place}</td>
                      <td>
                        <span
                          className={`status-pill ${
                            r.hb >= stats.average ? "high" : "low"
                          }`}
                        >
                          {r.hb >= stats.average ? "Above avg" : "Below avg"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

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
