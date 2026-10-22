// DEMONSTRATION DATA — These are fictional advisories for demo purposes only.
// DEMO DATA — NOT AN OFFICIAL ADVISORY

export const mockAdvisories = [
  {
    id: 'JR-ADV-2026-001',
    title: '[DEMO] Routine Pipeline Maintenance — Demo Ward 12',
    summary:
      'Scheduled pipeline maintenance may cause temporary water supply interruption in Demo Ward 12 area.',
    details:
      'DEMO DATA — NOT AN OFFICIAL ADVISORY.\n\nRoutine pipeline maintenance is scheduled for the Demo Ward 12 area. Water supply may be temporarily interrupted during maintenance hours (10:00 AM – 4:00 PM). Residents are advised to store sufficient water in advance. This is a demonstration advisory created for the JalRakshak citizen portal demo.',
    location: 'Demo Ward 12, Sector 5 (Fictional)',
    severity: 'information',
    publishedAt: '2026-10-15T09:00:00Z',
    expiresAt: '2026-10-20T18:00:00Z',
    status: 'published',
    source: 'JalRakshak Demo System',
    relatedReportIds: [],
  },
  {
    id: 'JR-ADV-2026-002',
    title: '[DEMO] Elevated Turbidity Detected — Demo River Ghat',
    summary:
      'Recent testing at Demo River Ghat Point 7 showed elevated turbidity levels. Residents are advised to use alternative water sources.',
    details:
      'DEMO DATA — NOT AN OFFICIAL ADVISORY.\n\nWater samples collected from Demo River Ghat Point 7 on 25 Sep 2026 showed elevated turbidity (8.5 NTU, above the recommended ≤5 NTU). TDS levels were also above the recommended range. Further testing has been recommended. Residents relying on this water source are advised to use alternative sources until further notice. This advisory is based on demonstration data and is not an official government warning.',
    location: 'Demo River Ghat Point 7 (Fictional)',
    severity: 'caution',
    publishedAt: '2026-10-02T14:00:00Z',
    expiresAt: '2026-11-02T14:00:00Z',
    status: 'published',
    source: 'JalRakshak Demo System',
    relatedReportIds: ['JR-RPT-2026-005'],
  },
  {
    id: 'JR-ADV-2026-003',
    title: '[DEMO] Water Quality Testing Drive — Demo Nagar',
    summary:
      'A free water quality testing drive is being organized in Demo Nagar. Residents can bring water samples for basic testing.',
    details:
      'DEMO DATA — NOT AN OFFICIAL ADVISORY.\n\nThe JalRakshak team is organizing a demonstration water quality testing drive at the Demo Nagar Community Centre. Residents can bring water samples for free basic parameter testing (pH, turbidity, TDS). This is a demonstration event for the JalRakshak portal and is not a real government initiative.',
    location: 'Demo Nagar Community Centre (Fictional)',
    severity: 'information',
    publishedAt: '2026-10-10T08:00:00Z',
    expiresAt: '2026-10-25T18:00:00Z',
    status: 'published',
    source: 'JalRakshak Demo System',
    relatedReportIds: [],
  },
  {
    id: 'JR-ADV-2026-004',
    title: '[DEMO] Boil Water Notice — Demo Colony Phase 3',
    summary:
      'Following pipeline repairs, a precautionary boil water notice has been issued for Demo Colony Phase 3.',
    details:
      'DEMO DATA — NOT AN OFFICIAL ADVISORY.\n\nFollowing recent pipeline repairs in Demo Colony Phase 3, residents are advised to boil water before drinking as a precautionary measure until the next round of water quality testing is completed. This advisory will be updated after test results are available. This is a demonstration advisory created for the JalRakshak citizen portal demo.',
    location: 'Demo Colony Phase 3 (Fictional)',
    severity: 'urgent',
    publishedAt: '2026-09-25T12:00:00Z',
    expiresAt: '2026-10-05T12:00:00Z',
    status: 'expired',
    source: 'JalRakshak Demo System',
    relatedReportIds: ['JR-RPT-2026-004'],
  },
  {
    id: 'JR-ADV-2026-005',
    title: '[DEMO] Archived Advisory — Seasonal Water Alert',
    summary: 'Seasonal water quality advisory for the monsoon period. Now archived.',
    details:
      'DEMO DATA — NOT AN OFFICIAL ADVISORY.\n\nThis is an archived demonstration advisory that was issued during the monsoon season. It advised residents to be cautious about water quality during heavy rainfall periods. This advisory has been archived as the monsoon season has concluded.',
    location: 'All Demo Areas (Fictional)',
    severity: 'caution',
    publishedAt: '2026-07-01T08:00:00Z',
    expiresAt: '2026-09-30T18:00:00Z',
    status: 'archived',
    source: 'JalRakshak Demo System',
    relatedReportIds: [],
  },
];

export const getActiveAdvisories = () =>
  mockAdvisories.filter((a) => a.status === 'published');

export const severityLabels = {
  information: 'Information',
  caution: 'Caution',
  urgent: 'Urgent',
};

export const advisoryStatusLabels = {
  published: 'Active',
  expired: 'Expired',
  archived: 'Archived',
};
