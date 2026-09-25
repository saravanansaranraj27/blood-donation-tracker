export default function SectionHeader({ title, note }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      <span className="section-note">{note}</span>
    </div>
  );
}
