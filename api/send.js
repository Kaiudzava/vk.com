// api/send.js

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  try {
    const { contact, wish } = req.body || {};

    if (!contact || !wish) {
      return res.status(400).json({ ok: false });
    }

    const message = `
🎁 НОВОЕ ЖЕЛАНИЕ

📞 Контакт:
${contact}

📝 Желание:
${wish}
    `;

    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false });
  }
};
