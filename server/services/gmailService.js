import nodemailer from 'nodemailer';
import { dbInsert } from '../utils/supabaseClient.js';

function createTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_PASS;
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
}

export async function sendMail({ to, subject, text, html, leadId, campaignId }) {
  const transporter = createTransport();
  const info = await transporter.sendMail({ from: process.env.GMAIL_USER, to, subject, text, html });
  try {
    await dbInsert('emails', [{
      lead_id: leadId || null,
      campaign_id: campaignId || null,
      message_id: info.messageId || null,
      status: 'sent',
      sent_at: new Date().toISOString(),
      raw_response: info
    }]);
  } catch (_) {}
  return { messageId: info.messageId, response: info.response };
}

const minDelay = Number(process.env.SEND_DELAY_SECONDS_MIN || 45);
const maxDelay = Number(process.env.SEND_DELAY_SECONDS_MAX || 120);
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
function randomDelayMs() {
  const sec = Math.floor(minDelay + Math.random() * (maxDelay - minDelay + 1));
  return sec * 1000;
}

export async function sendWithDelay(list) {
  const results = [];
  for (const item of list) {
    const res = await sendMail(item);
    results.push({ to: item.to, ...res });
    await sleep(randomDelayMs());
  }
  return { count: results.length, results };
}

/*
// Gmail API (OAuth) placeholder using googleapis for advanced users
// Steps: create OAuth credentials, get tokens, and use gmail.users.messages.send
*/

