import { getRecordTier } from "../../utils/donationAnalytics.js";
import SectionHeader from "./SectionHeader.jsx";

export default function DonationRhythm({ records, average }) {
  return (
    <section id="rhythm" className="block">
      <SectionHeader
        title="Donation Rhythm"
        note="Hover a marker for details"
      />
      <div className="chart-panel rhythm-wrap">
        <div className="rhythm-strip">
          {records.map((record) => {
            const tier = getRecordTier(record, average);
            return (
              <div
                className="drop"
                key={record.sno}
                role="button"
                tabIndex={0}
                title={`#${record.sno} · ${record.date} · ${record.hb.toFixed(1)} g/dl`}
                aria-label={`Donation ${record.sno} on ${record.date}, Haemoglobin ${record.hb.toFixed(1)} grams per deciliter`}
              >
                <span className={`drop-mark ${tier}`} />
                <span className="drop-idx">#{record.sno}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
