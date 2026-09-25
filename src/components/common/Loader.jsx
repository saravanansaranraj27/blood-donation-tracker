const Loader = () => (
  <div className="app-shell">
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="skeleton skeleton-brand-mark" />
          <span className="skeleton skeleton-brand-name" />
        </div>
        <div className="skeleton skeleton-theme-toggle" />
      </div>
    </div>

    <div className="hero">
      <div className="hero-inner">
        <div className="hero-content-skeleton">
          <div className="skeleton skeleton-eyebrow" />
          <div className="skeleton skeleton-hero-title" />
          <div className="skeleton skeleton-hero-title-short" />
          <div className="hero-meta-skeleton">
            <div className="skeleton skeleton-meta-item" />
            <div className="skeleton skeleton-meta-item skeleton-meta-item-wide" />
            <div className="skeleton skeleton-meta-item skeleton-meta-item-long" />
          </div>
        </div>
        <div className="skeleton skeleton-hero-figure" />
      </div>
    </div>

    <div className="container loader-container">
      <div className="skeleton skeleton-section-heading" />
      <div className="stat-grid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="skeleton skeleton-stat-card" />
        ))}
      </div>

      <div className="skeleton-section-space">
        <div className="skeleton skeleton-section-heading" />
        <div className="skeleton skeleton-chart-panel" />
      </div>

      <div className="skeleton-section-space">
        <div className="skeleton skeleton-section-heading" />
        <div className="stat-grid analytics-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton-stat-card" />
          ))}
        </div>
        <div className="skeleton skeleton-yearly-chart" />
      </div>

      <div className="skeleton-section-space">
        <div className="skeleton skeleton-section-heading" />
        <div className="skeleton skeleton-rhythm-panel" />
      </div>

      <div className="skeleton-section-space">
        <div className="skeleton skeleton-section-heading" />
        <div className="skeleton skeleton-record-panel" />
      </div>
    </div>
  </div>
);

export default Loader;
