// Import library node-fetch
import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Kita paksa nunggu jawaban dari Discord
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1462437468908290233/C0d9Ghggmr8dvV37iTh0ZB8sFxuWuUAwqHHjR2pvWTA6ksXBCjtYEKeEZUbwNPGoW1t-';

    const testPayload = {
        content: "🧪 **TES KONEKSI SERVER (DENGAN AWAIT)!** 🧪",
        username: "Vercel Test Bot"
    };

    try {
        // Pakai 'await' jadi nunggu sampe selesai
        const discordResponse = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testPayload),
        });

        // Cek response dari Discord
        if (!discordResponse.ok) {
            // Kalau Discord ngasih error (misal: 404 Not Found, 401 Unauthorized)
            const errorText = await discordResponse.text();
            console.error('Discord API Error:', discordResponse.status, errorText);
            throw new Error(`Discord API Error: ${discordResponse.status} ${errorText}`);
        }

        // Kalau sukses
        res.status(200).json({ message: 'Test message sent successfully!' });

    } catch (error) {
        // Tangkep semua error (network, discord error, dll)
        console.error('Gagal total kirim ke Discord:', error.message);
        res.status(500).json({ message: `Failed to send to Discord: ${error.message}` });
    }
}
