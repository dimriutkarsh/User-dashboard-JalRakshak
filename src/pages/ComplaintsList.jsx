import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileText, AlertTriangle, Clock, MapPin, Search, RefreshCw, Plus, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import React from 'react';

export default function ComplaintsList() {
  const { complaints } = useApp();
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  const statusLabels = {
    submitted: 'Submitted',
    under_review: 'Under Review',
    sample_collection: 'Sample Collection',
    lab_testing: 'Laboratory Testing',
    resolved: 'Resolved',
    rejected: 'Closed — Not Approved',
  };

  const filtered = [...complaints]
    .filter((c) => {
      const matchSearch = c.id.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || c.status === statusFilter;
      return matchSearch && matchStatus;
    })
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Custom color mapping for statuses
  const getStatusStyle = (status) => {
    switch (status) {
      case 'submitted':
        return { bg: '#e0f2fe', color: '#0369a1', icon: <Clock size={14} /> };
      case 'under_review':
        return { bg: '#fef3c7', color: '#b45309', icon: <RefreshCw size={14} /> };
      case 'sample_collection':
        return { bg: '#e0e7ff', color: '#3730a3', icon: <MapPin size={14} /> };
      case 'lab_testing':
        return { bg: '#f3e8ff', color: '#6b21a8', icon: <FileText size={14} /> };
      case 'resolved':
        return { bg: '#dcfce7', color: '#15803d', icon: <CheckCircle2 size={14} /> };
      case 'rejected':
        return { bg: '#fee2e2', color: '#b91c1c', icon: <XCircle size={14} /> };
      default:
        return { bg: '#f1f5f9', color: '#475569', icon: <FileText size={14} /> };
    }
  };

  return (
    <div className="complaints-wrapper">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <style>{`
        .complaints-wrapper {
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

        /* Header */
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 16px;
        }
        .header-text h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .header-text p {
          font-size: 1rem;
          color: #475569;
          margin: 0;
        }

        .btn-primary {
          background: #1e3a8a;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
        }
        .btn-primary:hover {
          background: #152c6b;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(30, 58, 138, 0.3);
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

        /* Results Meta */
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

        /* Complaints Grid */
        .complaints-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.5rem;
        }

        .complaint-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 1.5rem;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.05);
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
          display: flex;
          flex-direction: column;
        }
        .complaint-card:hover {
          transform: translateY(-4px);
          border-color: #bfdbfe;
          box-shadow: 0 20px 40px -10px rgba(30, 58, 138, 0.15);
        }

        .complaint-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.25rem;
        }

        .id-badge {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 4px;
        }
        
        .complaint-id {
          font-size: 1.1rem;
          font-weight: 800;
          color: #1e3a8a;
        }

        .status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .complaint-body {
          flex: 1;
          margin-bottom: 1.5rem;
        }

        .complaint-category {
          font-size: 1rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 0.5rem;
        }

        .complaint-location {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          color: #64748b;
          margin-bottom: 0.5rem;
        }

        .complaint-date {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .btn-outline-view {
          width: 100%;
          padding: 0.75rem;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          color: #1e3a8a;
          font-weight: 600;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-outline-view:hover {
          background: #f8fafc;
          border-color: #1e3a8a;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.05);
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
        .empty-state h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.5rem;
        }
        .empty-state p {
          color: #64748b;
          margin: 0 0 1.5rem;
        }

        @media (max-width: 768px) {
          .complaints-wrapper { padding: 1rem; }
          .page-header h1 { font-size: 1.75rem; }
          .search-filters { flex-direction: column; }
          .search-input-wrap { width: 100%; }
          .filter-select { width: 100%; }
        }
      `}</style>

      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <div className="header-text">
            <h1>My Complaints</h1>
            <p>Track the status of water-quality complaints you have submitted.</p>
          </div>
          <Link to="/user/complaints/new" className="btn-primary">
            <Plus size={18} /> File New Complaint
          </Link>
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-input-wrap">
            <div style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by complaint ID or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="submitted">Submitted</option>
            <option value="under_review">Under Review</option>
            <option value="sample_collection">Sample Collection</option>
            <option value="lab_testing">Laboratory Testing</option>
            <option value="resolved">Resolved</option>
            <option value="rejected">Closed — Not Approved</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="meta-row">
          <span className="results-count">
            {filtered.length} complaint{filtered.length === 1 ? '' : 's'} found
          </span>
        </div>

        {/* Complaints Grid / Empty State */}
        {filtered.length > 0 ? (
          <div className="complaints-grid">
            {filtered.map((c) => {
              const statusStyle = getStatusStyle(c.status);
              
              return (
                <div key={c.id} className="complaint-card">
                  <div className="complaint-card-header">
                    <div>
                      <div className="id-badge">Complaint ID</div>
                      <div className="complaint-id">{c.id}</div>
                    </div>
                    <span 
                      className="status-pill" 
                      style={{ backgroundColor: statusStyle.bg, color: statusStyle.color }}
                    >
                      {statusStyle.icon} {statusLabels[c.status] || c.status}
                    </span>
                  </div>

                  <div className="complaint-body">
                    <div className="complaint-category">{c.category}</div>
                    <div className="complaint-location">
                      <MapPin size={15} /> {c.location}
                    </div>
                    <div className="complaint-date">
                      Submitted on {fmtDate(c.submittedAt)}
                    </div>
                  </div>

                  <Link to={`/user/complaints/${c.id}`} className="btn-outline-view">
                    View Details <ChevronRight size={16} />
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon-wrap">
              <FileText size={32} />
            </div>
            <h3>No complaints found</h3>
            <p>Try adjusting your search or submit a new complaint.</p>
            <Link to="/user/complaints/new" className="btn-primary" style={{ display: 'inline-flex', margin: '0 auto' }}>
              <Plus size={16} /> Submit New Complaint
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}