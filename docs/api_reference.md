# API Reference

Base URL: /api

- GET /health

Leads
- GET /leads?limit=100
  - Response: `{ success: true, data: Lead[] }`
- POST /leads
  - Body: `{ email, name?, platform?, channel_name? }`
  - Response: `{ success: true, data: Lead }`
- POST /leads/import
  - Body: JSON array of leads OR multipart form-data with `file` (CSV)
  - Response: `{ success: true, data: Lead[] }`
- PUT /leads/:id
  - Body: partial Lead
  - Response: `{ success: true, data: Lead }`
- DELETE /leads/:id
  - Response: `{ success: true }`

Templates
- GET /templates
  - Response: `{ success: true, data: Template[] }`
- POST /templates
  - Body: `{ name?, subject, body }`
  - Response: `{ success: true, data: Template }`
- GET /templates/:id
- PUT /templates/:id
- DELETE /templates/:id

Campaigns
- POST /campaigns
  - Body: `{ name, template_id, lead_ids: uuid[], schedule? }`
  - Response: `{ success: true, data: Campaign }`
- GET /campaigns/:id
  - Response: `{ success: true, data: Campaign }`
- POST /campaigns/:id/send
  - Response: `{ success: true, data: { campaignId, total } }`
- POST /campaigns/:id/preview?n=5
  - Response: `{ success: true, data: [{ to, subject, html }] }`

Analytics
- GET /analytics
  - Response: `{ success: true, data: { totalLeads, sent, replies, openRate } }`

Error shape: `{ success: false, error: string }`
