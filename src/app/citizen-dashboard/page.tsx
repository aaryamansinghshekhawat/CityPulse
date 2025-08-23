'use client'
import React, { useState, useEffect } from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import { addReport, getReportsByUser, getAllAlerts, onStoreUpdate, ReportOrComplaint } from '@/lib/store';

const CitizenDashboard = () => {
  const { currentUser, userLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [myReports, setMyReports] = useState<ReportOrComplaint[]>([]);
  const [alerts, setAlerts] = useState(getAllAlerts());
  const [form, setForm] = useState({
    kind: 'Report' as 'Report' | 'Complaint',
    title: '',
    description: '',
    location: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!userLoggedIn || currentUser?.type !== 'citizen') {
      router.push('/login');
    }
  }, [userLoggedIn, currentUser, router]);

  useEffect(() => {
    if (!currentUser) return;
    setMyReports(getReportsByUser(currentUser.id));
    const off = onStoreUpdate(() => {
      if (!currentUser) return;
      setMyReports(getReportsByUser(currentUser.id));
      setAlerts(getAllAlerts());
    });
    return off;
  }, [currentUser]);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!userLoggedIn || currentUser?.type !== 'citizen') {
    return null;
  }

  const submitIssue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!form.title || !form.description) return;
    setSubmitting(true);
    try {
      addReport({
        userId: currentUser.id,
        type: form.kind,
        title: form.title,
        description: form.description,
        location: form.location
      });
      setForm({ kind: 'Report', title: '', description: '', location: '' });
      setActiveTab('reports');
    } finally {
      setSubmitting(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'reports', label: 'My Reports', icon: '📝' },
    { id: 'issues', label: 'Report/Complaint', icon: '🚨' },
    { id: 'projects', label: 'City Projects', icon: '🏗️' },
    { id: 'notifications', label: 'Alerts & Notices', icon: '🔔' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Total Submissions</p>
                    <p className="text-4xl font-bold">{myReports.length}</p>
                    <p className="text-blue-100 text-sm">Reports & complaints</p>
                  </div>
                  <div className="text-4xl opacity-80">📊</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pending Review</p>
                    <p className="text-4xl font-bold">{myReports.filter(r => r.status === 'Pending').length}</p>
                    <p className="text-yellow-100 text-sm">Awaiting action</p>
                  </div>
                  <div className="text-4xl opacity-80">⏳</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Resolved</p>
                    <p className="text-4xl font-bold">{myReports.filter(r => r.status === 'Resolved').length}</p>
                    <p className="text-green-100 text-sm">Closed items</p>
                  </div>
                  <div className="text-4xl opacity-80">✅</div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">⚡</span>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setActiveTab('issues')}
                  className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 hover:from-purple-100 hover:to-blue-100 transition-all duration-300 text-left group"
                >
                  <div className="text-2xl mb-2">🚨</div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-purple-700">Report New Issue</h4>
                  <p className="text-sm text-gray-600">Submit a report or complaint</p>
                </button>
                
                <button
                  onClick={() => setActiveTab('notifications')}
                  className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 text-left group"
                >
                  <div className="text-2xl mb-2">🔔</div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-green-700">View Alerts</h4>
                  <p className="text-sm text-gray-600">Check city notices</p>
                </button>
              </div>
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3">📝</span>
                  My Reports & Complaints
                </h3>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {myReports.length} total
                </span>
              </div>
              
              {myReports.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-lg text-gray-600 mb-2">No submissions yet</p>
                  <p className="text-sm text-gray-500">Start by reporting an issue or filing a complaint</p>
                  <button
                    onClick={() => setActiveTab('issues')}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Report Issue
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {myReports.map(r => (
                    <div key={r.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              r.type === 'Report' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {r.type}
                            </span>
                            <h4 className="font-semibold text-gray-900 text-lg">{r.title}</h4>
                          </div>
                          <p className="text-gray-600 mb-3">{r.description}</p>
                          {r.location && (
                            <p className="text-sm text-gray-500 mb-2 flex items-center">
                              <span className="mr-2">📍</span>
                              {r.location}
                            </p>
                          )}
                          <p className="text-xs text-gray-400 flex items-center">
                            <span className="mr-2">🕒</span>
                            Submitted: {new Date(r.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="ml-4">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            r.status === 'Resolved' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : r.status === 'In Progress' 
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {r.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 'issues':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🚨</span>
                Submit Report or Complaint
              </h3>
              <form onSubmit={submitIssue} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={form.kind}
                      onChange={(e) => setForm({ ...form, kind: e.target.value as 'Report' | 'Complaint' })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    >
                      <option value="Report">📋 Report</option>
                      <option value="Complaint">⚠️ Complaint</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location (optional)</label>
                    <input
                      type="text"
                      value={form.location}
                      onChange={(e) => setForm({ ...form, location: e.target.value })}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                      placeholder="Street or landmark"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                    placeholder="Brief description of the issue"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={5}
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
                    placeholder="Provide detailed information about the issue..."
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <Button 
                    variant="primary" 
                    size="md" 
                    className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300" 
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <span className="mr-2">📤</span>
                        Submit {form.kind}
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🏗️</span>
                City Projects
              </h3>
              <div className="text-center py-12">
                <div className="text-6xl mb-4 animate-pulse">🚧</div>
                <p className="text-lg text-gray-600 mb-2">Project listings coming soon</p>
                <p className="text-sm text-gray-500">Stay tuned for updates on city development projects</p>
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                  <p className="text-sm text-yellow-800">💡 Tip: Check the Alerts &amp; Notices tab for project announcements!</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <span className="mr-3">🔔</span>
                City Alerts &amp; Notices
              </h3>
              
              {alerts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📭</div>
                  <p className="text-lg text-gray-600 mb-2">No alerts at the moment</p>
                  <p className="text-sm text-gray-500">You&apos;re all caught up! Check back later for updates</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {alerts.map(a => (
                    <div key={a.id} className="border border-blue-200 rounded-xl p-6 bg-gradient-to-r from-blue-50 to-indigo-50 hover:shadow-md transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                            📢
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-lg mb-2">{a.title}</h4>
                          <p className="text-gray-700 mb-3 leading-relaxed">{a.message}</p>
                          <p className="text-sm text-blue-600 flex items-center">
                            <span className="mr-2">🕒</span>
                            {new Date(a.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">Citizen Dashboard</h1>
              <p className="text-blue-100 text-lg">Welcome back, {currentUser?.name}! 👋</p>
              <p className="text-blue-200 text-sm mt-1">Manage your reports and stay updated with city alerts</p>
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8 overflow-hidden">
          <div className="border-b border-gray-100">
            <nav className="flex space-x-1 p-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
      
      <Footer />
    </div>
  );
};

export default CitizenDashboard;

