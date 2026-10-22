import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Advisories from './pages/Advisories';
import Reports from './pages/Reports';
import ComplaintsNew from './pages/ComplaintsNew';
import ComplaintsList from './pages/ComplaintsList';
import ComplaintDetail from './pages/ComplaintDetail';
import MapPage from './pages/MapPage';
import GuidePage from './pages/GuidePage';
import ProfilePage from './pages/ProfilePage';
import { ToastProvider } from './components/ui/Toast';

function App() {
  return (
    <ToastProvider>
      <AppProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/user/dashboard" replace />} />
            <Route path="/user" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="advisories" element={<Advisories />} />
              <Route path="reports" element={<Reports />} />
              <Route path="reports/:id" element={<Reports />} />
              <Route path="complaints/new" element={<ComplaintsNew />} />
              <Route path="complaints" element={<ComplaintsList />} />
              <Route path="complaints/:id" element={<ComplaintDetail />} />
              <Route path="map" element={<MapPage />} />
              <Route path="guide" element={<GuidePage />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
            <Route path="*" element={<Navigate to="/user/dashboard" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </ToastProvider>
  );
}

export default App;