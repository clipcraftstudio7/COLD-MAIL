import React, { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import Dashboard from './components/Dashboard.jsx';
import LeadsTable from './components/LeadsTable.jsx';
import EmailTemplates from './components/EmailTemplates.jsx';
import Campaigns from './components/Campaigns.jsx';
import Analytics from './components/Analytics.jsx';

function App() {
  const apiBase = useMemo(() => import.meta.env.VITE_API_URL || 'http://localhost:5000', []);
  window.__API_BASE__ = apiBase;
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto flex gap-6 p-6">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<LeadsTable />} />
            <Route path="/templates" element={<EmailTemplates />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;

