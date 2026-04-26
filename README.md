# 🏨 Velora Suit Hotel — Web Sitesi

> Nevşehir'de bulunan Velora Suit Hotel için geliştirilmiş çok sayfalı, responsive statik otel web sitesi.  
> Üniversite ödevi kapsamında **vanilla HTML, CSS ve JavaScript** kullanılarak hazırlanmıştır.

---

## ✨ Özellikler

- 🌐 **TR / EN Dil Desteği** — Tüm sayfa içeriği tek butonla değişiyor, tercih localStorage'a kaydediliyor
- 🌙 **Dark / Light Mode** — Navbar'daki 🌙/☀️ butonu ile tema geçişi, tercih localStorage'a kaydediliyor
- 🔍 **Görsel Lightbox** — Görsellere tıklayınca tam ekran açılıyor; ok tuşları, klavye ve swipe desteği
- 🖼️ **Otomatik Slider** — Ana sayfada oda fotoğrafları arasında otomatik + manuel geçiş
- 📑 **Sekmeli İçerik** — Odalar sayfasında oda tipleri sekme sistemiyle gösteriliyor
- ❓ **SSS Accordion** — Olanaklar sayfasında açılır/kapanır sık sorulan sorular bölümü
- ⬆️ **Yukarı Çık Butonu** — 300px scroll sonrası beliren, smooth scroll yapan buton
- 🔢 **Sayaç Animasyonu** — Ana sayfada istatistikler ekrana girince animasyonlu sayar
- 📱 **Hamburger Menü** — Mobilde overlay tarzı açılan navigasyon menüsü
- 🗺️ **Google Maps Entegrasyonu** — Otelin gerçek konumunu gösteren gömülü harita
- ✅ **Form Validasyonu** — Zorunlu alan kontrolü, e-posta format doğrulama, tarih mantığı, hata mesajları
- 🔐 **Giriş / Kayıt Sistemi** — localStorage tabanlı kullanıcı auth sistemi
- 🛡️ **Admin Paneli** — Rezervasyon takibi, durum güncelleme, filtreleme ve silme

---

## 📁 Proje Yapısı

```
velora/
├── index.html               # Ana sayfa
├── assets/
│   ├── css/
│   │   └── style.css        # Tüm stiller (dark/light mode, responsive, animasyonlar)
│   ├── js/
│   │   └── main.js          # Tüm JS etkileşimleri + auth sistemi
│   └── img/                 # Oda görselleri
└── pages/
    ├── rooms.html            # Odalar — sekmeli oda detayları
    ├── amenities.html        # Olanaklar + SSS accordion
    ├── contact.html          # İletişim, rezervasyon formu (validasyonlu), harita
    ├── login.html            # Giriş Yap / Kayıt Ol
    └── admin.html            # Admin paneli — rezervasyon yönetimi
```

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| HTML5 | Sayfa yapısı ve semantic markup |
| CSS3 | Responsive layout, dark/light mode, animasyonlar |
| JavaScript (Vanilla) | Tüm etkileşimler, auth sistemi, form validasyonu |
| localStorage | Tema, dil, oturum ve rezervasyon verisi saklama |
| Google Fonts | Cormorant Garamond + Jost font ailesi |
| Google Maps Embed | Konum haritası |

---

## 📄 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `index.html` | Ana sayfa — hero, hakkında, oda önizleme, slider, sayaç |
| `rooms.html` | Sekmeli oda tipleri — Queen Suite, Twin, Deluxe + ortak alanlar |
| `amenities.html` | Otel olanakları, tesis politikaları, SSS accordion |
| `contact.html` | Validasyonlu rezervasyon formu, iletişim bilgileri, harita |
| `login.html` | Giriş Yap / Kayıt Ol sekmeleri |
| `admin.html` | Rezervasyon yönetim paneli (admin girişi gerektirir) |

---

## 🔐 Auth Sistemi

- Kullanıcılar kayıt olup giriş yapabilir
- Admin hesabı varsayılan olarak oluşturulur (bilgiler gizlidir)
- Oturum bilgisi localStorage'da saklanır
- Admin paneline giriş yapmadan erişim engellenir, login sayfasına yönlendirilir
- Admin butonu her sayfanın footer'ında yer alır

---

## 🛡️ Admin Paneli Özellikleri

- Toplam / Bekliyor / Onaylandı / İptal istatistik kartları
- Ad, e-posta, oda adına göre anlık arama
- Durum ve oda tipine göre filtreleme
- Her rezervasyonu Bekliyor / Onaylandı / İptal olarak güncelleme
- İsme tıklayınca detay modalı açılıyor
- Tekil veya toplu rezervasyon silme
- Yeni rezervasyonlar varsayılan olarak **Bekliyor** statüsünde gelir

---

## 📋 Ödev Gereksinimleri

**Hafta 1 — Temel Yapı:**
- [x] Birden fazla HTML sayfası
- [x] Meta query kullanımı
- [x] Responsive / mobil uyumlu tasarım
- [x] Mobilde hamburger menü
- [x] Görseller taşmıyor (`max-width: 100%`, `object-fit: cover`)

**Hafta 2 — JavaScript Etkileşimleri:**
- [x] Açılır/kapanır mobil menü
- [x] Dark / Light mode
- [x] Otomatik görsel slider
- [x] Sekmeli içerik (Tabs)
- [x] Modal pencere (Lightbox)
- [x] Yukarı çık butonu
- [x] Sayaç / istatistik animasyonu
- [x] SSS Accordion

**Hafta 3 — Form & Validasyon:**
- [x] Rezervasyon formu
- [x] `required` özelliği ile zorunlu alan kontrolü
- [x] E-posta format kontrolü (regex)
- [x] Tarih mantığı (çıkış > giriş)
- [x] Anlık hata mesajları (blur eventi)
- [x] Başarılı gönderim mesajı
- [x] Karakter sayacı

**Hafta 4 — Auth & Admin:**
- [x] Giriş / Kayıt sistemi
- [x] Admin paneli
- [x] Rezervasyonlar admin'e düşüyor

---

## 🚀 Kurulum

Herhangi bir kurulum gerektirmez. Projeyi klonlayıp `index.html` dosyasını tarayıcıda açman yeterli.

```bash
git clone https://github.com/kullanici-adin/velora-suit-hotel.git
cd velora-suit-hotel
# index.html dosyasını tarayıcıda aç
```

---

## 🏨 Otel Hakkında

**Velora Suit Hotel**, Nevşehir'in merkezinde yer alan butik bir suit oteldir.

- 📍 15 Temmuz Mah. Şifa Cad. No:9, Nevşehir, Türkiye 50100
- ⏰ Check-in: 13:00 — Check-out: 12:00
- 📐 60 m² stüdyo daireler

---

## 👨‍💻 Geliştirici

**Barış** — Bilgisayar Programcılığı Öğrencisi  
[331 Studios](https://github.com/331s)

---

> *Bu proje yalnızca eğitim amaçlı geliştirilmiştir.*
