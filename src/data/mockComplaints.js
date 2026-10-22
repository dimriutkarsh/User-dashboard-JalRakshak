// DEMONSTRATION DATA — These are fictional complaints for demo purposes only.

const STORAGE_KEY = 'jalrakshak_complaints';

const seedComplaints = [
  {
    id: 'JR-CMP-2026-0001',
    category: 'Unusual colour',
    sourceType: 'Tap',
    location: 'Demo Ward 12, Sector 5 (Fictional)',
    description:
      'The tap water has turned yellowish since yesterday morning. The discoloration is visible in a glass.',
    dateNoticed: '2026-09-28',
    submittedAt: '2026-09-29T10:15:00Z',
    status: 'under_review',
    contactMethod: 'Email',
    gpsCoordinates: null,
    photoAttachment: null,
    relatedSampleId: null,
    timeline: [
      { status: 'submitted', date: '2026-09-29T10:15:00Z', note: 'Complaint received.' },
      {
        status: 'under_review',
        date: '2026-10-01T09:00:00Z',
        note: 'Complaint assigned for review.',
      },
    ],
    citizenUpdates: [
      { date: '2026-10-01T09:00:00Z', message: 'Your complaint is being reviewed by the team.' },
    ],
    resolutionSummary: null,
    isDemoData: true,
  },
  {
    id: 'JR-CMP-2026-0002',
    category: 'Suspected contamination',
    sourceType: 'Hand Pump',
    location: 'Demo Village Rampur (Fictional)',
    description:
      'The hand pump water has a strong chemical smell. Multiple families in the area have noticed the same issue.',
    dateNoticed: '2026-10-02',
    submittedAt: '2026-10-03T14:30:00Z',
    status: 'sample_collection',
    contactMethod: 'Phone',
    gpsCoordinates: { lat: 28.5800, lng: 77.2300 },
    photoAttachment: null,
    relatedSampleId: 'WS-2026-0452',
    timeline: [
      { status: 'submitted', date: '2026-10-03T14:30:00Z', note: 'Complaint received.' },
      {
        status: 'under_review',
        date: '2026-10-04T10:00:00Z',
        note: 'Complaint reviewed and forwarded for sample collection.',
      },
      {
        status: 'sample_collection',
        date: '2026-10-06T08:30:00Z',
        note: 'Field officer dispatched for sample collection.',
      },
    ],
    citizenUpdates: [
      {
        date: '2026-10-04T10:00:00Z',
        message: 'Your complaint has been reviewed. A field officer will visit the location.',
      },
      {
        date: '2026-10-06T08:30:00Z',
        message: 'A water sample is being collected from the reported location.',
      },
    ],
    resolutionSummary: null,
    isDemoData: true,
  },
  {
    id: 'JR-CMP-2026-0003',
    category: 'Request for water testing',
    sourceType: 'Borewell',
    location: 'Demo Nagar Block B (Fictional)',
    description:
      'We recently installed a new borewell and would like to get the water quality tested before regular use.',
    dateNoticed: '2026-10-05',
    submittedAt: '2026-10-05T11:45:00Z',
    status: 'lab_testing',
    contactMethod: 'Email',
    gpsCoordinates: { lat: 28.6300, lng: 77.1900 },
    photoAttachment: null,
    relatedSampleId: 'WS-2026-0453',
    timeline: [
      { status: 'submitted', date: '2026-10-05T11:45:00Z', note: 'Complaint received.' },
      {
        status: 'under_review',
        date: '2026-10-06T09:00:00Z',
        note: 'Request reviewed and approved.',
      },
      {
        status: 'sample_collection',
        date: '2026-10-08T07:45:00Z',
        note: 'Sample collected from borewell site.',
      },
      {
        status: 'lab_testing',
        date: '2026-10-10T10:00:00Z',
        note: 'Sample submitted to laboratory for testing.',
      },
    ],
    citizenUpdates: [
      {
        date: '2026-10-06T09:00:00Z',
        message: 'Your testing request has been approved.',
      },
      {
        date: '2026-10-10T10:00:00Z',
        message: 'The water sample is now being tested in the laboratory.',
      },
    ],
    resolutionSummary: null,
    isDemoData: true,
  },
  {
    id: 'JR-CMP-2026-0004',
    category: 'Water supply issue',
    sourceType: 'Tap',
    location: 'Demo Colony Phase 3 (Fictional)',
    description:
      'No water supply for the last 3 days. The storage tank in the colony appears to be empty.',
    dateNoticed: '2026-09-20',
    submittedAt: '2026-09-21T08:00:00Z',
    status: 'resolved',
    contactMethod: 'Phone',
    gpsCoordinates: null,
    photoAttachment: null,
    relatedSampleId: null,
    timeline: [
      { status: 'submitted', date: '2026-09-21T08:00:00Z', note: 'Complaint received.' },
      {
        status: 'under_review',
        date: '2026-09-22T09:00:00Z',
        note: 'Forwarded to supply maintenance team.',
      },
      {
        status: 'resolved',
        date: '2026-09-24T16:00:00Z',
        note: 'Pipeline repair completed. Water supply restored.',
      },
    ],
    citizenUpdates: [
      {
        date: '2026-09-24T16:00:00Z',
        message:
          'The pipeline issue has been fixed and water supply has been restored to your area.',
      },
    ],
    resolutionSummary:
      'Pipeline repair completed on 24 Sep 2026. Normal water supply restored to Demo Colony Phase 3.',
    isDemoData: true,
  },
  {
    id: 'JR-CMP-2026-0005',
    category: 'Visible particles or sediment',
    sourceType: 'Storage Tank',
    location: 'Demo Market Area (Fictional)',
    description: 'Brown particles visible in the water from the community storage tank.',
    dateNoticed: '2026-10-10',
    submittedAt: '2026-10-10T16:20:00Z',
    status: 'submitted',
    contactMethod: 'Email',
    gpsCoordinates: null,
    photoAttachment: null,
    relatedSampleId: null,
    timeline: [
      { status: 'submitted', date: '2026-10-10T16:20:00Z', note: 'Complaint received.' },
    ],
    citizenUpdates: [],
    resolutionSummary: null,
    isDemoData: true,
  },
  {
    id: 'JR-CMP-2026-0006',
    category: 'Unusual smell or taste',
    sourceType: 'Public Water Point',
    location: 'Demo Bus Stand Area (Fictional)',
    description:
      'The public water point near the bus stand has water with a metallic taste. Multiple people have complained.',
    dateNoticed: '2026-10-08',
    submittedAt: '2026-10-09T12:00:00Z',
    status: 'rejected',
    contactMethod: 'Phone',
    gpsCoordinates: null,
    photoAttachment: null,
    relatedSampleId: null,
    timeline: [
      { status: 'submitted', date: '2026-10-09T12:00:00Z', note: 'Complaint received.' },
      {
        status: 'under_review',
        date: '2026-10-10T09:00:00Z',
        note: 'Reviewed by team.',
      },
      {
        status: 'rejected',
        date: '2026-10-11T14:00:00Z',
        note: 'Duplicate of an existing complaint already under investigation.',
      },
    ],
    citizenUpdates: [
      {
        date: '2026-10-11T14:00:00Z',
        message:
          'This complaint was identified as a duplicate. Please track complaint JR-CMP-2026-0002 for updates on this issue.',
      },
    ],
    resolutionSummary: null,
    isDemoData: true,
  },
];

export const complaintCategories = [
  'Unusual colour',
  'Unusual smell or taste',
  'Visible particles or sediment',
  'Suspected contamination',
  'Water supply issue',
  'Request for water testing',
  'Other',
];

export const complaintSourceTypes = [
  'Tap',
  'Hand Pump',
  'Borewell',
  'Storage Tank',
  'Public Water Point',
  'River or Stream',
  'Other',
];

export const statusLabels = {
  submitted: 'Submitted',
  under_review: 'Under Review',
  sample_collection: 'Sample Collection',
  lab_testing: 'Laboratory Testing',
  resolved: 'Resolved',
  rejected: 'Closed — Not Approved',
};

export const statusOrder = [
  'submitted',
  'under_review',
  'sample_collection',
  'lab_testing',
  'resolved',
];

export function loadComplaints() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fall through to seed
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedComplaints));
  return [...seedComplaints];
}

export function saveComplaints(complaints) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
}

export function generateComplaintId(complaints) {
  const existing = complaints.map((c) => {
    const match = c.id.match(/JR-CMP-2026-(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  });
  const next = Math.max(0, ...existing) + 1;
  return `JR-CMP-2026-${String(next).padStart(4, '0')}`;
}

export function resetDemoComplaints() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(seedComplaints));
  return [...seedComplaints];
}
