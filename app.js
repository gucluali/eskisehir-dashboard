// SAAT GÜNCELLEME
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString('tr-TR');
}
setInterval(updateClock, 1000);

// API AYARLARI (Hava Durumu)
const apiKey = '389a06bcdba5a85c71b6a2f1a9b73f2b'; 
const city = 'Eskisehir';
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
    }
}

// 2. HAVA KALİTESİ GETİR
async function getAirQuality() {
    const aqiElement = document.getElementById('aqi-data');
    try {
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        
        const aqi = data.list[0].main.aqi;
        let status = "Bilinmiyor";
        let color = "gray";

        // Renklendirme Mantığı
        if(aqi == 1) { status = "Mükemmel"; color = "#4ade80"; } 
        else if(aqi == 2) { status = "İyi"; color = "#a3e635"; }
        else if(aqi == 3) { status = "Orta"; color = "#facc15"; }
        else if(aqi == 4) { status = "Kötü"; color = "#fb923c"; }
        else if(aqi == 5) { status = "Tehlikeli"; color = "#f87171"; }

        aqiElement.innerHTML = `
            <div style="font-size: 2.5rem; font-weight:bold; color:${color};">${status}</div>
            <div style="font-size: 0.9rem; color: #94a3b8;">Endeks: ${aqi}/5</div>
        `;
    } catch (error) {
        console.log("Hava kalitesi bekleniyor...");
    }
}

// 3. CANLI DÖVİZ GETİR (YENİLENMİŞ KISIM)
async function getFinance() {
    const usdElement = document.getElementById('usd');
    const eurElement = document.getElementById('eur');

    try {
        // Frankfurt Borsası API'si (Ücretsizdir)
        const response = await fetch('https://api.frankfurter.app/latest?from=USD&to=TRY,EUR');
        const data = await response.json();

        // USD -> TRY
        const usdRate = data.rates.TRY;
        
        // Çapraz kurdan EUR hesaplama veya ayrı çekme
        // Daha kesin olması için EUR'yu ayrı çekelim:
        const responseEur = await fetch('https://api.frankfurter.app/latest?from=EUR&to=TRY');
        const dataEur = await responseEur.json();
        const eurRate = dataEur.rates.TRY;

        usdElement.innerText = `${usdRate} ₺`;
        eurElement.innerText = `${eurRate} ₺`;
        
    } catch (error) {
        console.error("Finans verisi hatası:", error);
        usdElement.innerText = "Yükleniyor..";
        eurElement.innerText = "Yükleniyor..";
    }
}

// BAŞLAT
window.onload = function() {
    updateClock();
    getWeather();
    getAirQuality();
    getFinance(); // Canlı finansı çağır
    
    // Verileri düzenli güncelle (Hava 10dk, Finans 1 saatte bir)
    setInterval(getWeather, 600000);
    setInterval(getAirQuality, 600000);
    setInterval(getFinance, 3600000);
};
