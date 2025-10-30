import React, { useEffect, useState } from 'react';
import { createTemplate, getTemplates } from '../utils/api.js';

function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [form, setForm] = useState({ name: '', subject: '', body: '' });
  useEffect(() => { getTemplates().then((r) => setTemplates(r.data || [])); }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Email Templates</h2>
      <div className="card p-4 space-y-2">
        <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Subject" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
        <textarea className="w-full px-3 py-2 rounded bg-white/10 border border-white/20 h-32" placeholder="Body (supports {{name}}, {{email}}, {{platform}}, {{channel_name}}, {{personal_intro}})" value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
        <button className="px-3 py-1 rounded bg-indigo-500 text-white text-sm" onClick={async () => { if (!form.subject || !form.body) return; await createTemplate(form); const r = await getTemplates(); setTemplates(r.data); setForm({ name: '', subject: '', body: '' }); }}>Save Template</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {templates.map((t) => (
          <div key={t.id} className="card p-4">
            <div className="font-medium">{t.name || 'Untitled'}</div>
            <div className="text-sm text-gray-300">{t.subject}</div>
            <pre className="text-xs mt-2 whitespace-pre-wrap opacity-90">{t.body}</pre>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmailTemplates;

