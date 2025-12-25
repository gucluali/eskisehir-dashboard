// SAAT GÜNCELLEME
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('tr-TR');
}
setInterval(updateClock, 1000);

// GERÇEK HAVA DURUMU (OpenWeatherMap API)
// Sizin verdiğiniz anahtarı buraya yerleştirdim:
const apiKey = '389a06bcdba5a85c71b6a2f1a9b73f2b'; 
const city = 'Eskisehir';

async function getWeather() {
    const weatherElement = document.getElementById('weather-data');
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
        const response = await fetch(url);
        
        // Eğer hata varsa (Örn: API key henüz aktif değilse)
        if (!response.ok) {
            throw new Error(`Hata: ${response.status}`);
        }

        const data = await response.json();
        
        // Veriyi ekrana yazdır
        weatherElement.innerHTML = `
            <div style="font-size: 3rem; font-weight:bold;">${Math.round(data.main.temp)}°C</div>
            <div style="color: #94a3b8; text-transform: capitalize;">${data.weather[0].description}</div>
            <div style="margin-top:10px; font-size: 0.9rem;">
                <i class="fas fa-tint"></i> Nem: %${data.main.humidity} | 
                <i class="fas fa-wind"></i> Rüzgar: ${data.wind.speed} km/s
            </div>
        `;
    } catch (error) {
        console.error("Hava durumu çekilemedi:", error);
        weatherElement.innerHTML = `<p style="color:orange;">Veri yükleniyor... (API Key aktifleşiyor olabilir)</p>`;
    }
}

// DÖVİZ SİMÜLASYONU (Burası şimdilik sabit, sonra burayı da bağlarız)
function getFinance() {
    document.getElementById('usd').innerText = "35.42 ₺"; 
    document.getElementById('eur').innerText = "38.10 ₺"; 
}

// Sayfa yüklendiğinde çalıştır
window.onload = function() {
    updateClock();
    getWeather();
    getFinance();
    
    // Hava durumunu her 10 dakikada bir güncelle
    setInterval(getWeather, 600000);
};
