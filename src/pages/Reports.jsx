import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileBarChart, Droplets, Eye, MapPin, Search, FileText } from 'lucide-react';

export default function Reports() {
  const { reports } = useApp();
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  const publishedReports = reports.filter((r) => r.publicationStatus === 'published');

  const filtered = [...publishedReports]
    .filter((r) => {
      const matchSearch =
        r.sampleId.toLowerCase().includes(search.toLowerCase()) ||
        r.location.toLowerCase().includes(search.toLowerCase());
      const matchSource = sourceFilter === 'all' || r.sourceType === sourceFilter;
      return matchSearch && matchSource;
    })
    .sort((a, b) => new Date(b.testingDate) - new Date(a.testingDate));

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  const sourceTypes = ['Tap', 'Hand Pump', 'Borewell', 'Storage Tank', 'Public Water Point', 'River or Stream', 'Other'];

  return (
    <div className="reports-wrapper">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <style>{`
        .reports-wrapper {
          position: relative;
          min-height: 100vh;
          padding: 2rem;
          background: #f8fafc;
          overflow: hidden;
          font-family: 'Inter', -apple-system, sans-serif;
        }

        /* Ambient Background */
        .ambient-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }
        .ambient-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.3;
          animation: floatBlob 18s ease-in-out infinite;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, #93c5fd 0%, transparent 70%);
          top: -150px; right: -100px;
        }
        .blob-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, #e0e7ff 0%, transparent 70%);
          bottom: -150px; left: -100px;
          animation-delay: -9s;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-20px, 20px) scale(1.05); }
        }

        .page-content {
          position: relative;
          z-index: 1;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Page Header */
        .page-header {
          margin-bottom: 2rem;
        }
        .page-header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #0a192f; /* Navy Blue */
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .page-header p {
          font-size: 1rem;
          color: #475569;
          margin: 0;
        }

        /* Search & Filters */
        .search-filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }
        
        .search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 280px;
        }
        
        .search-input-wrap input {
          width: 100%;
          padding: 0.85rem 1rem 0.85rem 2.75rem;
          border-radius: 14px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.95rem;
          color: #0a192f;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          transition: all 0.2s ease;
          outline: none;
        }
        .search-input-wrap input:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1);
        }

        .filter-select {
          padding: 0.85rem 2.5rem 0.85rem 1rem;
          border-radius: 14px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.95rem;
          color: #0a192f;
          font-weight: 500;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230a192f%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem top 50%;
          background-size: 0.65rem auto;
          transition: all 0.2s ease;
        }
        .filter-select:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1);
        }

        /* View Toggle */
        .view-toggle {
          display: flex;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          border-radius: 14px;
          padding: 4px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }
        .view-toggle button {
          background: transparent;
          border: none;
          padding: 8px 12px;
          border-radius: 10px;
          cursor: pointer;
          color: #64748b;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        .view-toggle button:hover {
          background: #f1f5f9;
        }
        .view-toggle button.active {
          background: #1e3a8a; /* Navy Blue */
          color: #ffffff;
          box-shadow: 0 2px 4px rgba(30, 58, 138, 0.2);
        }

        /* Meta Row */
        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 10px;
        }
        .results-count {
          color: #475569;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .published-notice {
          color: #1e3a8a;
          font-size: 0.75rem;
          font-weight: 700;
          background: #e0e7ff;
          padding: 6px 12px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.02em;
        }

        /* Table */
        .table-container {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.05);
          overflow: hidden;
        }
        .data-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.95rem;
        }
        .data-table th {
          text-align: left;
          padding: 1.1rem 1.5rem;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #475569;
          font-weight: 700;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }
        .data-table td {
          padding: 1.1rem 1.5rem;
          color: #1e293b;
          border-bottom: 1px solid #f1f5f9;
        }
        .data-table tr:last-child td {
          border-bottom: none;
        }
        .data-table tr:hover td {
          background: #f8fafc;
        }

        /* Grid / Cards */
        .reports-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        .report-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .report-card:hover {
          transform: translateY(-4px);
          border-color: #bfdbfe;
          box-shadow: 0 20px 40px -10px rgba(30, 58, 138, 0.15);
        }

        /* Badges */
        .badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .badge-success {
          background: #e0e7ff;
          color: #1e3a8a;
        }

        /* Buttons */
        .btn-ghost {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #1e3a8a;
          font-weight: 700;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          cursor: pointer;
          padding: 8px 16px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-ghost:hover {
          background: #1e3a8a;
          color: #ffffff;
          border-color: #1e3a8a;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
        }
        .empty-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          color: #64748b;
        }

        @media (max-width: 768px) {
          .reports-wrapper { padding: 1rem; }
          .page-header h1 { font-size: 1.75rem; }
          .search-filters { flex-direction: column; }
          .search-input-wrap { width: 100%; }
          .filter-select { width: 100%; }
          .view-toggle { width: 100%; justify-content: center; }
          .data-table th, .data-table td { padding: 0.85rem 1rem; }
        }
      `}</style>

      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <h1>Water Quality Reports</h1>
          <p>Browse published water-quality test reports from your area.</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-input-wrap">
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#64748b', display: 'flex' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by sample ID or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select
            className="filter-select"
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
          >
            <option value="all">All Source Types</option>
            {sourceTypes.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <div className="view-toggle">
            <button
              className={viewMode === 'table' ? 'active' : ''}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              <FileBarChart size={18} />
            </button>
            <button
              className={viewMode === 'cards' ? 'active' : ''}
              onClick={() => setViewMode('cards')}
              title="Card view"
            >
              <Droplets size={18} />
            </button>
          </div>
        </div>

        {/* Results Meta */}
        <div className="meta-row">
          <span className="results-count">
            {filtered.length} published report{filtered.length === 1 ? '' : 's'}
          </span>
          <span className="published-notice">
            <Droplets size={14} /> Only published reports shown
          </span>
        </div>

        {/* Content */}
        {viewMode === 'table' ? (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Sample ID</th>
                  <th>Source Type</th>
                  <th>Location</th>
                  <th>Testing Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((r) => (
                    <tr key={r.id}>
                      <td style={{ fontWeight: 700, color: '#1e3a8a' }}>{r.sampleId}</td>
                      <td style={{ fontWeight: 500 }}>{r.sourceType}</td>
                      <td>{r.location}</td>
                      <td>{fmtDate(r.testingDate)}</td>
                      <td>
                        <span className="badge badge-success">{r.reportLabel}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link to={`/user/reports/${r.id}`} className="btn-ghost">
                          View Report
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>
                      <div className="empty-state" style={{ border: 'none', boxShadow: 'none', padding: '3rem' }}>
                        <div className="empty-icon-wrap">
                          <FileText size={28} />
                        </div>
                        <h3 style={{ color: '#0a192f', marginBottom: '0.5rem' }}>No reports found</h3>
                        <p style={{ color: '#64748b', margin: 0 }}>Try adjusting your search or filters.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="reports-grid">
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <div key={r.id} className="report-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                        Sample ID
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e3a8a' }}>{r.sampleId}</div>
                    </div>
                    <span className="badge badge-success">{r.reportLabel}</span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', fontSize: '0.9rem', color: '#1e293b', fontWeight: 500 }}>
                    <MapPin size={16} color="#64748b" /> {r.location}
                  </div>
                  
                  <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem', flex: 1 }}>
                    <span style={{ fontWeight: 600, color: '#475569' }}>{r.sourceType}</span> • Tested on {fmtDate(r.testingDate)}
                  </div>
                  
                  <Link to={`/user/reports/${r.id}`} className="btn-ghost" style={{ width: '100%' }}>
                    View Full Report
                  </Link>
                </div>
              ))
            ) : (
              <div className="empty-state" style={{ gridColumn: '1/-1' }}>
                <div className="empty-icon-wrap">
                  <FileText size={28} />
                </div>
                <h3 style={{ color: '#0a192f', marginBottom: '0.5rem' }}>No reports found</h3>
                <p style={{ color: '#64748b', margin: 0 }}>Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}