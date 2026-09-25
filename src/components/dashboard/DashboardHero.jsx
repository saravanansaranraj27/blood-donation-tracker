import {
  Calendar,
  Droplet,
  HeartPulse,
  Linkedin,
  MapPin,
} from "../../Icons.jsx";
import { DONOR } from "../../data/donor.js";

export default function DashboardHero({ stats }) {
  return (
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
              className="linkedin-link"
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
  );
}
