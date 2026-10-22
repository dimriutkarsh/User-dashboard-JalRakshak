import { Link, useParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { FileText, Clock, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

export default function ComplaintDetail() {
  const { id } = useParams();
  const { complaints } = useApp();
  const complaint = complaints.find((c) => c.id === id);

  if (!complaint) {
    return (
      <div style={{padding: 60, textAlign: 'center'}}>
        <div style={{width:56,height:56,borderRadius:'50%',background:'rgba(100,116,139,0.1)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'#64748B'}}>
          <FileText size={28} />
        </div>
        <h3 style={{fontSize:'1.1rem',fontWeight:600,color:'#1D2B3A',marginBottom:'8px'}}>Complaint not found</h3>
        <p style={{color:'#64748B',fontSize:'0.85rem'}}>The complaint you are looking for could not be found.</p>
        <Link to="/user/complaints" className="btn btn-primary" style={{marginTop:'12px',padding:'10px 24px'}}>Back to Complaints</Link>
      </div>
    );
  }

  const statusMeta = {
    submitted: { Icon: FileText, label: 'Submitted', color: '#2674B8', bg: 'rgba(38,116,184,0.1)' },
    under_review: { Icon: Clock, label: 'Under Review', color: '#B7791F', bg: 'rgba(183,121,31,0.1)' },
    sample_collection: { Icon: Clock, label: 'Sample Collection', color: '#1769AA', bg: 'rgba(59,130,196,0.1)' },
    lab_testing: { Icon: RefreshCw, label: 'Laboratory Testing', color: '#1769AA', bg: 'rgba(23,105,170,0.1)' },
    resolved: { Icon: CheckCircle, label: 'Resolved', color: '#218653', bg: 'rgba(33,134,83,0.1)' },
    rejected: { Icon: XCircle, label: 'Closed — Not Approved', color: '#C43D4B', bg: 'rgba(196,61,75,0.1)' },
  };

  const meta = statusMeta[complaint.status] || statusMeta.submitted;
  const StatusIcon = meta.Icon;

  const fmtDate = (d) =>
    new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  const fmtDateTime = (d) =>
    new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

  return (
    <div style={{paddingBottom:'40px'}}>
      <div style={{marginBottom:'20px',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'12px'}}>
        <div>
          <h1 style={{fontSize:'1.3rem',fontWeight:700,color:'#12345A'}}>{complaint.id}</h1>
          <p style={{color:'#64748B',fontSize:'0.85rem',marginTop:'2px'}}>Complaint details and status timeline</p>
        </div>
        <span style={{background: meta.bg, color: meta.color, padding:'6px 14px', fontSize:'0.8rem', fontWeight:600, borderRadius:'20px', display:'inline-flex', alignItems:'center', gap:'8px'}}>
          <StatusIcon size={14} />
          {meta.label}
        </span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(250px,1fr))',gap:'16px',marginBottom:'24px'}}>
        <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'16px'}}>
          <div style={{fontSize:'0.75rem',color:'#64748B',marginBottom:'4px'}}>Category</div>
          <div style={{fontSize:'0.9rem',fontWeight:600,color:'#1D2B3A'}}>{complaint.category}</div>
        </div>
        <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'16px'}}>
          <div style={{fontSize:'0.75rem',color:'#64748B',marginBottom:'4px'}}>Source Type</div>
          <div style={{fontSize:'0.9rem',fontWeight:600,color:'#1D2B3A'}}>{complaint.sourceType}</div>
        </div>
        <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'16px'}}>
          <div style={{fontSize:'0.75rem',color:'#64748B',marginBottom:'4px'}}>Location</div>
          <div style={{fontSize:'0.9rem',fontWeight:600,color:'#1D2B3A'}}>{complaint.location}</div>
        </div>
        <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'16px'}}>
          <div style={{fontSize:'0.75rem',color:'#64748B',marginBottom:'4px'}}>Date Noticed</div>
          <div style={{fontSize:'0.9rem',fontWeight:600,color:'#1D2B3A'}}>{fmtDate(complaint.dateNoticed)}</div>
        </div>
        {complaint.relatedSampleId && (
          <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'16px'}}>
            <div style={{fontSize:'0.75rem',color:'#64748B',marginBottom:'4px'}}>Related Sample</div>
            <div style={{fontSize:'0.9rem',fontWeight:600,color:'#1769AA'}}>{complaint.relatedSampleId}</div>
          </div>
        )}
      </div>

      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:'16px',alignItems:'start'}}>
        <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',overflow:'hidden'}}>
          <div style={{padding:'16px 20px',borderBottom:'1px solid #DCE6F0'}}>
            <h2 style={{fontSize:'1rem',fontWeight:600,color:'#12345A',marginBottom:'0'}}>Status Timeline</h2>
          </div>
          <div style={{padding:'0 20px'}}>
            {complaint.timeline?.length > 0 ? (
              <div style={{position:'relative',paddingLeft:'32px',paddingTop:'20px'}}>
                <div style={{position:'absolute',left:'14px',top:'20px',bottom:'20px',width:'2px',background:'#DCE6F0'}} />
                {complaint.timeline.map((t, i) => (
                  <div key={i} style={{position:'relative',marginBottom:'18px'}}>
                    <div style={{position:'absolute',left:'-26px',top:'4px',width:'14px',height:'14px',borderRadius:'50%',border:'2px solid #DCE6F0',background: i === complaint.timeline.length-1 ? '#1769AA' : '#218653',borderColor: i === complaint.timeline.length-1 ? '#1769AA' : '#218653'}} />
                    <h4 style={{fontSize:'0.88rem',fontWeight:600,color:'#1D2B3A',marginBottom:'2px'}}>{t.status.replace('_',' ').replace(/^\w/, (c)=>c.toUpperCase())}</h4>
                    <div style={{fontSize:'0.78rem',color:'#64748B',marginBottom:'4px'}}>{fmtDateTime(t.date)}</div>
                    <div style={{fontSize:'0.82rem',color:'#64748B'}}>{t.note}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{color:'#64748B',fontSize:'0.85rem',padding:'16px'}}>No timeline updates available yet.</p>
            )}
          </div>
        </div>

        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
          <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'20px'}}>
            <h3 style={{fontSize:'1rem',fontWeight:600,color:'#1D2B3A',marginBottom:'14px'}}>Description</h3>
            <div style={{fontSize:'0.88rem',color:'#1D2B3A',lineHeight:1.6}}>{complaint.description}</div>
          </div>

          {complaint.citizenUpdates?.length > 0 && (
            <div style={{background:'#fff',border:'1px solid #DCE6F0',borderRadius:'14px',padding:'20px'}}>
              <h3 style={{fontSize:'1rem',fontWeight:600,color:'#1D2B3A',marginBottom:'14px'}}>Updates from Officials</h3>
              {complaint.citizenUpdates.map((u, i) => (
                <div key={i} style={{fontSize:'0.85rem',color:'#1D2B3A',marginBottom:'10px',lineHeight:1.5}}>
                  {u.message}
                  <div style={{fontSize:'0.75rem',color:'#64748B',marginTop:'2px'}}>{fmtDateTime(u.date)}</div>
                </div>
              ))}
            </div>
          )}

          {complaint.resolutionSummary && (
            <div style={{background:'rgba(33,134,83,0.06)',border:'1px solid rgba(33,134,83,0.2)',borderRadius:'14px',padding:'20px'}}>
              <h3 style={{fontSize:'1rem',fontWeight:600,color:'#218653',marginBottom:'8px'}}>Resolution Summary</h3>
              <p style={{fontSize:'0.88rem',color:'#1D2B3A'}}>{complaint.resolutionSummary}</p>
            </div>
          )}
        </div>
      </div>

      <div style={{marginTop:'24px',display:'flex',gap:'10px'}}>
        <Link to="/user/complaints" className="btn btn-outline" style={{width:'auto',padding:'10px 20px'}}>Back to Complaints</Link>
        <button className="btn btn-primary" style={{width:'auto',padding:'10px 20px'}}>Add Additional Information</button>
      </div>
    </div>
  );
}
