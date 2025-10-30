import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createLead } from '../utils/api.js';

function Navbar() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ email: '', name: '' });
  return (
    <nav className="w-full border-b border-white/10 bg-white/5 backdrop-blur">
      <div className="max-w-7xl mx-auto p-4 flex items-center justify-between">
        <div className="font-semibold">ColdEmail</div>
        <button onClick={() => setOpen(true)} className="px-3 py-1 rounded bg-indigo-500 text-white text-sm">Quick Add Lead</button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="card w-full max-w-md p-4">
              <h3 className="text-lg font-medium mb-3">Add Lead</h3>
              <div className="space-y-3">
                <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input className="w-full px-3 py-2 rounded bg-white/10 border border-white/20" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <div className="flex gap-2 justify-end">
                  <button className="px-3 py-1 text-sm" onClick={() => setOpen(false)}>Cancel</button>
                  <button className="px-3 py-1 rounded bg-indigo-500 text-white text-sm" onClick={async () => { if (!form.email) return; await createLead(form); setOpen(false); }}>Save</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;

