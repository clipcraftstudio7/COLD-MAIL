export function fillTemplate(text, variables = {}) {
  return text.replace(/\{\{(.*?)\}\}/g, (_, key) => String(variables[key.trim()] ?? ''));
}

export function previewForLead(template, lead, personalIntro) {
  const vars = {
    name: lead?.name || '',
    email: lead?.email || '',
    channel_name: lead?.channel_name || '',
    platform: lead?.platform || '',
    personal_intro: personalIntro || ''
  };
  return {
    subject: fillTemplate(template.subject || '', vars),
    body: fillTemplate(template.body || '', vars)
  };
}

