import React, { useEffect, useMemo, useState } from 'react';
import { getLeads, createLead } from '../utils/api.js';

function LeadsTable() {
  const [rows, setRows] = useState([]);
  const [q, setQ] = useState('');
  const filtered = useMemo(() => rows.filter(r => (r.email||'').includes(q) || (r.name||'').toLowerCase().includes(q.toLowerCase())), [rows, q]);
  useEffect(() => { getLeads().then((r) => setRows(r.data || [])); }, []);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Leads</h2>
        <button className="px-3 py-1 rounded bg-indigo-500 text-white text-sm" onClick={async () => { const email = prompt('Lead email?'); if (email) { await createLead({ email }); const r = await getLeads(); setRows(r.data); } }}>Add Lead</button>
      </div>
      <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Search leads..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="overflow-x-auto card">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-300">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Platform</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((l) => (
              <tr key={l.id} className="border-t border-white/10">
                <td className="p-3">{l.name || '—'}</td>
                <td className="p-3">{l.email}</td>
                <td className="p-3">{l.platform || '—'}</td>
                <td className="p-3">{l.status || 'new'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsTable;

