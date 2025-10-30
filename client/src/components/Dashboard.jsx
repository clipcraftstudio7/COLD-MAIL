import React, { useEffect, useState } from 'react';
import { getAnalytics, getLeads } from '../utils/api.js';

function Stat({ label, value }) {
  return (
    <div className="card p-4">
      <div className="text-sm text-gray-300">{label}</div>
      <div className="text-2xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    getAnalytics().then((r) => setStats(r.data));
    getLeads({ limit: 5 }).then((r) => setRecent(r.data));
  }, []);
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Dashboard</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat label="Total Leads" value={stats?.totalLeads ?? '—'} />
        <Stat label="Emails Sent" value={stats?.sent ?? '—'} />
        <Stat label="Replies" value={stats?.replies ?? '—'} />
        <Stat label="Open Rate" value={stats ? `${stats.openRate}%` : '—'} />
      </div>
      <div className="card p-4">
        <div className="font-medium mb-3">Recent Leads</div>
        <ul className="space-y-1 text-sm">
          {recent.map((l) => (
            <li key={l.id} className="flex justify-between opacity-90">
              <span>{l.name || 'Unnamed'}</span>
              <span className="text-gray-400">{l.email}</span>
            </li>
          ))}
          {!recent.length && <li className="text-gray-400">No leads yet</li>}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;

