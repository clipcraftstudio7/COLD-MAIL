import { dbSelect } from '../utils/supabaseClient.js';

export async function getStats(req, res) {
  try {
    const leads = await dbSelect('leads', 'id');
    const emails = await dbSelect('emails', 'id,status');
    const totalLeads = leads.length;
    const sent = emails.length;
    const replies = emails.filter((e) => e.status === 'replied').length;
    const opened = emails.filter((e) => e.status === 'opened' || e.opened_at).length;
    const openRate = sent ? Math.round((opened / sent) * 100) : 0;
    res.json({ success: true, data: { totalLeads, sent, replies, openRate } });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

