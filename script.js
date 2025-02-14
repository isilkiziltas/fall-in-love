const kalpAlani = document.getElementById('kalpAlani');
const kalpGenislik = kalpAlani.offsetWidth;
const kalpYukseklik = kalpAlani.offsetHeight;
const merkezX = kalpGenislik / 2;
const merkezY = kalpYukseklik / 2;

// Kalp fonksiyonları
function xt(t) {
    return 16 * Math.pow(Math.sin(t), 3);
}

function yt(t) {
    return 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
}

const cizgiSayisi = 100;
const cizgiler = []; // Çizgileri saklamak için dizi

// Çizgileri oluştur ve konumlandır
for (let i = 0; i < cizgiSayisi; i++) {
    const aci = (i / cizgiSayisi) * 2 * Math.PI;
    const x = xt(aci) * 12;
    const y = yt(aci) * 12;

    const cizgi = document.createElement('div');
    cizgi.style.position = 'absolute';
    cizgi.style.width = '1px';
    cizgi.style.backgroundColor = 'red';
    cizgi.style.left = merkezX + 'px';
    cizgi.style.top = merkezY + 'px';
    cizgi.style.transformOrigin = 'top center';
    cizgi.style.transform = `rotate(${Math.atan2(y, x) * 180 / Math.PI}deg)`;
    kalpAlani.appendChild(cizgi);

    cizgiler.push({
        element: cizgi,
        x: x,
        y: y,
        uzunluk: 0 // Başlangıç uzunluğu
    });
}

// Animasyon fonksiyonu
function animate() {
    cizgiler.forEach((cizgi, index) => {
        // Animasyon hızını ve genliğini ayarlayın
        const zaman = Date.now() * 0.002 + index * 0.1; // Her çizgi için farklı başlangıç zamanı
        const genlik = 20; // Uzunluk değişim miktarı
        const yeniUzunluk = Math.abs(Math.sin(zaman)) * genlik + Math.sqrt(cizgi.x * cizgi.x + cizgi.y * cizgi.y); // Sinüs fonksiyonu ile uzunluğu değiştir

        cizgi.element.style.height = yeniUzunluk + 'px';
    });

    requestAnimationFrame(animate); // Animasyonu tekrar çalıştır
}

animate(); // Animasyonu başlat
