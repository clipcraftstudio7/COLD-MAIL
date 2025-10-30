import { dbInsert, dbSelect } from '../utils/supabaseClient.js';
import { runCampaignSend, previewPersonalized } from '../scripts/sendEmails.js';

export async function createCampaign(req, res) {
  try {
    const campaign = req.body;
    const data = await dbInsert('campaigns', [campaign]);
    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function getCampaign(req, res) {
  try {
    const id = req.params.id;
    const data = await dbSelect('campaigns', '*', (q) => q.eq('id', id).limit(1));
    res.json({ success: true, data: data[0] || null });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function sendCampaign(req, res) {
  try {
    const id = req.params.id;
    const summary = await runCampaignSend(id);
    res.json({ success: true, data: summary });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function previewCampaign(req, res) {
  try {
    const id = req.params.id;
    const n = Number(req.query.n || 5);
    const previews = await previewPersonalized(id, n);
    res.json({ success: true, data: previews });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

