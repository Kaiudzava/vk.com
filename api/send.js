// api/send.js

const TG_TOKEN = process.env.TG_TOKEN;
const TG_CHAT_ID = process.env.TG_CHAT_ID;

module.exports = async function handler(req, res) {
  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    });
  }

  try {
    // body уже распарсен
    const body = req.body || {};
    const { contact, wish } = body;

    // Лог — что пришло
    console.log('Получены данные:', body);

    // Валидация
    if (!contact || !wish) {
      return res.status(400).json({
        ok: false,
        error: 'contact and wish are required',
      });
    }

    // Сообщение в Telegram
    const message = `
🎁 НОВОЕ ЖЕЛАНИЕ

📞 Контакт:
${contact}

📝 Желание:
${wish}
    `;

    // Отправка в Telegram
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: message,
      }),
    });

    return res.status(200).json({
      ok: true,
      received: ['contact', 'wish'],
    });
  } catch (err) {
    console.error('Ошибка:', err);
    return res.status(500).json({ ok: false });
  }
};
