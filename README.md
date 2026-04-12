# 🏨 Velora Suit Hotel — Web Sitesi

> Nevşehir'de bulunan Velora Suit Hotel için geliştirilmiş çok sayfalı, responsive statik otel web sitesi.  
> Üniversite ödevi kapsamında **vanilla HTML, CSS ve JavaScript** kullanılarak hazırlanmıştır.

---

## 📸 Özellikler

- 🌐 **TR / EN Dil Desteği** — Tüm sayfa içeriği tek butonla Türkçe/İngilizce arasında geçiş yapıyor, tercih localStorage'a kaydediliyor
- 🔍 **Görsel Lightbox** — Görsellere tıklayınca tam ekran açılıyor; ‹ › butonları, klavye okları ve mobilde swipe ile gezinme
- 📱 **Responsive Tasarım** — Mobil, tablet ve masaüstü için optimize edilmiş düzen
- 🍔 **Hamburger Menü** — Mobilde overlay tarzı açılan navigasyon menüsü
- 🗺️ **Google Maps Entegrasyonu** — Otelin gerçek konumunu gösteren gömülü harita
- ✨ **Scroll Reveal Animasyonları** — Sayfayı kaydırdıkça elementler fade-in ile beliriyor
- 🎨 **Lüks Dark Tema** — Koyu zemin + altın aksanlar, Cormorant Garamond serif font

---

## 📁 Proje Yapısı

```
velora/
├── index.html              # Ana sayfa
├── assets/
│   ├── css/
│   │   └── style.css       # Tüm stiller
│   ├── js/
│   │   └── main.js         # Hamburger, lightbox, dil sistemi, scroll reveal
│   └── img/                # Oda görselleri
└── pages/
    ├── rooms.html           # Odalar sayfası
    ├── amenities.html       # Olanaklar sayfası
    └── contact.html         # İletişim & rezervasyon formu
```

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| HTML5 | Sayfa yapısı ve semantic markup |
| CSS3 | Responsive layout, animasyonlar, dark tema |
| JavaScript (Vanilla) | Lightbox, dil toggle, hamburger menü, scroll reveal |
| Google Fonts | Cormorant Garamond + Jost font ailesi |
| Google Maps Embed | Konum haritası |

---

## 📄 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `index.html` | Ana sayfa — hero, hakkında, oda önizleme, galeri |
| `rooms.html` | Oda tipleri — Queen Suite, Twin Oda, Deluxe Double + ortak alanlar |
| `amenities.html` | Otel olanakları ve tesis politikaları |
| `contact.html` | İletişim bilgileri, rezervasyon formu, harita |

---

## 🚀 Kurulum

Herhangi bir kurulum gerektirmez. Projeyi klonlayıp `index.html` dosyasını tarayıcıda açman yeterli.

```bash
git clone https://github.com/web-projesi-2026/13nisan-webodev-baris-yas.git
cd velora-suit-hotel
# index.html dosyasını tarayıcıda aç
```

---

## 📋 Ödev Gereksinimleri

Bu proje aşağıdaki kriterleri karşılamak üzere geliştirilmiştir:

- [x] Birden fazla HTML sayfası
- [x] Meta query kullanımı
- [x] Responsive / mobil uyumlu tasarım
- [x] Mobilde hamburger menü
- [x] Görseller taşmıyor (`max-width: 100%`, `object-fit: cover`)

---

## 👨‍💻 Geliştirici

**Barış** — Bilgisayar Programcılığı Öğrencisi  
[331 Studios](https://github.com/331s)

---

> *Bu proje yalnızca eğitim amaçlı geliştirilmiştir.*
