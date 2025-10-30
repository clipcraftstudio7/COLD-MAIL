# ColdEmail-Automation

React (Vite + Tailwind) frontend and Node.js (Express) backend to manage leads, templates, and email campaigns with Supabase and Gmail SMTP.

## Quick Start
1) Server
```
cd server
npm install
cp .env.example .env  # fill values
npm run dev
```
2) Client
```
cd client
npm install
npm run dev
```

Backend: `http://localhost:5000`  •  Frontend: `http://localhost:5173` (or set `FRONTEND_URL` to 3000 if desired)

## Gmail App Password vs Gmail API
- Recommended: App Password. In Google Account → Security → App passwords, create a 16-char app password and set `GMAIL_USER` and `GMAIL_PASS` in `.env`.
- Optional: Gmail API OAuth. See `server/gmail_oauth_example.md` for steps and sample.

## Supabase
- Create a project, copy `SUPABASE_URL` and service role key as `SUPABASE_KEY`.
- Run SQL in `server/sql/schema.sql`.

## Testing Email
```
cd server
node send_test_email.js you@example.com
```

## Run a Campaign via CLI
```
cd server
node scripts/sendEmails.js <campaignId>
```
📁 ColdEmail-Automation/
ColdEmail-Automation/
│
├── 📂 client/                        # Frontend (React + Tailwind)
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── LeadsTable.jsx
│   │   │   ├── EmailTemplates.jsx
│   │   │   ├── Campaigns.jsx
│   │   │   ├── Analytics.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── 📂 pages/
│   │   │   ├── Home.jsx
│   │   │   ├── LeadsPage.jsx
│   │   │   ├── TemplatesPage.jsx
│   │   │   ├── CampaignsPage.jsx
│   │   │   └── AnalyticsPage.jsx
│   │   │
│   │   ├── 📂 utils/
│   │   │   └── api.js                # Handles frontend API requests
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── tailwind.config.js
│   │
│   ├── package.json
│   └── vite.config.js
│
├── 📂 server/                        # Backend (Node.js + Express)
│   ├── server.js                     # Main API server
│   ├── 📂 routes/
│   │   ├── leads.js                  # CRUD for leads
│   │   ├── templates.js              # CRUD for email templates
│   │   ├── campaigns.js              # Manage campaigns + send emails
│   │   └── analytics.js              # Stats and performance data
│   │
│   ├── 📂 controllers/
│   │   ├── leadsController.js
│   │   ├── templatesController.js
│   │   ├── campaignsController.js
│   │   └── analyticsController.js
│   │
│   ├── 📂 services/
│   │   ├── gmailService.js           # Handles sending emails via Gmail SMTP
│   │   ├── aiService.js              # Optional - use OpenAI to personalize emails
│   │   └── leadFinderService.js      # Uses APIs (Hunter.io, SerpAPI, etc.) for AI lead discovery
│   │
│   ├── 📂 models/
│   │   ├── Lead.js                   # Lead schema
│   │   ├── Template.js
│   │   └── Campaign.js
│   │
│   ├── 📂 utils/
│   │   ├── supabaseClient.js         # Connects to Supabase
│   │   ├── emailFormatter.js         # Replaces placeholders {{name}}, etc.
│   │   └── logger.js                 # Logs API & email activity
│   │
│   ├── 📂 scripts/
│   │   └── sendEmails.js             # Cron job or manual email sender
│   │
│   ├── package.json
│   └── .env                          # Environment variables
│
├── 📂 docs/
│   ├── setup_guide.md                # Setup steps and credentials instructions
│   └── api_reference.md              # API endpoint documentation
│
├── .gitignore
├── README.md
└── LICENSE