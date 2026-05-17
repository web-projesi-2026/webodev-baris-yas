# 🏨 Velora Suit Hotel — Web Sitesi

> Nevşehir'de bulunan Velora Suit Hotel için geliştirilmiş çok sayfalı, responsive otel web sitesi.  
> Üniversite ödevi kapsamında **HTML, CSS, JavaScript, PHP ve MySQL** kullanılarak hazırlanmıştır.

---

## ✨ Özellikler

- 🌐 **TR / EN Dil Desteği** — Tüm sayfa içeriği tek butonla değişiyor
- 🌙 **Dark / Light Mode** — Tema geçişi, tercih localStorage'a kaydediliyor
- 🔍 **Görsel Lightbox** — Görsellere tıklayınca tam ekran, klavye ve swipe desteği
- 🖼️ **Otomatik Slider** — Ana sayfada otomatik + manuel görsel geçişi
- 📑 **Sekmeli İçerik** — Odalar sayfasında tab sistemi
- ❓ **SSS Accordion** — Olanaklar sayfasında açılır/kapanır sorular
- ⬆️ **Yukarı Çık Butonu** — Scroll sonrası beliren smooth scroll butonu
- 🔢 **Sayaç Animasyonu** — İstatistikler ekrana girince animasyonlu sayar
- 📱 **Hamburger Menü** — Mobilde overlay navigasyon
- 🗺️ **Google Maps** — Otelin gerçek konumu gömülü harita
- ✅ **Form Validasyonu** — Zorunlu alanlar, e-posta kontrolü, tarih mantığı
- 🃏 **Dinamik Katalog** — JSON'dan okunan oda verileri, kart listeleme, filtreleme, sıralama
- ❤️ **Favoriler** — Kullanıcı bazında localStorage favorileme
- 💬 **Yorum Sistemi** — Giriş yapan kullanıcılar yorum yapabiliyor, MySQL'de saklanıyor
- 🔐 **Giriş / Kayıt** — PHP + MySQL ile tam auth sistemi, oturum yönetimi
- 🛡️ **Admin Paneli** — Rezervasyon takibi, durum güncelleme, arama, filtreleme, silme

---

## 📁 Proje Yapısı

```
velora/
├── setup.php                # İlk kurulum (bir kez çalıştır, sonra sil)
├── index.html               # Ana sayfa
├── api/
│   ├── config.php           # Veritabanı bağlantısı ve yardımcı fonksiyonlar
│   ├── auth.php             # Kayıt, giriş, çıkış, oturum kontrolü
│   ├── reservations.php     # Rezervasyon CRUD işlemleri
│   └── comments.php         # Yorum ekleme, listeleme, silme
├── sql/
│   └── velora.sql           # Veritabanı şeması (phpMyAdmin ile import)
├── assets/
│   ├── css/style.css        # Tüm stiller
│   ├── js/
│   │   ├── main.js          # UI etkileşimleri
│   │   └── api.js           # PHP API wrapper, oturum yönetimi
│   ├── data/rooms.json      # Oda verileri (JSON)
│   └── img/                 # Görseller ve favicon
└── pages/
    ├── rooms.html           # Sekmeli oda detayları
    ├── catalog.html         # Dinamik katalog + yorum sistemi
    ├── amenities.html       # Olanaklar + SSS accordion
    ├── contact.html         # Rezervasyon formu + harita
    ├── favorites.html       # Kullanıcıya özel favoriler
    ├── login.html           # Giriş / Kayıt
    └── admin.html           # Admin paneli
```

---

## 🛠️ Kullanılan Teknolojiler

| Teknoloji | Kullanım Amacı |
|-----------|----------------|
| HTML5 | Sayfa yapısı, semantic markup |
| CSS3 | Responsive layout, dark/light mode, animasyonlar |
| JavaScript (Vanilla) | UI etkileşimleri, form validasyonu, dinamik içerik |
| PHP 8 | REST API uç noktaları, oturum yönetimi |
| MySQL | Kullanıcılar, rezervasyonlar, yorumlar |
| PDO | Güvenli veritabanı sorguları |
| localStorage | Tema, dil, favori tercihleri |
| Google Fonts | Cormorant Garamond + Jost |
| Google Maps Embed | Konum haritası |

---

## 📄 Sayfalar

| Sayfa | Açıklama |
|-------|----------|
| `index.html` | Ana sayfa — hero, slider, istatistik, oda önizleme |
| `rooms.html` | Sekmeli oda tipleri — Queen Suite, Twin, Deluxe |
| `catalog.html` | JSON'dan dinamik kartlar, filtreleme, sıralama, yorum sistemi |
| `amenities.html` | Otel olanakları, politikalar, SSS accordion |
| `contact.html` | Validasyonlu rezervasyon formu, iletişim, harita |
| `favorites.html` | Kullanıcıya özel favori odalar |
| `login.html` | Giriş / Kayıt sekmeleri |
| `admin.html` | Rezervasyon yönetimi (sadece admin) |

---

## 🗄️ Veritabanı Tabloları

| Tablo | İçerik |
|-------|--------|
| `users` | id, name, email, password (hash), role, created_at |
| `reservations` | id, name, email, phone, room, checkin, checkout, message, status, created_at |
| `comments` | id, user_id, user_name, room_id, room_name, rating, comment, created_at |

---

## 🚀 Kurulum (XAMPP / Localhost)

```bash
# 1. Projeyi klonla
git clone https://github.com/331s/velora-suit-hotel.git

# 2. htdocs klasörüne taşı
# C:\xampp\htdocs\velora\

# 3. XAMPP'te Apache + MySQL başlat

# 4. Tarayıcıda setup.php'yi çalıştır
http://localhost/velora/setup.php

# 5. Kurulum tamamlandıktan sonra setup.php'yi sil

# 6. Siteye git
http://localhost/velora/
```

> Farklı bir MySQL şifresi kullanıyorsan `api/config.php` dosyasındaki `DB_PASS` değerini güncelle.

---

## 🔐 Auth Sistemi

- PHP session tabanlı kimlik doğrulama
- Şifreler `password_hash()` ile bcrypt olarak saklanıyor
- Admin paneline yetkisiz erişim engelleniyor
- `🔐 Admin` footer linki yalnızca admin hesabında görünüyor
- Navbar'da kullanıcı adına tıklayınca dropdown menü açılıyor

---

## 🛡️ Admin Paneli

- İstatistik kartları: Toplam / Bekliyor / Onaylandı / İptal
- Ad, e-posta ve oda tipine göre arama
- Durum ve oda tipine göre filtreleme
- Rezervasyon durumunu güncelleme (Bekliyor / Onaylandı / İptal)
- Rezervasyon detay modalı
- Tekil ve toplu silme
- Yorumları silme yetkisi

---

## 📋 Ödev Gereksinimleri

**Hafta 1 — Temel Yapı**
- [x] Birden fazla HTML sayfası
- [x] Meta viewport, description, keywords
- [x] Responsive / mobil uyumlu tasarım
- [x] Hamburger menü
- [x] Görseller taşmıyor

**Hafta 2 — JavaScript Etkileşimleri**
- [x] Açılır/kapanır mobil menü
- [x] Dark / Light mode
- [x] Slider
- [x] Sekmeli içerik
- [x] Modal (Lightbox)
- [x] Yukarı çık butonu
- [x] Sayaç animasyonu
- [x] SSS Accordion

**Hafta 3 — Form & Validasyon**
- [x] Rezervasyon formu
- [x] `required` ile zorunlu alan kontrolü
- [x] E-posta format kontrolü (regex)
- [x] Tarih mantığı kontrolü
- [x] Anlık hata mesajları
- [x] Başarılı gönderim mesajı
- [x] Karakter sayacı

**Hafta 4 — Veri & localStorage**
- [x] JSON'dan dinamik kart listeleme
- [x] Kategori filtreleme ve fiyat sıralaması
- [x] Favorilere ekle — localStorage ile kullanıcı bazında saklama

**Hafta 5 — Veritabanı & Profesyonelleştirme**
- [x] Kullanıcı kayıt olma (PHP + MySQL)
- [x] Kullanıcı giriş yapma (PHP + MySQL)
- [x] Rezervasyon ekleme (veritabanına veri ekleme)
- [x] Rezervasyon listeleme (veritabanından okuma)
- [x] Durum güncelleme ve silme
- [x] Yorum ekleme ve silme
- [x] Favicon
- [x] Sayfa başlıkları
- [x] README.md
- [x] Kırık link yok

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
