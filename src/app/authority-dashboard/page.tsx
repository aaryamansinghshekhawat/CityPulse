'use client'
import React, { useState, useEffect } from 'react';
import { Navigation, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { useAuth } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';
import { getAllReports, updateReportStatus, addAlert, getAllAlerts, onStoreUpdate, ReportOrComplaint, ReportStatus } from '@/lib/store';

import MapView from "@/components/map/MapView";

const AuthorityDashboard = () => {
  const { currentUser, userLoggedIn, logout } = useAuth();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<ReportOrComplaint[]>([]);
  const [alerts, setAlerts] = useState(getAllAlerts());
  const [newAlert, setNewAlert] = useState({ title: '', message: '' });
  const [creatingAlert, setCreatingAlert] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    if (!userLoggedIn || currentUser?.type !== 'authority') {
      router.push('/login');
    }
  }, [userLoggedIn, currentUser, router]);

  useEffect(() => {
    setSuggestions(getAllReports());
    const off = onStoreUpdate(() => {
      setSuggestions(getAllReports());
      setAlerts(getAllAlerts());
    });
    return off;
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!userLoggedIn || currentUser?.type !== 'authority') {
    return null;
  }

  const createAlert = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;
    if (!newAlert.title || !newAlert.message) return;
    setCreatingAlert(true);
    try {
      addAlert({
        title: newAlert.title,
        message: newAlert.message,
        authorId: currentUser.id
      });
      setNewAlert({ title: '', message: '' });
    } finally {
      setCreatingAlert(false);
    }
  };

  const setStatus = (id: string, status: ReportStatus) => {
    updateReportStatus(id, status);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-8 mb-8 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2">City Management Dashboard</h1>
              <p className="text-blue-100 text-lg">Welcome back, {currentUser?.name}! 👨‍💼</p>
              <p className="text-blue-200 text-sm mt-1">Review citizen ideas and share city updates</p>
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

        {/* Map Toggle Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowMap(!showMap)}
            className="px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 flex items-center space-x-2"
          >
            <span className="text-xl">🗺️</span>
            <span className="font-medium text-gray-700">
              {showMap ? 'Hide Map' : 'Show Map & Location'}
            </span>
          </button>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">🗺️</span>
                City Map & Location Services
              </h3>
              <div style={{ height: "500px", width: "100%" }}>
                <MapView />
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Suggestions list */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="mr-3">💡</span>
                  Citizen Suggestions & Feedback
                </h3>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {suggestions.length} total
                </span>
              </div>
              
              {suggestions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">💭</div>
                  <p className="text-lg text-gray-600 mb-2">No suggestions yet</p>
                  <p className="text-sm text-gray-500">Citizens will appear here when they share their ideas</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {suggestions.map(r => (
                    <div key={r.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 bg-gradient-to-r from-gray-50 to-white">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              r.type === 'Suggestion' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-green-100 text-green-800'
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
                            Shared: {new Date(r.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="ml-4 flex flex-col items-end space-y-2">
                          <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                            r.status === 'Resolved' 
                              ? 'bg-green-100 text-green-800 border border-green-200' 
                              : r.status === 'In Progress' 
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                              : 'bg-gray-100 text-gray-800 border border-gray-200'
                          }`}>
                            {r.status === 'Resolved' ? 'Implemented' : r.status === 'In Progress' ? 'Under Review' : r.status}
                          </span>
                          <select
                            value={r.status}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(r.id, e.target.value as ReportStatus)}
                            className="border-2 border-gray-200 rounded-lg px-3 py-1 text-xs focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
                          >
                            <option>Pending</option>
                            <option>In Progress</option>
                            <option>Resolved</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Alerts composer and list */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">📢</span>
                Share City Update
              </h3>
              <form onSubmit={createAlert} className="space-y-4">
                <input
                  type="text"
                  value={newAlert.title}
                  onChange={(e) => setNewAlert({ ...newAlert, title: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300"
                  placeholder="Update title"
                  required
                />
                <textarea
                  rows={4}
                  value={newAlert.message}
                  onChange={(e) => setNewAlert({ ...newAlert, message: e.target.value })}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 resize-none"
                  placeholder="Share exciting news with citizens..."
                  required
                />
                <Button 
                  variant="primary" 
                  size="md" 
                  className="w-full py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" 
                  disabled={creatingAlert}
                >
                  {creatingAlert ? (
                    <span className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Publishing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <span className="mr-2">📤</span>
                      Share Update
                    </span>
                  )}
                </Button>
              </form>
            </div>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-3">🔔</span>
                Recent Updates
              </h3>
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-2">📭</div>
                  <p className="text-sm text-gray-500">No updates shared yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {alerts.map(a => (
                    <div key={a.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                      <h4 className="font-semibold text-gray-900 mb-1">{a.title}</h4>
                      <p className="text-sm text-gray-700 mb-2">{a.message}</p>
                      <p className="text-xs text-blue-600 flex items-center">
                        <span className="mr-2">🕒</span>
                        {new Date(a.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthorityDashboard;
