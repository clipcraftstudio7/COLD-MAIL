import { dbInsert, dbSelect, dbUpdate, dbDelete } from '../utils/supabaseClient.js';

export async function listTemplates(req, res) {
  try {
    const data = await dbSelect('templates', '*', (q) => q.order('created_at', { ascending: false }));
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function createTemplate(req, res) {
  try {
    const t = req.body;
    if (!t?.subject || !t?.body) throw new Error('subject and body required');
    const data = await dbInsert('templates', [t]);
    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function getTemplate(req, res) {
  try {
    const id = req.params.id;
    const data = await dbSelect('templates', '*', (q) => q.eq('id', id).limit(1));
    res.json({ success: true, data: data[0] || null });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function updateTemplate(req, res) {
  try {
    const id = req.params.id;
    const values = req.body;
    const data = await dbUpdate('templates', values, (q) => q.eq('id', id));
    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function deleteTemplate(req, res) {
  try {
    const id = req.params.id;
    await dbDelete('templates', (q) => q.eq('id', id));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

