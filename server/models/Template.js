export function Template(fields = {}) {
  return {
    id: fields.id || null,
    name: fields.name || '',
    subject: fields.subject || '',
    body: fields.body || ''
  };
}

