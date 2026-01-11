// api/send.js

const TG_TOKEN = "8552207692:AAHTZxlESsKrDzgrS5XYl4GF_OWYlw6OY70";
const TG_CHAT_ID = -1003528330262;

module.exports = async function handler(req, res) {
  // Разрешаем только POST
  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed',
    });
  }

  try {
    // В serverless / express body уже распарсен
    const body = req.body || {};

    // Учебный лог — просто показать, ЧТО ПРИШЛО
    console.log('Получены :', body);

    // 👇 ДОБАВИЛИ: отправка в Telegram
    const message = `
📩 НОВАЯ ЗАЯВКА

Данные:
${JSON.stringify(body, null, 2)}
    `;

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
      received: Object.keys(body),
    });
  } catch (err) {
    console.error('Ошибка:', err);
    return res.status(500).json({ ok: false });
  }
};
