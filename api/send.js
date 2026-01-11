// api/send.js

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

    /**
     * Пример того, что может прийти:
     * {
     *   contact: "test@mail.com"
     * }
     * или
     * {
     *   wish: "123456"
     * }
     */

    return res.status(200).json({
      ok: true,
      received: Object.keys(body),
    });
  } catch (err) {
    console.error('Ошибка:', err);
    return res.status(500).json({ ok: false });
  }
};
