export function log(message, meta = {}) {
  // eslint-disable-next-line no-console
  console.log(`[${new Date().toISOString()}]`, message, Object.keys(meta).length ? meta : '');
}

