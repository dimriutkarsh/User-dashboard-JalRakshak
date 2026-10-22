import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  Droplets,
  Bell,
  User,
  RotateCcw,
  LogOut,
  ChevronDown,
} from 'lucide-react';

export default function Topbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, setSidebarOpen, resetData } = useApp();

  const initials = user?.name
    ? user.name.split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'CN';

  return (
    <header className="navy-topbar">
      {/* Scoped Styles for the Topbar */}
      <style>{`
        .navy-topbar {
          height: 72px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.5rem;
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'Inter', -apple-system, sans-serif;
          box-shadow: 0 4px 6px -1px rgba(10, 25, 47, 0.02);
        }

        .topbar-left, .topbar-right {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        /* Logo */
        .topbar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }
        .logo-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #1e3a8a; /* Navy Blue */
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 4px 10px rgba(30, 58, 138, 0.2);
        }
        .logo-text h1 {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .logo-text .subtitle {
          font-size: 0.72rem;
          font-weight: 500;
          color: #64748b;
          margin-top: 2px;
        }

        /* Icon Buttons */
        .icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .icon-btn:hover {
          background: #f8fafc;
          color: #1e3a8a;
          border-color: #e2e8f0;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
          display: none;
        }
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex;
          }
        }

        /* User Menu Area */
        .user-menu-wrap {
          position: relative;
        }
        
        .user-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px 6px 6px;
          border-radius: 999px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .user-btn:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e0e7ff;
          color: #1e3a8a;
          font-size: 0.8rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #c7d2fe;
        }

        .user-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #0a192f;
        }
        @media (max-width: 600px) {
          .user-name { display: none; }
        }

        .chevron-icon {
          color: #64748b;
          transition: transform 0.2s ease;
        }
        .user-btn[aria-expanded="true"] .chevron-icon {
          transform: rotate(180deg);
        }

        /* Dropdown */
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 220px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 10px 25px -5px rgba(10, 25, 47, 0.1);
          padding: 0.5rem;
          z-index: 200;
          animation: dropdownFade 0.2s ease;
        }

        @keyframes dropdownFade {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: none;
          background: transparent;
          color: #1e293b;
          font-size: 0.88rem;
          font-weight: 500;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease;
        }
        
        .dropdown-item:hover {
          background: #f8fafc;
          color: #1e3a8a;
        }

        .dropdown-item.danger {
          color: #dc2626;
        }
        .dropdown-item.danger:hover {
          background: #fef2f2;
          color: #b91c1c;
        }

        .dropdown-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0.5rem 0;
        }
      `}</style>

      <div className="topbar-left">
        <button
          className="icon-btn mobile-menu-btn"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
        
        <div className="topbar-logo">
          <div className="logo-icon-wrap">
            <Droplets size={22} />
          </div>
          <div className="logo-text">
            <h1>JalRakshak</h1>
            <div className="subtitle">Citizen Water Quality Portal</div>
          </div>
        </div>
      </div>

      <div className="topbar-right">
        <button className="icon-btn" aria-label="Notifications" title="Notifications">
          <Bell size={20} />
        </button>
        
        <div className="user-menu-wrap">
          <button
            className="user-btn"
            onClick={() => setUserMenuOpen((v) => !v)}
            aria-haspopup="menu"
            aria-expanded={userMenuOpen}
          >
            <div className="avatar">{initials}</div>
            <span className="user-name">{user?.name || 'Citizen User'}</span>
            <ChevronDown size={14} className="chevron-icon" />
          </button>

          {userMenuOpen && (
            <>
              {/* Invisible overlay to close menu when clicking outside */}
              <div
                style={{ position: 'fixed', inset: 0, zIndex: 150 }}
                onClick={() => setUserMenuOpen(false)}
              />
              
              <div className="nav-dropdown" role="menu">
                <Link
                  to="/user/profile"
                  className="dropdown-item"
                  onClick={() => setUserMenuOpen(false)}
                >
                  <User size={16} /> My Profile
                </Link>
                
                <button
                  className="dropdown-item"
                  onClick={() => {
                    resetData();
                    setUserMenuOpen(false);
                  }}
                >
                  <RotateCcw size={16} /> Reset Demo Data
                </button>
                
                <div className="dropdown-divider"></div>
                
                <button
                  className="dropdown-item danger"
                  onClick={() => {
                    setUserMenuOpen(false);
                    alert(
                      'Logout is not part of the demo in this static demo build. Sign in with the citizen role to continue.'
                    );
                  }}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}