import multer from 'multer';
import csv from 'csv-parser';
import { dbInsert, dbSelect, dbUpdate, dbDelete } from '../utils/supabaseClient.js';

export async function listLeads(req, res) {
  try {
    const limit = Number(req.query.limit || 100);
    const data = await dbSelect('leads', '*', (q) => q.limit(limit).order('created_at', { ascending: false }));
    res.json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function createLead(req, res) {
  try {
    const lead = req.body;
    if (!lead?.email) throw new Error('email required');
    const data = await dbInsert('leads', [lead]);
    res.status(201).json({ success: true, data: data[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function importLeads(req, res) {
  try {
    if (Array.isArray(req.body)) {
      const rows = req.body.filter((r) => r.email);
      const data = await dbInsert('leads', rows);
      return res.json({ success: true, data });
    }
    // CSV multipart upload
    const upload = multer();
    upload.single('file')(req, res, async (err) => {
      if (err) return res.status(400).json({ success: false, error: String(err) });
      const file = req.file;
      if (!file) return res.status(400).json({ success: false, error: 'No file' });
      const rows = [];
      const stream = require('stream');
      const rstream = new stream.Readable();
      rstream.push(file.buffer);
      rstream.push(null);
      rstream.pipe(csv()).on('data', (row) => rows.push(row)).on('end', async () => {
        const filtered = rows.filter((r) => r.email);
        const data = await dbInsert('leads', filtered);
        res.json({ success: true, data });
      });
    });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function updateLead(req, res) {
  try {
    const id = req.params.id;
    const values = req.body;
    const data = await dbUpdate('leads', values, (q) => q.eq('id', id));
    res.json({ success: true, data: data[0] });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

export async function deleteLead(req, res) {
  try {
    const id = req.params.id;
    await dbDelete('leads', (q) => q.eq('id', id));
    res.json({ success: true });
  } catch (error) {
    res.status(400).json({ success: false, error: String(error.message || error) });
  }
}

