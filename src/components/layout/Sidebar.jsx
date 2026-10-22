import { NavLink } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Droplets,
  LayoutDashboard,
  AlertTriangle,
  FileBarChart,
  PenSquare,
  Search,
  MapPin,
  BookOpen,
  User,
} from 'lucide-react';

const navItems = [
  { path: '/user/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/user/advisories', label: 'Public Advisories', icon: AlertTriangle },
  { path: '/user/reports', label: 'Water Quality Reports', icon: FileBarChart },
  { path: '/user/complaints/new', label: 'Submit Complaint', icon: PenSquare },
  { path: '/user/complaints', label: 'Track Complaint', icon: Search },
  { path: '/user/map', label: 'Water Sources Map', icon: MapPin },
  { path: '/user/guide', label: 'Water Safety Guide', icon: BookOpen },
  { path: '/user/profile', label: 'My Profile', icon: User },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useApp();

  return (
    <>
      <style>{`
        .custom-sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          transition: transform 0.3s ease;
          font-family: 'Inter', -apple-system, sans-serif;
          box-shadow: 4px 0 24px rgba(10, 25, 47, 0.02);
        }

        /* Mobile Responsiveness */
        @media (max-width: 1024px) {
          .custom-sidebar {
            transform: translateX(-100%);
          }
          .custom-sidebar.open {
            transform: translateX(0);
          }
        }

        /* Sidebar Header (Logo Area) */
        .sidebar-header-custom {
          height: 72px;
          display: flex;
          align-items: center;
          padding: 0 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          gap: 12px;
        }

        .sidebar-logo-icon-custom {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #1e3a8a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(30, 58, 138, 0.2);
        }

        .sidebar-header-custom h2 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0;
          letter-spacing: -0.02em;
        }

        /* Navigation Links */
        .sidebar-nav-custom {
          flex: 1;
          padding: 1.5rem 1rem;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        /* Custom Scrollbar */
        .sidebar-nav-custom::-webkit-scrollbar {
          width: 4px;
        }
        .sidebar-nav-custom::-webkit-scrollbar-track {
          background: transparent;
        }
        .sidebar-nav-custom::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }

        .nav-link-custom {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          color: #475569;
          font-size: 0.95rem;
          font-weight: 500;
          text-decoration: none;
          transition: all 0.2s ease;
          position: relative;
        }

        .nav-link-custom:hover {
          background: #f8fafc;
          color: #1e3a8a;
        }

        .nav-link-custom:hover .nav-icon {
          transform: scale(1.1);
          color: #1e3a8a;
        }

        /* Active State */
        .nav-link-custom.active {
          background: #e0e7ff; /* Soft blue background */
          color: #1e3a8a;
          font-weight: 700;
        }

        /* Navy Blue Left Accent for Active Item */
        .nav-link-custom.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 10%;
          height: 80%;
          width: 4px;
          background: #1e3a8a;
          border-radius: 0 4px 4px 0;
        }

        .nav-link-custom.active .nav-icon {
          color: #1e3a8a;
        }

        .nav-icon {
          color: #94a3b8;
          transition: all 0.2s ease;
        }

        /* Sidebar Footer */
        .sidebar-footer-custom {
          padding: 1.5rem;
          border-top: 1px solid #f1f5f9;
          background: #f8fafc;
        }

        .sidebar-footer-custom p {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0 0 10px;
          font-weight: 500;
        }

        .demo-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 999px;
          font-size: 0.75rem;
          font-weight: 700;
          color: #b45309;
        }

        .demo-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #f59e0b;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(245, 158, 11, 0); }
          100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
        }

        /* Overlay for Mobile */
        .sidebar-overlay-custom {
          position: fixed;
          inset: 0;
          background: rgba(10, 25, 47, 0.5);
          backdrop-filter: blur(2px);
          z-index: 999;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .sidebar-overlay-custom.visible {
          opacity: 1;
          pointer-events: auto;
        }
      `}</style>

      <aside className={`custom-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header-custom">
          <div className="sidebar-logo-icon-custom">
            <Droplets size={20} />
          </div>
          <h2>JalRakshak</h2>
        </div>

        <nav className="sidebar-nav-custom" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `nav-link-custom ${isActive ? 'active' : ''}`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="nav-icon" size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer-custom">
          <p>JalRakshak Citizen Portal</p>
          <span className="demo-badge">
            <span className="demo-dot"></span> Demonstration Mode
          </span>
        </div>
      </aside>

      <div
        className={`sidebar-overlay-custom ${sidebarOpen ? 'visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}