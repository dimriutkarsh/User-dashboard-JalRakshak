import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getPublishedReports } from '../data/mockReports';
import {
  loadComplaints,
  saveComplaints,
  generateComplaintId,
  resetDemoComplaints,
} from '../data/mockComplaints';
import { mockAdvisories, getActiveAdvisories } from '../data/mockAdvisories';
import { seedActivity } from '../data/mockActivity';
import { mockUser } from '../data/mockUser';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [complaints, setComplaints] = useState([]);
  const [activities, setActivities] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setComplaints(loadComplaints());
    setActivities([...seedActivity]);
  }, []);

  const addComplaint = useCallback(
    (formData) => {
      const newId = generateComplaintId(complaints);
      const now = new Date().toISOString();
      const complaint = {
        id: newId,
        category: formData.category,
        sourceType: formData.sourceType,
        location: formData.location,
        description: formData.description,
        dateNoticed: formData.dateNoticed,
        submittedAt: now,
        status: 'submitted',
        contactMethod: formData.contactMethod || 'Email',
        gpsCoordinates: formData.gpsCoordinates || null,
        photoAttachment: null,
        relatedSampleId: formData.sampleId || null,
        timeline: [{ status: 'submitted', date: now, note: 'Complaint received.' }],
        citizenUpdates: [],
        resolutionSummary: null,
        isDemoData: false,
      };

      const updated = [complaint, ...complaints];
      setComplaints(updated);
      saveComplaints(updated);

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'complaint_submitted',
        message: `You submitted complaint ${newId} regarding ${formData.category.toLowerCase()}.`,
        date: now,
        link: `/user/complaints/${newId}`,
      };
      setActivities((prev) => [newActivity, ...prev]);

      return newId;
    },
    [complaints]
  );

  const resetData = useCallback(() => {
    const fresh = resetDemoComplaints();
    setComplaints(fresh);
    setActivities([...seedActivity]);
  }, []);

  const publishedReports = getPublishedReports();
  const activeAdvisories = getActiveAdvisories();
  const userComplaints = complaints;
  const awaitingReview = complaints.filter(
    (c) => c.status === 'submitted' || c.status === 'under_review'
  );

  const value = {
    user: mockUser,
    reports: publishedReports,
    complaints,
    advisories: mockAdvisories,
    activeAdvisories,
    activities,
    userComplaints,
    awaitingReview,
    addComplaint,
    resetData,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
