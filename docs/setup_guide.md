# Setup Guide

## 1) Supabase
- Create a project at supabase.com
- Copy `SUPABASE_URL` and service role key as `SUPABASE_KEY`
- Run SQL in `server/sql/schema.sql`

## 2) Gmail Setup
- App Password (recommended): Google Account → Security → App passwords → create app password
- Put values into `server/.env`: `GMAIL_USER`, `GMAIL_PASS`
- Optional: Gmail API OAuth, see `server/gmail_oauth_example.md`

## 3) Environment
- Copy `server/.env.example` to `server/.env` and fill values
- Important vars: `PORT`, `FRONTEND_URL`, `SUPABASE_URL`, `SUPABASE_KEY`, `GMAIL_USER`, `GMAIL_PASS`, `OPENAI_API_KEY?`

## 4) Install & Run
```bash
cd server && npm install && npm run dev
cd client && npm install && npm run dev
```

## 5) Import CSV Leads
- API accepts JSON array via `POST /api/leads/import`
- For CSV, send multipart form-data with `file` field (.csv) with headers like `email,name,platform,channel_name`

## 6) Using the UI
- Add leads (Quick Add or via Leads page)
- Create a template (subject + body). Use placeholders: `{{name}}`, `{{email}}`, `{{channel_name}}`, `{{platform}}`, `{{personal_intro}}`
- Create a campaign: pick template + leads
- Preview, then Send
