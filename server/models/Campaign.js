export function Campaign(fields = {}) {
  return {
    id: fields.id || null,
    name: fields.name || '',
    templateId: fields.templateId || null,
    recipients: Array.isArray(fields.recipients) ? fields.recipients : []
  };
}

