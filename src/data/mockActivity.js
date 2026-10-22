// DEMONSTRATION DATA — Fictional activity feed

export const seedActivity = [
  {
    id: 'act-001',
    type: 'complaint_submitted',
    message: 'You submitted complaint JR-CMP-2026-0005 regarding visible particles in water.',
    date: '2026-10-10T16:20:00Z',
    link: '/user/complaints/JR-CMP-2026-0005',
  },
  {
    id: 'act-002',
    type: 'complaint_updated',
    message: 'Complaint JR-CMP-2026-0003 status updated to Laboratory Testing.',
    date: '2026-10-10T10:00:00Z',
    link: '/user/complaints/JR-CMP-2026-0003',
  },
  {
    id: 'act-003',
    type: 'advisory_published',
    message: 'New advisory published: [DEMO] Water Quality Testing Drive — Demo Nagar.',
    date: '2026-10-10T08:00:00Z',
    link: '/user/advisories',
  },
  {
    id: 'act-004',
    type: 'report_published',
    message: 'New water quality report published for Demo Market Area Stand Post.',
    date: '2026-10-06T10:00:00Z',
    link: '/user/reports',
  },
  {
    id: 'act-005',
    type: 'complaint_updated',
    message: 'Complaint JR-CMP-2026-0002 status updated to Sample Collection.',
    date: '2026-10-06T08:30:00Z',
    link: '/user/complaints/JR-CMP-2026-0002',
  },
  {
    id: 'act-006',
    type: 'complaint_updated',
    message: 'Complaint JR-CMP-2026-0004 has been resolved. Water supply restored.',
    date: '2026-09-24T16:00:00Z',
    link: '/user/complaints/JR-CMP-2026-0004',
  },
];

export const activityIcons = {
  complaint_submitted: 'FileText',
  complaint_updated: 'RefreshCw',
  advisory_published: 'AlertTriangle',
  report_published: 'FileBarChart',
};
