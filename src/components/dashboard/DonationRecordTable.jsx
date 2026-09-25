import SectionHeader from "./SectionHeader.jsx";

export default function DonationRecordTable({ records, stats }) {
  return (
    <section id="record" className="block">
      <SectionHeader title="Full Record" note={`${stats.total} entries`} />
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
              {records.map((record) => (
                <tr key={record.sno}>
                  <td className="mono">{record.sno}</td>
                  <td className="mono">{record.date}</td>
                  <td className="mono">{record.hb.toFixed(1)}</td>
                  <td>{record.place}</td>
                  <td>
                    <span
                      className={`status-pill ${
                        record.hb >= stats.average ? "high" : "low"
                      }`}
                    >
                      {record.hb >= stats.average ? "Above avg" : "Below avg"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
