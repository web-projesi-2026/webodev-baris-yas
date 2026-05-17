<?php
// ── Veritabanı Bağlantısı ─────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'velora_db');
define('DB_USER', 'root');   // XAMPP varsayılanı
define('DB_PASS', '');       // XAMPP varsayılanı boş

// CORS — localhost geliştirme için
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

// Session başlat
if (session_status() === PHP_SESSION_NONE) {
    session_name('velora_session');
    session_start();
}

// PDO bağlantısı
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['ok' => false, 'msg' => 'Veritabanı bağlantı hatası: ' . $e->getMessage()]);
            exit;
        }
    }
    return $pdo;
}

// Yardımcı: JSON çıktı ver ve çık
function respond(bool $ok, string $msg = '', mixed $data = null): void {
    echo json_encode(['ok' => $ok, 'msg' => $msg, 'data' => $data]);
    exit;
}

// Yardımcı: Oturumu kontrol et
function requireLogin(): array {
    if (empty($_SESSION['user'])) {
        http_response_code(401);
        respond(false, 'Giriş yapmanız gerekiyor.');
    }
    return $_SESSION['user'];
}

// Yardımcı: Admin kontrolü
function requireAdmin(): array {
    $user = requireLogin();
    if ($user['role'] !== 'admin') {
        http_response_code(403);
        respond(false, 'Yetkiniz yok.');
    }
    return $user;
}
