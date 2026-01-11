// api/send.js
const fetch = require('node-fetch');

const TG_TOKEN = 8552207692:AAFi7UpOILDZby2mVSzxqRulX0YoC_NK8Q8;
const TG_CHAT_ID = 7862739746;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  try {
    const { contact, wish } = req.body || {};

    // Валидация
    if (!contact || !wish) {
      return res.status(400).json({
        ok: false,
        error: 'Missing contact or wish',
      });
    }

    // Ограничение длины (против треша)
    if (wish.length > 1000) {
      return res.status(400).json({
        ok: false,
        error: 'Wish too long',
      });
    }

    const message = `
🎁 *НОВОЕ ЖЕЛАНИЕ*

📞 Контакт:
${contact}

📝 Желание:
${wish}
    `;

    await fetch(`https://api.telegram.org/bot${8552207692:AAFi7UpOILDZby2mVSzxqRulX0YoC_NK8Q8}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: 7862739746,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Ошибка:', err);
    return res.status(500).json({ ok: false });
  }
};
