// SAAT GÜNCELLEME
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('tr-TR');
}
setInterval(updateClock, 1000);

// HAVA DURUMU (Örnek API Çağrısı)
const apiKey = 'BURAYA_OPENWEATHERMAP_API_KEYINIZI_YAZIN'; 
const city = 'Eskisehir';

async function getWeather() {
    // API Anahtarı olmadan bu kısım çalışmaz. Kendi key'inizi almalısınız.
    // Demo amaçlı statik veri simülasyonu yapıyorum:
    
    const weatherElement = document.getElementById('weather-data');
    
    // Gerçek API Fetch Kodu Şöyle Olur:
    /*
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
    const response = await fetch(url);
    const data = await response.json();
    weatherElement.innerHTML = `
        <div style="font-size: 2rem;">${Math.round(data.main.temp)}°C</div>
        <div>${data.weather[0].description}</div>
        <div>Nem: %${data.main.humidity}</div>
    `;
    */

    // Şimdilik Simülasyon:
    weatherElement.innerHTML = `
        <div style="font-size: 3rem; font-weight:bold;">12°C</div>
        <div style="color: #94a3b8;">Parçalı Bulutlu</div>
        <div style="margin-top:10px;">Nem: %45 | Rüzgar: 12 km/s</div>
    `;
}

// DÖVİZ SİMÜLASYONU
function getFinance() {
    // Gerçek bir finans API'si kullanılabilir (örn: freecurrencyapi)
    document.getElementById('usd').innerText = "35.42 ₺"; // Örnek
    document.getElementById('eur').innerText = "38.10 ₺"; // Örnek
}

// Sayfa yüklendiğinde çalıştır
window.onload = function() {
    updateClock();
    getWeather();
    getFinance();
};
