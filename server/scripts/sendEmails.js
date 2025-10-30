import { dbSelect } from '../utils/supabaseClient.js';
import { previewForLead } from '../utils/emailFormatter.js';
import { generateIntro } from '../services/aiService.js';
import { sendWithDelay } from '../services/gmailService.js';

export async function runCampaignSend(campaignId) {
  const campaigns = await dbSelect('campaigns', '*', (q) => q.eq('id', campaignId).limit(1));
  const campaign = campaigns[0];
  if (!campaign) throw new Error('Campaign not found');
  const templates = await dbSelect('templates', '*', (q) => q.eq('id', campaign.template_id).limit(1));
  const template = templates[0];
  if (!template) throw new Error('Template not found');
  const leadIds = campaign.lead_ids || [];
  const leads = leadIds.length
    ? await dbSelect('leads', '*', (q) => q.in('id', leadIds))
    : await dbSelect('leads', '*', (q) => q.limit(20));
  const sendList = [];
  for (const lead of leads) {
    const intro = await generateIntro(lead);
    const preview = previewForLead(template, lead, intro);
    sendList.push({
      to: lead.email,
      subject: preview.subject,
      html: preview.body,
      leadId: lead.id,
      campaignId
    });
  }
  const summary = await sendWithDelay(sendList);
  return { campaignId, total: summary.count };
}

export async function previewPersonalized(campaignId, limit = 5) {
  const campaigns = await dbSelect('campaigns', '*', (q) => q.eq('id', campaignId).limit(1));
  const campaign = campaigns[0];
  const templates = await dbSelect('templates', '*', (q) => q.eq('id', campaign.template_id).limit(1));
  const template = templates[0];
  const leadIds = campaign.lead_ids || [];
  const leads = leadIds.length
    ? await dbSelect('leads', '*', (q) => q.in('id', leadIds).limit(limit))
    : await dbSelect('leads', '*', (q) => q.limit(limit));
  const previews = [];
  for (const lead of leads) {
    const intro = await generateIntro(lead);
    const p = previewForLead(template, lead, intro);
    previews.push({ to: lead.email, subject: p.subject, html: p.body });
  }
  return previews;
}

if (process.argv[1] && process.argv[1].includes('sendEmails.js') && process.argv[2]) {
  const id = process.argv[2];
  runCampaignSend(id).then((s) => {
    // eslint-disable-next-line no-console
    console.log('Done', s);
    process.exit(0);
  }).catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  });
}

