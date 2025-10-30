import 'dotenv/config';
import { sendMail } from './services/gmailService.js';

const to = process.argv[2];
if (!to) {
  // eslint-disable-next-line no-console
  console.error('Usage: node send_test_email.js recipient@example.com');
  process.exit(1);
}

sendMail({ to, subject: 'Test Email', html: '<p>Hello from ColdEmail-Automation</p>' })
  .then((r) => { console.log(r); process.exit(0); })
  .catch((e) => { console.error(e); process.exit(1); });

