-- =============================================
-- VELORA SUIT HOTEL — VERİTABANI
-- Kullanım: phpMyAdmin > Import > Bu dosyayı seç
-- =============================================

CREATE DATABASE IF NOT EXISTS velora_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE velora_db;

-- ── KULLANICILAR ──────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('user','admin') DEFAULT 'user',
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── REZERVASYONLAR ───────────────────────────
CREATE TABLE IF NOT EXISTS reservations (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL,
  phone      VARCHAR(30),
  room       VARCHAR(50)   NOT NULL,
  checkin    DATE          NOT NULL,
  checkout   DATE          NOT NULL,
  message    TEXT,
  status     ENUM('Bekliyor','Onaylandı','İptal') DEFAULT 'Bekliyor',
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── YORUMLAR ─────────────────────────────────
CREATE TABLE IF NOT EXISTS comments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT,
  user_name  VARCHAR(100)  NOT NULL,
  room_id    VARCHAR(50)   NOT NULL,
  room_name  VARCHAR(100)  NOT NULL,
  rating     TINYINT       NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT          NOT NULL,
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── ÖRNEK VERİLER ─────────────────────────────

-- Admin kullanıcısı (şifre: admin123)
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@velora.com',
 '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
 'admin');

-- Örnek rezervasyonlar
INSERT INTO reservations (name, email, phone, room, checkin, checkout, message, status) VALUES
('Ahmet Yılmaz', 'ahmet@email.com', '+90 532 111 22 33', 'queen', '2025-06-10', '2025-06-14', 'Balkon tercih ederim.', 'Bekliyor'),
('Elif Kaya',    'elif@email.com',  '+90 541 222 33 44', 'twin',  '2025-06-15', '2025-06-17', '',                    'Bekliyor'),
('Mehmet Demir', 'mehmet@test.com', '',                  'deluxe','2025-07-01', '2025-07-05', 'Geç check-in.',       'Onaylandı');

-- Örnek yorumlar
INSERT INTO comments (user_id, user_name, room_id, room_name, rating, comment) VALUES
(NULL, 'Ayşe Kaya',   'queen-suite',   'Queen Suite',  5, 'Harika bir konaklama deneyimiydi. Oda çok temiz ve şıktı.'),
(NULL, 'Can Demir',   'twin-room',     'Twin Oda',     4, 'İki kişilik konaklamak için ideal. Personel çok ilgiliydi.'),
(NULL, 'Selin Arslan','deluxe-double', 'Deluxe Double',5, 'Muhteşem bir oda! Kesinlikle tavsiye ederim.');
