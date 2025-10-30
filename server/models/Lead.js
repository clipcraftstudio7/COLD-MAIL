export function Lead(fields = {}) {
  return {
    id: fields.id || null,
    email: fields.email || '',
    name: fields.name || '',
    company: fields.company || ''
  };
}

