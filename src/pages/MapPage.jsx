import { useState, useMemo } from 'react';
import { MapPin, Search, Filter, Compass, ChevronRight, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default Leaflet marker icons missing in React
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const INITIAL_LAT = 28.6139;
const INITIAL_LNG = 77.2090;

// Mock coordinates around New Delhi for demonstration
const MOCK_COORDS = [
  [28.6139, 77.2090],
  [28.6200, 77.2150],
  [28.6050, 77.2000],
  [28.6250, 77.1950],
  [28.6000, 77.2200],
  [28.6300, 77.2100],
  [28.5900, 77.1900],
];

export default function MapPage() {
  const { reports } = useApp();
  const [sourceFilter, setSourceFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedReport, setSelectedReport] = useState(null);

  const sourceTypes = ['Tap', 'Hand Pump', 'Borewell', 'Storage Tank', 'Public Water Point', 'River or Stream', 'Other'];

  // Enhance reports with mock coordinates if they don't have any
  const mapMarkers = useMemo(() => {
    return (reports || []).map((r, index) => {
      // Use real coords if they exist, otherwise assign a mock one based on index
      const coords = r.coordinates 
        ? [r.coordinates.lat, r.coordinates.lng] 
        : MOCK_COORDS[index % MOCK_COORDS.length];

      return {
        ...r,
        coords,
        color: r.publicationStatus === 'published' ? '#1e3a8a' : '#94a3b8',
      };
    });
  }, [reports]);

  const visibleMarkers = mapMarkers.filter((m) => {
    const matchSource = sourceFilter === 'all' || m.sourceType === sourceFilter;
    const matchSearch = search === '' || 
      m.sampleId.toLowerCase().includes(search.toLowerCase()) || 
      m.location.toLowerCase().includes(search.toLowerCase());
    return matchSource && matchSearch;
  });

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  // Custom Navy Blue Marker Icon
  const customIcon = new L.DivIcon({
    className: 'custom-div-icon',
    html: `<div style="background-color: #1e3a8a; width: 28px; height: 28px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><div style="width: 8px; height: 8px; background: white; border-radius: 50%; transform: rotate(45deg);"></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });

  return (
    <div className="map-page-wrapper">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <style>{`
        .map-page-wrapper {
          position: relative;
          min-height: 100vh;
          padding: 2rem;
          background: #f8fafc;
          overflow: hidden;
          font-family: 'Inter', -apple-system, sans-serif;
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
          margin-bottom: 1.5rem;
        }
        .page-header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .page-header p {
          font-size: 1rem;
          color: #475569;
          margin: 0;
        }

        /* Filters */
        .filter-bar {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          background: #ffffff;
          padding: 1rem;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
        }
        
        .search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 250px;
        }
        .search-input-wrap input {
          width: 100%;
          padding: 0.75rem 1rem 0.75rem 2.5rem;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 0.95rem;
          color: #0a192f;
          outline: none;
          transition: all 0.2s ease;
        }
        .search-input-wrap input:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
        }

        .filter-select {
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          font-size: 0.95rem;
          color: #0a192f;
          font-weight: 500;
          outline: none;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230a192f%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem top 50%;
          background-size: 0.65rem auto;
          transition: all 0.2s ease;
        }
        .filter-select:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
        }

        /* Map & Sidebar Layout */
        .map-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 1.5rem;
          height: 600px;
        }
        @media (max-width: 1024px) {
          .map-layout {
            grid-template-columns: 1fr;
            height: auto;
          }
        }

        /* Map Container */
        .map-container-wrap {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.05);
          overflow: hidden;
          position: relative;
          height: 100%;
          min-height: 400px;
        }
        
        .leaflet-container {
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        /* Customizing Leaflet Popup */
        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 0;
          overflow: hidden;
        }
        .leaflet-popup-content {
          margin: 0;
          width: 220px !important;
        }
        .popup-inner {
          padding: 1rem;
        }
        .popup-title {
          font-weight: 800;
          color: #1e3a8a;
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .popup-loc {
          font-size: 0.8rem;
          color: #64748b;
          margin-bottom: 8px;
        }
        .popup-btn {
          display: block;
          text-align: center;
          background: #f0f9ff;
          color: #0284c7;
          padding: 6px;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }
        .popup-btn:hover {
          background: #e0f2fe;
        }

        /* Sidebar List */
        .sidebar-list {
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.05);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          height: 100%;
        }
        .sidebar-header {
          padding: 1.25rem;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
          font-weight: 700;
          color: #0a192f;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-shrink: 0;
        }
        .sidebar-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        /* Custom Scrollbar */
        .sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .sidebar-scroll::-webkit-scrollbar-track {
          background: #f1f5f9; 
        }
        .sidebar-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1; 
          border-radius: 10px;
        }
        .sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8; 
        }

        /* List Item - Fixed to be Vertical */
        .map-list-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 1rem;
          transition: all 0.2s ease;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .map-list-item:hover, .map-list-item.active {
          border-color: #1e3a8a;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.1);
        }
        .map-list-item.active {
          background: #f8fafc;
        }

        /* Empty State */
        .empty-state {
          text-align: center;
          padding: 3rem 1rem;
          color: #64748b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
      `}</style>

      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <h1>
            <Compass size={32} color="#1e3a8a" /> Water Sources Map
          </h1>
          <p>Explore interactive geolocation data from official water-quality reports.</p>
        </div>

        {/* Filter Bar */}
        <div className="filter-bar">
          <div className="search-input-wrap">
            <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="Search by Sample ID or Location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px', color: '#64748b' }}>
            <Filter size={18} />
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
        </div>

        {/* Map Layout */}
        <div className="map-layout">
          
          {/* Left: Leaflet Map */}
          <div className="map-container-wrap">
            <MapContainer 
              center={[INITIAL_LAT, INITIAL_LNG]} 
              zoom={12} 
              scrollWheelZoom={true}
              style={{ height: '100%', width: '100%' }}
            >
              {/* Standard OpenStreetMap Tiles - No API Key Required */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              {visibleMarkers.map((m) => (
                <Marker 
                  key={m.id} 
                  position={m.coords}
                  icon={customIcon}
                  eventHandlers={{
                    click: () => setSelectedReport(m.id),
                  }}
                >
                  <Popup>
                    <div className="popup-inner">
                      <div className="popup-title">{m.sampleId}</div>
                      <div className="popup-loc">{m.location}</div>
                      <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '10px' }}>
                        <strong>{m.sourceType}</strong> • {m.reportLabel}
                      </div>
                      <Link to={`/user/reports/${m.id}`} className="popup-btn">
                        View Full Report
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Right: Sidebar List */}
          <div className="sidebar-list">
            <div className="sidebar-header">
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} /> Sample Locations
              </span>
              <span className="badge" style={{ background: '#e0e7ff', color: '#1e3a8a', padding: '4px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700 }}>
                {visibleMarkers.length} Found
              </span>
            </div>
            
            <div className="sidebar-scroll">
              {visibleMarkers.length > 0 ? (
                visibleMarkers.map((m) => (
                  <div 
                    key={m.id} 
                    className={`map-list-item ${selectedReport === m.id ? 'active' : ''}`}
                    onClick={() => setSelectedReport(m.id)}
                  >
                    {/* ID and Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1e3a8a' }}>{m.sampleId}</span>
                      <span className="badge" style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '99px', fontSize: '0.7rem', fontWeight: 700 }}>
                        {m.reportLabel}
                      </span>
                    </div>
                    
                    {/* Location */}
                    <div style={{ fontSize: '0.9rem', color: '#0f172a', fontWeight: 500, display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                      <MapPin size={16} color="#64748b" style={{ marginTop: '2px', flexShrink: 0 }} /> 
                      <span>{m.location}</span>
                    </div>
                    
                    {/* Source & Date */}
                    <div style={{ fontSize: '0.8rem', color: '#64748b', paddingLeft: '22px' }}>
                      {m.sourceType} • Tested {fmtDate(m.testingDate)}
                    </div>
                    
                    {/* Action Link */}
                    <div style={{ marginTop: '4px', paddingTop: '8px', borderTop: '1px dashed #e2e8f0' }}>
                      <Link to={`/user/reports/${m.id}`} style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1e3a8a', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}>
                        View Full Report <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <MapPin size={32} style={{ opacity: 0.2, marginBottom: '12px' }} />
                  <p>No locations match your current filters.</p>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}