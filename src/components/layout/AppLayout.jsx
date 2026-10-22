import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { AlertTriangle } from 'lucide-react';

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-wrapper">
        <Topbar />
        <div className="main-content">
          <div className="demo-banner">
            <AlertTriangle size={16} /> Demonstration Mode — Data is stored locally and is not sent to an official authority.
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}