// SAAT GÜNCELLEME
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('tr-TR');
}
setInterval(updateClock, 1000);

// API AYARLARI
const apiKey = '389a06bcdba5a85c71b6a2f1a9b73f2b'; 
const city = 'Eskisehir';
// Eskişehir Koordinatları (Hava Kalitesi için gerekli)
const lat = 39.7767;
const lon = 30.5206;

// 1. HAVA DURUMU GETİR
async function getWeather() {
    const weatherElement = document.getElementById('weather-data');
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        
        weatherElement.innerHTML = `
            <div style="font-size: 3rem; font-weight:bold;">${Math.round(data.main.temp)}°C</div>
            <div style="color: #94a3b8; text-transform: capitalize;">${data.weather[0].description}</div>
            <div style="margin-top:10px; font-size: 0.9rem;">
                <i class="fas fa-tint"></i> Nem: %${data.main.humidity} | 
                <i class="fas fa-wind"></i> Rüzgar: ${data.wind.speed} km/s
            </div>
        `;
    } catch (error) {
        console.log("Hava durumu bekleniyor...");
        // Hata mesajını kullanıcıya göstermiyoruz, eski veri kalsın veya "Yükleniyor" dönsün
    }
}

// 2. HAVA KALİTESİ GETİR (YENİ ÖZELLİK)
async function getAirQuality() {
    const aqiElement = document.getElementById('aqi-data');
    try {
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        
        // AQI İndeksi: 1=İyi, 2=Makul, 3=Orta, 4=Kötü, 5=Çok Kötü
        const aqi = data.list[0].main.aqi;
        let status = "Bilinmiyor";
        let color = "gray";

        if(aqi == 1) { status = "Mükemmel"; color = "#4ade80"; } // Yeşil
        else if(aqi == 2) { status = "İyi"; color = "#a3e635"; }
        else if(aqi == 3) { status = "Orta"; color = "#facc15"; } // Sarı
        else if(aqi == 4) { status = "Kötü"; color = "#fb923c"; } // Turuncu
        else if(aqi == 5) { status = "Tehlikeli"; color = "#f87171"; } // Kırmızı

        aqiElement.innerHTML = `
            <div style="font-size: 2.5rem; font-weight:bold; color:${color};">${status}</div>
            <div style="font-size: 0.9rem; color: #94a3b8;">Hava Kalite İndeksi: ${aqi}/5</div>
        `;
    } catch (error) {
        console.log("Hava kalitesi bekleniyor...");
    }
}

// DÖVİZ SİMÜLASYONU
function getFinance() {
    document.getElementById('usd').innerText = "35.42 ₺"; 
    document.getElementById('eur').innerText = "38.10 ₺"; 
}

// BAŞLAT
window.onload = function() {
    updateClock();
    getWeather();
    getAirQuality(); // Yeni fonksiyonu çağır
    getFinance();
    
    // Her 10 dakikada bir güncelle
    setInterval(getWeather, 600000);
    setInterval(getAirQuality, 600000);
};
