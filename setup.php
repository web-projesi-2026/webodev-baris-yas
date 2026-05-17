<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <title>Velora — Kurulum</title>
  <style>
    body { font-family: monospace; background: #0d0c0b; color: #f0ebe3; padding: 2rem; }
    h1   { color: #c5a55a; margin-bottom: 1.5rem; }
    .ok  { color: #5ab87a; }
    .err { color: #e05a5a; }
    .box { background: #161412; border: 1px solid #2a2520; border-radius: 4px; padding: 1.5rem; margin-top: 1rem; }
    a    { color: #c5a55a; }
  </style>
</head>
<body>
<h1>🏨 Velora Suit Hotel — Kurulum</h1>
<div class="box">
<?php
$host = 'localhost';
$user = 'root';
$pass = '';        // XAMPP varsayılanı boş — farklıysa buraya yaz
$db   = 'velora_db';

// ── 1. Veritabanı bağlantısı ──────────────────
try {
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    ]);
    echo "<p class='ok'>✓ MySQL bağlantısı başarılı.</p>";
} catch (PDOException $e) {
    die("<p class='err'>✗ MySQL bağlantı hatası: " . $e->getMessage() . "</p>");
}

// ── 2. Veritabanını oluştur ───────────────────
$pdo->exec("CREATE DATABASE IF NOT EXISTS `$db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
$pdo->exec("USE `$db`");
echo "<p class='ok'>✓ Veritabanı '$db' hazır.</p>";

// ── 3. Tabloları oluştur ──────────────────────
$pdo->exec("
CREATE TABLE IF NOT EXISTS users (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('user','admin') DEFAULT 'user',
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

$pdo->exec("
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
");

$pdo->exec("
CREATE TABLE IF NOT EXISTS comments (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  user_id    INT,
  user_name  VARCHAR(100)  NOT NULL,
  room_id    VARCHAR(50)   NOT NULL,
  room_name  VARCHAR(100)  NOT NULL,
  rating     TINYINT       NOT NULL DEFAULT 5,
  comment    TEXT          NOT NULL,
  created_at DATETIME      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
");

echo "<p class='ok'>✓ Tablolar oluşturuldu.</p>";

// ── 4. Admin kullanıcısını oluştur ────────────
$adminEmail = 'admin@velora.com';
$adminPass  = 'admin123';

$check = $pdo->prepare("SELECT id FROM users WHERE email = ?");
$check->execute([$adminEmail]);

if ($check->fetch()) {
    // Şifreyi güncelle (hash yenile)
    $hash = password_hash($adminPass, PASSWORD_DEFAULT);
    $upd  = $pdo->prepare("UPDATE users SET password = ?, role = 'admin' WHERE email = ?");
    $upd->execute([$hash, $adminEmail]);
    echo "<p class='ok'>✓ Admin şifresi güncellendi.</p>";
} else {
    $hash = password_hash($adminPass, PASSWORD_DEFAULT);
    $ins  = $pdo->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'admin')");
    $ins->execute(['Admin', $adminEmail, $hash]);
    echo "<p class='ok'>✓ Admin kullanıcısı oluşturuldu.</p>";
}

// ── 5. Örnek veriler ──────────────────────────
$resCount = $pdo->query("SELECT COUNT(*) FROM reservations")->fetchColumn();
if ($resCount == 0) {
    $pdo->exec("
    INSERT INTO reservations (name, email, phone, room, checkin, checkout, message, status) VALUES
    ('Ahmet Yılmaz', 'ahmet@email.com', '+90 532 111 22 33', 'queen',  '2025-06-10', '2025-06-14', 'Balkon tercih ederim.', 'Bekliyor'),
    ('Elif Kaya',    'elif@email.com',  '+90 541 222 33 44', 'twin',   '2025-06-15', '2025-06-17', '',                    'Bekliyor'),
    ('Mehmet Demir', 'mehmet@test.com', '',                  'deluxe', '2025-07-01', '2025-07-05', 'Geç check-in.',       'Onaylandı');
    ");
    echo "<p class='ok'>✓ Örnek rezervasyonlar eklendi.</p>";
}

$comCount = $pdo->query("SELECT COUNT(*) FROM comments")->fetchColumn();
if ($comCount == 0) {
    $pdo->exec("
    INSERT INTO comments (user_id, user_name, room_id, room_name, rating, comment) VALUES
    (NULL, 'Ayşe Kaya',    'queen-suite',   'Queen Suite',  5, 'Harika bir konaklama deneyimiydi. Oda çok temiz ve şıktı.'),
    (NULL, 'Can Demir',    'twin-room',     'Twin Oda',     4, 'İki kişilik konaklamak için ideal. Personel çok ilgiliydi.'),
    (NULL, 'Selin Arslan', 'deluxe-double', 'Deluxe Double',5, 'Muhteşem bir oda! Kesinlikle tavsiye ederim.');
    ");
    echo "<p class='ok'>✓ Örnek yorumlar eklendi.</p>";
}
?>

<hr style="border-color:#2a2520; margin:1.5rem 0;">
<p class="ok" style="font-size:1.1rem;">✅ Kurulum tamamlandı!</p>
<p style="margin-top:.5rem; color:#8a7f74;">
  Admin: <strong style="color:#c5a55a;">admin@velora.com</strong> &nbsp;/&nbsp;
  Şifre: <strong style="color:#c5a55a;">admin123</strong>
</p>
<p style="margin-top:1.5rem;">
  <a href="index.html">→ Siteye Git</a> &nbsp;|&nbsp;
  <a href="pages/login.html">→ Admin Girişi</a>
</p>
<p style="margin-top:1rem; color:#e05a5a; font-size:.82rem;">
  ⚠ Kurulum tamamlandıktan sonra bu dosyayı (setup.php) sunucudan silin.
</p>
</div>
</body>
</html>
