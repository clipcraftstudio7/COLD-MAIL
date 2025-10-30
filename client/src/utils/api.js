import axios from 'axios';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

export async function getLeads(params = {}) {
  const { data } = await axios.get(`${API_BASE}/leads`, { params });
  return data;
}

export async function createLead(payload) {
  const { data } = await axios.post(`${API_BASE}/leads`, payload);
  return data;
}

export async function importLeads(rows) {
  const { data } = await axios.post(`${API_BASE}/leads/import`, rows);
  return data;
}

export async function getTemplates() {
  const { data } = await axios.get(`${API_BASE}/templates`);
  return data;
}

export async function createTemplate(payload) {
  const { data } = await axios.post(`${API_BASE}/templates`, payload);
  return data;
}

export async function createCampaign(payload) {
  const { data } = await axios.post(`${API_BASE}/campaigns`, payload);
  return data;
}

export async function sendCampaign(campaignId) {
  const { data } = await axios.post(`${API_BASE}/campaigns/${campaignId}/send`);
  return data;
}

export async function previewCampaign(campaignId, n = 5) {
  const { data } = await axios.post(`${API_BASE}/campaigns/${campaignId}/preview?n=${n}`);
  return data;
}

export async function getAnalytics() {
  const { data } = await axios.get(`${API_BASE}/analytics`);
  return data;
}

