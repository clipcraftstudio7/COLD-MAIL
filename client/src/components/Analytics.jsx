import React, { useEffect, useState } from 'react';
import { getAnalytics } from '../utils/api.js';

function Analytics() {
  const [stats, setStats] = useState(null);
  useEffect(() => { getAnalytics().then(r => setStats(r.data)); }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Analytics</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card p-4"><div className="text-sm text-gray-300">Total Leads</div><div className="text-2xl font-semibold">{stats?.totalLeads ?? '—'}</div></div>
        <div className="card p-4"><div className="text-sm text-gray-300">Emails Sent</div><div className="text-2xl font-semibold">{stats?.sent ?? '—'}</div></div>
        <div className="card p-4"><div className="text-sm text-gray-300">Replies</div><div className="text-2xl font-semibold">{stats?.replies ?? '—'}</div></div>
        <div className="card p-4"><div className="text-sm text-gray-300">Open Rate</div><div className="text-2xl font-semibold">{stats ? `${stats.openRate}%` : '—'}</div></div>
      </div>
    </div>
  );
}

export default Analytics;

