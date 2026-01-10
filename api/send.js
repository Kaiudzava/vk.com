export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  const body = req.body || {};
  
  const { contact, password } = req.body;

  const safeData = {
    hasPassword: typeof body.password === 'string',
    contactType: body.contact?.includes('@') ? 'email' : 'phone',
    timestamp: new Date().toISOString(),
    userAgent: req.headers['user-agent'],
  };

  console.log('Safe event:', safeData);

  return res.status(200).json({ ok: true });
}
