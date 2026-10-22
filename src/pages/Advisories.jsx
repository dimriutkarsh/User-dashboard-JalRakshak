import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { AlertTriangle, Clock, MapPin, ChevronRight, Search } from 'lucide-react';

export default function Advisories() {
  const { advisories } = useApp();
  const [search, setSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const filtered = [...advisories]
    .filter((a) => {
      const matchSearch =
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.location.toLowerCase().includes(search.toLowerCase()) ||
        a.summary.toLowerCase().includes(search.toLowerCase());
      const matchSeverity = severityFilter === 'all' || a.severity === severityFilter;
      const matchStatus = statusFilter === 'all' || a.status === statusFilter;
      return matchSearch && matchSeverity && matchStatus;
    })
    .sort((a, b) => {
      const da = new Date(a.publishedAt).getTime();
      const db = new Date(b.publishedAt).getTime();
      return sortOrder === 'newest' ? db - da : da - db;
    });

  const severityLabels = { information: 'Information', caution: 'Caution', urgent: 'Urgent' };
  const statusLabels = { published: 'Active', expired: 'Expired', archived: 'Archived' };
  const severityBadge = { information: 'badge badge-info', caution: 'badge badge-caution', urgent: 'badge badge-urgent' };

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div className="advisories-wrapper">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
        <div className="ambient-blob blob-3" />
      </div>

      <style>{`
        .advisories-wrapper {
          position: relative;
          min-height: 100vh;
          padding: 2rem;
          background: #f8fafc;
          overflow: hidden;
        }

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
          opacity: 0.4;
          animation: floatBlob 18s ease-in-out infinite;
        }
        .blob-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, #38bdf8 0%, transparent 70%);
          top: -180px; left: -160px;
        }
        .blob-2 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #22d3ee 0%, transparent 70%);
          top: 40%; right: -180px;
          animation-delay: -6s;
        }
        .blob-3 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, #60a5fa 0%, transparent 70%);
          bottom: -160px; left: 30%;
          animation-delay: -12s;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(30px, -30px) scale(1.08); }
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
          color: #0f172a;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .page-header p {
          font-size: 1rem;
          color: #64748b;
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
          border: 1px solid #e2e8f0;
          background: #ffffff;
          font-size: 0.95rem;
          color: #1e293b;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          outline: none;
        }
        .search-input-wrap input:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
        }

        .filter-select {
          padding: 0.85rem 2.5rem 0.85rem 1rem;
          border-radius: 14px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          font-size: 0.95rem;
          color: #1e293b;
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem top 50%;
          background-size: 0.65rem auto;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .filter-select:focus {
          border-color: #38bdf8;
          box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
        }

        /* Meta row */
        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 10px;
        }
        .results-count {
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
        }
        .demo-warning {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #fef3c7;
          color: #b45309;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        /* Advisory Grid */
        .advisory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 1.5rem;
        }
        
        .advisory-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: rgba(255, 255, 255, 0.65);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(2, 132, 199, 0.08);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        
        .advisory-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(2, 132, 199, 0.15);
        }

        .advisory-card-top {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }

        .advisory-card h3 {
          margin: 0 0 0.5rem;
          font-size: 1.15rem;
          font-weight: 700;
          color: #0f172a;
          line-height: 1.4;
        }

        .advisory-card .location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.85rem;
        }

        .advisory-card .summary {
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          flex: 1;
        }

        .advisory-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px dashed #e2e8f0;
        }

        .advisory-card-footer .date {
          font-size: 0.8rem;
          color: #94a3b8;
          font-weight: 500;
        }

        .btn-ghost {
          background: #f0f9ff;
          border: none;
          color: #0284c7;
          font-weight: 700;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          padding: 6px 14px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .btn-ghost:hover {
          background: #e0f2fe;
          transform: translateX(2px);
        }

        .advisory-demo-label {
          position: absolute;
          bottom: 0.5rem;
          left: 0;
          right: 0;
          text-align: center;
          font-size: 0.6rem;
          color: #cbd5e1;
          letter-spacing: 0.05em;
          pointer-events: none;
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
        .badge-info     { background: #e0f2fe; color: #0369a1; }
        .badge-caution  { background: #fef3c7; color: #b45309; }
        .badge-urgent   { background: #fee2e2; color: #b91c1c; }
        .badge-neutral  { background: #f1f5f9; color: #475569; }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(12px);
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
          color: #94a3b8;
        }
        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0 0 0.5rem;
        }
        .empty-state p {
          color: #64748b;
          margin: 0;
        }

        @media (max-width: 768px) {
          .advisories-wrapper { padding: 1rem; }
          .page-header h1 { font-size: 1.75rem; }
          .search-filters { flex-direction: column; }
          .search-input-wrap { width: 100%; }
          .filter-select { width: 100%; }
        }
      `}</style>

      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <h1>Public Advisories</h1>
          <p>Stay informed about water quality updates, advisories, and public notices.</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-input-wrap">
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by title, location, or keywords..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select
            className="filter-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="all">All Severities</option>
            <option value="information">Information</option>
            <option value="caution">Caution</option>
            <option value="urgent">Urgent</option>
          </select>
          
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="published">Active</option>
            <option value="expired">Expired</option>
            <option value="archived">Archived</option>
          </select>
          
          <select
            className="filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Results Meta */}
        <div className="meta-row">
          <span className="results-count">
            {filtered.length} advisory{filtered.length === 1 ? '' : 'ies'} found
          </span>
          <span className="demo-warning">
            <AlertTriangle size={14} /> DEMO DATA — NOT AN OFFICIAL ADVISORY
          </span>
        </div>

        {/* Advisories Grid / Empty State */}
        {filtered.length > 0 ? (
          <div className="advisory-grid">
            {filtered.map((adv) => (
              <div key={adv.id} className="advisory-card">
                <div className="advisory-card-top">
                  <span className={severityBadge[adv.severity]}>
                    {severityLabels[adv.severity]}
                  </span>
                  <span className="badge badge-neutral">{statusLabels[adv.status]}</span>
                </div>
                <h3>{adv.title}</h3>
                <div className="location">
                  <MapPin size={14} /> {adv.location}
                </div>
                <div className="summary">{adv.summary}</div>
                
                <div className="advisory-card-footer">
                  <span className="date">Published {fmtDate(adv.publishedAt)}</span>
                  <Link
                    to={`/user/advisories/${adv.id}`}
                    className="btn-ghost"
                  >
                    Read Details <ChevronRight size={16} />
                  </Link>
                </div>
                
                <div className="advisory-demo-label">DEMO DATA — NOT AN OFFICIAL ADVISORY</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <AlertTriangle size={32} />
            </div>
            <h3>No advisories match your filters</h3>
            <p>Try adjusting your search terms or clearing the filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}