# Gmail OAuth Sending (Optional)

This project uses Gmail SMTP with App Password by default. Advanced users can swap to Gmail API (OAuth).

Steps:
1. Create a Google Cloud project, enable Gmail API.
2. Create OAuth Client (Desktop), download credentials.json.
3. Use `googleapis` to obtain tokens and store them.
4. Replace Nodemailer transport with Gmail API call `gmail.users.messages.send`.

Sample snippet (pseudo):
```js
import { google } from 'googleapis';
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// get tokens once, then set:
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
await gmail.users.messages.send({ userId: 'me', requestBody: { raw: base64Email } });
```
