export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, message: "Method not allowed" });
  }

  try {
    const { wish, identity } = req.body || {};

    if (!wish || wish.trim().length < 2) {
      return res.status(400).json({
        ok: false,
        message: "Пустое желание"
      });
    }

    const text = `
✨ Новое желание

👤 От: ${identity || "Аноним"}
💭 Желание:
${wish}

🌐 IP: ${req.headers["x-forwarded-for"] || req.socket.remoteAddress}
    `.trim();

    const TG_TOKEN = process.env.8552207692:AAFi7UpOILDZby2mVSzxqRulX0YoC_NK8Q8;
    const TG_CHAT = process.env.355048434;

    if (TG_TOKEN && TG_CHAT) {
      await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TG_CHAT,
          text
        })
      });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ ok: false });
  }
}
