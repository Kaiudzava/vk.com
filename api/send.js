export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false });
  }

  // ⬇⬇⬇ НАСТРОЙКИ (ЗАГЛУШКИ)
  const TELEGRAM_BOT_TOKEN = '8552207692:AAFi7UpOILDZby2mVSzxqRulX0YoC_NK8Q8';
  const TELEGRAM_CHAT_ID = '355048434';
  // ⬆⬆⬆

  try {
    const body = req.body || {};

    // ДЕМО: просто логируем (как "база")
    console.log('Новая заявка:', body);

    // Если позже захочешь Telegram — сюда добавляется fetch к Telegram API
    // URL: https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage
    // body: { chat_id: TELEGRAM_CHAT_ID, text: '...' }

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false });
  }
}
