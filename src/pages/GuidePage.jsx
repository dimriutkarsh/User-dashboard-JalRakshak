import { useState } from 'react';
import { AlertTriangle, FileText, BarChart3, Droplets, Shield, Play, ChevronDown, Info } from 'lucide-react';

export default function GuidePage() {
  const [expandedId, setExpandedId] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'How to Understand a Water-Quality Report',
      Icon: FileText,
      color: '#0ea5e9', // Light Blue
      content: [
        'Learn how to read pH, turbidity, TDS, and other parameters published on JalRakshak reports.',
        'Each parameter shows the measured value, its unit, and the applicable reference range.',
        'Compare the measured value against the reference range to understand if it falls within acceptable limits.',
      ],
    },
    {
      id: 2,
      title: 'Why Water May Need Laboratory Testing',
      Icon: Shield,
      color: '#10b981', // Green
      content: [
        'Some contaminants cannot be detected by sight, smell, or taste alone.',
        'Laboratory testing can identify chemical and biological hazards that screening may miss.',
        'If your water shows unusual color, odor, or sediment, request professional testing.',
      ],
    },
    {
      id: 3,
      title: 'How to Report a Suspected Water-Quality Problem',
      Icon: AlertTriangle,
      color: '#f59e0b', // Amber
      content: [
        'Use the "Submit Complaint" page to report any water-quality concern.',
        'Provide the location, category, date noticed, and a description of the issue.',
        'You will receive a unique complaint ID to track progress.',
      ],
    },
    {
      id: 4,
      title: 'How Sample Collection and Testing Work',
      Icon: Droplets,
      color: '#3b82f6', // Blue
      content: [
        'Field officers visit the reported location to collect a water sample.',
        'Samples are sent to a laboratory for analysis of key parameters.',
        'Results are published once lab confirmation is complete.',
      ],
    },
    {
      id: 5,
      title: 'Routine Parameters vs Emerging Contaminants',
      Icon: BarChart3,
      color: '#8b5cf6', // Purple
      content: [
        'Routine parameters include pH, turbidity, TDS, and electrical conductivity.',
        'Emerging contaminants like PFAS and microplastics require specialized screening.',
        'Results distinguish preliminary screening from laboratory confirmation.',
      ],
    },
    {
      id: 6,
      title: 'What PFAS and Microplastics Are',
      Icon: Shield,
      color: '#ec4899', // Pink
      content: [
        'PFAS are synthetic chemicals used in many consumer and industrial products.',
        'Microplastics are tiny plastic particles found in the environment.',
        'Specialized lab testing is needed to detect these in drinking water.',
      ],
    },
    {
      id: 7,
      title: 'Screening Results Are Not Lab Confirmation',
      Icon: Play,
      color: '#ef4444', // Red
      content: [
        'A preliminary screening gives an early indication only.',
        'Laboratory confirmation provides validated, detailed results.',
        'Always rely on lab-confirmed results before drawing conclusions about water safety.',
      ],
    },
  ];

  const toggleAccordion = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="guide-wrapper">
      {/* Ambient Background */}
      <div className="ambient-bg">
        <div className="ambient-blob blob-1" />
        <div className="ambient-blob blob-2" />
      </div>

      <style>{`
        .guide-wrapper {
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
          max-width: 1100px;
          margin: 0 auto;
        }

        /* Header */
        .page-header {
          margin-bottom: 2rem;
          text-align: center;
        }
        .page-header h1 {
          font-size: 2.25rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0 0 0.5rem;
          letter-spacing: -0.02em;
        }
        .page-header p {
          font-size: 1.05rem;
          color: #475569;
          margin: 0;
        }

        /* Accordion Grid */
        .guide-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
          margin-bottom: 3rem;
        }

        .guide-article {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(10, 25, 47, 0.03);
          transition: all 0.3s ease;
        }
        
        .guide-article:hover {
          border-color: #cbd5e1;
          box-shadow: 0 8px 24px rgba(10, 25, 47, 0.06);
        }

        .guide-article.active {
          border-color: #1e3a8a;
          box-shadow: 0 12px 32px rgba(30, 58, 138, 0.1);
        }

        .article-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          user-select: none;
        }

        .icon-wrap {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        
        .guide-article.active .icon-wrap {
          transform: scale(1.05);
        }

        .article-title {
          flex: 1;
          font-size: 1.1rem;
          font-weight: 700;
          color: #0a192f;
          margin: 0;
          transition: color 0.2s ease;
        }

        .guide-article.active .article-title {
          color: #1e3a8a;
        }

        .chevron {
          color: #94a3b8;
          transition: transform 0.3s ease;
        }

        .guide-article.active .chevron {
          transform: rotate(180deg);
          color: #1e3a8a;
        }

        .article-body {
          padding: 0 1.5rem 1.5rem 5rem;
        }

        .article-body ul {
          margin: 0;
          padding-left: 1.25rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .article-body li {
          font-size: 0.95rem;
          color: #334155;
          line-height: 1.6;
        }

        /* Video Section */
        .video-section {
          margin-top: 3rem;
          border-top: 1px solid #e2e8f0;
          padding-top: 2rem;
        }

        .video-section h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: #0a192f;
          margin: 0 0 1.5rem;
          letter-spacing: -0.01em;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 1.5rem;
        }

        .video-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(10, 25, 47, 0.03);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }

        .video-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(10, 25, 47, 0.08);
        }

        .video-thumb {
          width: 100%;
          aspect-ratio: 16/9;
          background: linear-gradient(135deg, #1e3a8a, #0ea5e9);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .play-circle {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .video-card:hover .play-circle {
          transform: scale(1.1);
          background: rgba(255, 255, 255, 0.3);
        }

        .coming-soon {
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: rgba(15, 23, 42, 0.75);
          color: #fff;
          padding: 4px 10px;
          border-radius: 99px;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          backdrop-filter: blur(4px);
        }

        .video-info {
          padding: 1.25rem;
        }

        .video-label {
          font-size: 0.7rem;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .video-title {
          font-size: 1rem;
          font-weight: 700;
          color: #0a192f;
          line-height: 1.4;
          margin: 0 0 6px;
        }

        .video-desc {
          font-size: 0.85rem;
          color: #64748b;
          margin: 0;
          line-height: 1.5;
        }

        /* Notice Box */
        .notice-box {
          margin-top: 2.5rem;
          padding: 1.5rem;
          background: #fffbeb;
          border: 1px solid #fde68a;
          border-radius: 16px;
          display: flex;
          gap: 1rem;
          align-items: flex-start;
        }

        .notice-icon {
          color: #d97706;
          flex-shrink: 0;
          margin-top: 2px;
        }

        .notice-content h3 {
          font-size: 0.95rem;
          font-weight: 700;
          color: #92400e;
          margin: 0 0 0.5rem;
        }

        .notice-content p {
          font-size: 0.9rem;
          color: #b45309;
          margin: 0;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .guide-wrapper { padding: 1rem; }
          .page-header h1 { font-size: 1.75rem; }
          .article-body { padding: 0 1.25rem 1.25rem 1.25rem; }
        }
      `}</style>

      <div className="page-content">
        {/* Header */}
        <div className="page-header">
          <h1>Water Safety Guide</h1>
          <p>Learn about water quality, testing, and how to protect your health.</p>
        </div>

        {/* Accordion Articles */}
        <div className="guide-grid">
          {articles.map((a) => {
            const isActive = expandedId === a.id;
            return (
              <div 
                key={a.id} 
                className={`guide-article ${isActive ? 'active' : ''}`}
              >
                <div 
                  className="article-header"
                  onClick={() => toggleAccordion(a.id)}
                >
                  <div 
                    className="icon-wrap" 
                    style={{ background: `${a.color}15`, color: a.color }}
                  >
                    <a.Icon size={24} />
                  </div>
                  <h3 className="article-title">{a.title}</h3>
                  <ChevronDown className="chevron" size={20} />
                </div>
                
                {isActive && (
                  <div className="article-body">
                    <ul>
                      {a.content.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Video Section */}
        <div className="video-section">
          <h2>Watch Educational Videos</h2>
          <div className="video-grid">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="video-card">
                <div className="video-thumb">
                  <div className="play-circle">
                    <Play size={24} color="#ffffff" fill="#ffffff" style={{ marginLeft: '4px' }} />
                  </div>
                  <span className="coming-soon">COMING SOON</span>
                </div>
                <div className="video-info">
                  <div className="video-label">Educational Video</div>
                  <h4 className="video-title">
                    {i === 1 ? 'JalRakshak Project Overview' : `Understanding Water Quality - Part ${i}`}
                  </h4>
                  <p className="video-desc">
                    {i === 1 ? 'Available on the dashboard.' : 'Available soon — real video link coming shortly.'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Important Notice */}
        <div className="notice-box">
          <div className="notice-icon">
            <Info size={24} />
          </div>
          <div className="notice-content">
            <h3>Important Notice</h3>
            <p>
              This guide provides general educational information about water quality. It does not constitute medical advice or an official water safety determination. Always consult local authorities and verified lab reports for decisions about drinking water safety.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}