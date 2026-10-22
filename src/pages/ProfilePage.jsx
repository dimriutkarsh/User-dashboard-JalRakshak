import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, Building, Calendar, Droplets } from 'lucide-react';

export default function ProfilePage() {
  const { user, resetData } = useApp();
  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div style={{maxWidth:'600px',margin:'0 auto'}}>
      <div className="page-header">
        <h1>My Profile</h1>
        <p>View and manage your citizen portal profile information.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar" style={{marginBottom:'20px'}}>
          <User size={32} />
        </div>
        <div className="profile-field">
          <div className="label">Name</div>
          <div className="value">{user?.name || 'Demo Citizen'}</div>
        </div>
        <div className="profile-field">
          <div className="label">Email</div>
          <div className="value">{user?.email || 'demo.citizen@jalrakshak-demo.example'}</div>
        </div>
        <div className="profile-field">
          <div className="label">Phone</div>
          <div className="value">{user?.phone || '+91 98XXXXXX00'}</div>
        </div>
        <div className="profile-field">
          <div className="label">Preferred Locality</div>
          <div className="value">{user?.locality || 'Demo Ward 12, Sector 5'}</div>
        </div>
        <div className="profile-field">
          <div className="label">Role</div>
          <div className="value">Citizen</div>
        </div>
        <div className="profile-field">
          <div className="label">Account Created</div>
          <div className="value">{fmtDate(user?.accountCreated || '2026-08-15')}</div>
        </div>
        <div className="profile-field" style={{borderBottom:'none',paddingBottom:'0'}}>
          <div className="label">Data Mode</div>
          <div className="value" style={{color:'#B7791F',fontSize:'0.82rem',fontWeight:600,display:'flex',alignItems:'center',gap:'8px'}}>
            <span style={{background:'rgba(183,121,31,0.1)',color:'#B7791F',padding:'2px 8px',borderRadius:'10px',fontSize:'0.72rem'}}>Demonstration Mode</span>
            <span style={{fontSize:'0.7rem',color:'#64748B'}}>Local data only</span>
          </div>
        </div>
      </div>

      <div style={{marginTop:'24px',display:'flex',gap:'12px'}}>
        <button className="btn btn-outline" onClick={() => resetData()} style={{width:'auto',padding:'10px 20px'}}>Reset Demo Data</button>
        <Link to="/user/dashboard" className="btn btn-primary" style={{width:'auto',padding:'10px 20px'}}>Back to Dashboard</Link>
      </div>
    </div>
  );
}
