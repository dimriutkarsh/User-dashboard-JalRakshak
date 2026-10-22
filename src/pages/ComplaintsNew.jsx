import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useToast } from '../components/ui/Toast';
import { MapPin, AlertCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function ComplaintsNew() {
  const { addComplaint } = useApp();
  const { showToast } = useToast();
  
  const initialState = {
    category: '',
    sourceType: 'Tap',
    location: '',
    description: '',
    dateNoticed: new Date().toISOString().split('T')[0],
    contactMethod: 'Email',
    gpsCoordinates: null,
    sampleId: '',
    preferredMethod: 'Email',
    _submitting: false,
  };

  const [form, setForm] = useState(initialState);

  const categories = [
    'Unusual colour',
    'Unusual smell or taste',
    'Visible particles or sediment',
    'Suspected contamination',
    'Water supply issue',
    'Request for water testing',
    'Other',
  ];
  const sourceTypes = [
    'Tap', 'Hand Pump', 'Borewell', 'Storage Tank', 'Public Water Point', 'River or Stream', 'Other',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!form.category) {
      alert('Please select a complaint category.');
      return false;
    }
    if (!form.sourceType) {
      alert('Please select a water-source type.');
      return false;
    }
    if (!form.location.trim()) {
      alert('Please enter a location or address.');
      return false;
    }
    if (!form.description.trim() || form.description.length < 10) {
      alert('Description must be at least 10 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setForm((prev) => ({ ...prev, _submitting: true }));

    try {
      const newId = addComplaint({
        category: form.category,
        sourceType: form.sourceType,
        location: form.location,
        description: form.description,
        dateNoticed: form.dateNoticed,
        contactMethod: form.contactMethod,
        gpsCoordinates: form.gpsCoordinates,
        sampleId: form.sampleId,
        preferredMethod: form.preferredMethod,
      });

      showToast(`Complaint submitted successfully! ID: ${newId}`, 'success');
      window.location.href = `/user/complaints/${newId}`;
    } catch (err) {
      console.error(err);
      showToast('Error submitting complaint. Please try again.', 'error');
      setForm((prev) => ({ ...prev, _submitting: false }));
    }
  };

  return (
    <div className="complaint-wrapper">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <style>{`
        .complaint-wrapper {
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
          max-width: 900px;
          margin: 0 auto;
        }

        /* Page Header */
        .page-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .page-header h1 {
          font-size: 2rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .page-header p {
          font-size: 1rem;
          color: #475569;
          margin: 0;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Form Card */
        .form-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(10, 25, 47, 0.08);
          overflow: hidden;
        }

        .card-header-modern {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .card-header-modern h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 700;
          color: #0a192f;
        }

        .card-body-modern {
          padding: 2rem;
        }

        /* Section Headers */
        .form-section {
          margin-bottom: 2rem;
        }
        .form-section:last-child {
          margin-bottom: 0;
        }
        .section-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: #1e3a8a;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
          padding-bottom: 0.5rem;
          border-bottom: 1px dashed #cbd5e1;
        }

        /* Grid Layout */
        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        .form-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 768px) {
          .form-grid-2, .form-grid-3 { grid-template-columns: 1fr; }
          .complaint-wrapper { padding: 1rem; }
          .page-header h1 { font-size: 1.75rem; }
          .card-body-modern { padding: 1.5rem; }
        }

        /* Form Elements */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #1e293b;
        }
        .required {
          color: #ef4444;
          margin-left: 2px;
        }

        .form-control {
          width: 100%;
          padding: 0.85rem 1rem;
          border-radius: 12px;
          border: 1px solid #cbd5e1;
          background: #ffffff;
          font-size: 0.95rem;
          color: #0a192f;
          transition: all 0.2s ease;
          outline: none;
          font-family: inherit;
        }
        .form-control::placeholder {
          color: #94a3b8;
        }
        .form-control:focus {
          border-color: #1e3a8a;
          box-shadow: 0 0 0 4px rgba(30, 58, 138, 0.1);
        }
        
        select.form-control {
          appearance: none;
          background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230a192f%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
          background-repeat: no-repeat;
          background-position: right 1rem top 50%;
          background-size: 0.65rem auto;
          cursor: pointer;
        }

        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }

        /* Form Footer */
        .form-footer {
          padding: 1.5rem 2rem;
          background: #f8fafc;
          border-top: 1px solid #e2e8f0;
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
        }

        /* Buttons */
        .btn-outline {
          background: #ffffff;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .btn-outline:hover {
          background: #f1f5f9;
          color: #0a192f;
          border-color: #94a3b8;
        }

        .btn-primary {
          background: #1e3a8a;
          color: #ffffff;
          border: none;
          padding: 0.75rem 1.75rem;
          border-radius: 12px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-primary:hover:not(:disabled) {
          background: #152c6b;
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(30, 58, 138, 0.3);
        }
        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

      `}</style>

      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <h1>Report a Water Quality Concern</h1>
          <p>Share details about a water-quality issue so it can be reviewed by the appropriate team.</p>
        </div>

        {/* Form Card */}
        <div className="form-card">
          <div className="card-header-modern">
            <FileText size={22} color="#1e3a8a" />
            <h2>Complaint Submission Form</h2>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="card-body-modern">
              
              {/* Section 1: Issue Details */}
              <div className="form-section">
                <div className="section-title">
                  <AlertCircle size={16} /> Issue Details
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="category">
                      Complaint Category <span className="required">*</span>
                    </label>
                    <select
                      name="category"
                      id="category"
                      className="form-control"
                      value={form.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select category...</option>
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="sourceType">
                      Water-Source Type <span className="required">*</span>
                    </label>
                    <select
                      name="sourceType"
                      id="sourceType"
                      className="form-control"
                      value={form.sourceType}
                      onChange={handleChange}
                      required
                    >
                      {sourceTypes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Location & Timing */}
              <div className="form-section">
                <div className="section-title">
                  <MapPin size={16} /> Location & Timing
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="location">
                      Location or Address <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      id="location"
                      className="form-control"
                      value={form.location}
                      onChange={handleChange}
                      placeholder="e.g., Sector 5, Ward 12 or Street name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dateNoticed">Date Noticed</label>
                    <input
                      type="date"
                      name="dateNoticed"
                      id="dateNoticed"
                      className="form-control"
                      value={form.dateNoticed}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Description */}
              <div className="form-section">
                <div className="section-title">
                  <FileText size={16} /> Describe the Issue
                </div>
                <div className="form-group">
                  <label htmlFor="description">
                    Detailed Description <span className="required">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    className="form-control"
                    rows="4"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Please provide as much detail as possible (e.g., colour, smell, when it started). Minimum 10 characters."
                    required
                  ></textarea>
                </div>
              </div>

              {/* Section 4: Contact Preferences */}
              <div className="form-section">
                <div className="section-title">
                  <CheckCircle2 size={16} /> Contact Preferences
                </div>
                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="contactMethod">Preferred Contact Method</label>
                    <select
                      name="contactMethod"
                      id="contactMethod"
                      className="form-control"
                      value={form.contactMethod}
                      onChange={handleChange}
                    >
                      <option value="Email">Email</option>
                      <option value="Phone">Phone</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="form-footer">
              <button
                type="button"
                className="btn-outline"
                onClick={() => setForm(initialState)}
                disabled={form._submitting}
              >
                Reset Form
              </button>
              <button type="submit" className="btn-primary" disabled={form._submitting}>
                {form._submitting ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}