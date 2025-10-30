import React, { useEffect, useState } from 'react';
import { getLeads, getTemplates, createCampaign, sendCampaign, previewCampaign } from '../utils/api.js';

function Campaigns() {
  const [templates, setTemplates] = useState([]);
  const [leads, setLeads] = useState([]);
  const [selected, setSelected] = useState({ template_id: '', lead_ids: [] });
  const [created, setCreated] = useState(null);
  const [previews, setPreviews] = useState([]);
  useEffect(() => { getTemplates().then(r => setTemplates(r.data)); getLeads().then(r => setLeads(r.data)); }, []);
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Campaigns</h2>
      <div className="card p-4 space-y-3">
        <select className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" value={selected.template_id} onChange={(e) => setSelected({ ...selected, template_id: e.target.value })}>
          <option value="">Select template</option>
          {templates.map(t => <option key={t.id} value={t.id}>{t.name || t.subject}</option>)}
        </select>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-auto">
          {leads.map(l => (
            <label key={l.id} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selected.lead_ids.includes(l.id)} onChange={(e) => {
                const s = new Set(selected.lead_ids);
                if (e.target.checked) s.add(l.id); else s.delete(l.id);
                setSelected({ ...selected, lead_ids: Array.from(s) });
              }} />
              <span>{l.email}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded bg-indigo-500 text-white text-sm" onClick={async () => { if (!selected.template_id || !selected.lead_ids.length) return; const r = await createCampaign({ name: 'New Campaign', template_id: selected.template_id, lead_ids: selected.lead_ids }); setCreated(r.data); }}>Create Campaign</button>
          {created && <button className="px-3 py-1 rounded bg-green-600 text-white text-sm" onClick={async () => { await sendCampaign(created.id); }}>Send Now</button>}
          {created && <button className="px-3 py-1 rounded bg-white/10 text-white text-sm" onClick={async () => { const r = await previewCampaign(created.id, 5); setPreviews(r.data); }}>Preview</button>}
        </div>
      </div>
      {!!previews.length && (
        <div className="card p-4">
          <div className="font-medium mb-2">Previews</div>
          <ul className="space-y-2 text-sm">
            {previews.map((p, i) => (
              <li key={i} className="border-t border-white/10 pt-2 first:border-0 first:pt-0">
                <div className="text-gray-300">To: {p.to}</div>
                <div className="font-semibold">{p.subject}</div>
                <div dangerouslySetInnerHTML={{ __html: p.html }} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Campaigns;

