<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    // ── Kayıt ─────────────────────────────────
    case 'register':
        $name     = trim($_POST['name']     ?? '');
        $email    = trim($_POST['email']    ?? '');
        $password =      $_POST['password'] ?? '';

        if (!$name || !$email || !$password) {
            respond(false, 'Tüm alanlar zorunludur.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(false, 'Geçerli bir e-posta adresi girin.');
        }
        if (strlen($password) < 6) {
            respond(false, 'Şifre en az 6 karakter olmalıdır.');
        }

        $db = getDB();

        // E-posta zaten kayıtlı mı?
        $check = $db->prepare('SELECT id FROM users WHERE email = ?');
        $check->execute([$email]);
        if ($check->fetch()) {
            respond(false, 'Bu e-posta adresi zaten kayıtlı.');
        }

        $hash = password_hash($password, PASSWORD_DEFAULT);
        $stmt = $db->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        $stmt->execute([$name, $email, $hash]);

        respond(true, 'Kayıt başarılı! Giriş yapabilirsiniz.');
        break;

    // ── Giriş ─────────────────────────────────
    case 'login':
        $email    = trim($_POST['email']    ?? '');
        $password =      $_POST['password'] ?? '';

        if (!$email || !$password) {
            respond(false, 'E-posta ve şifre zorunludur.');
        }

        $db   = getDB();
        $stmt = $db->prepare('SELECT id, name, email, password, role FROM users WHERE email = ?');
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password'])) {
            respond(false, 'E-posta veya şifre hatalı.');
        }

        // Şifreyi session'a alma
        unset($user['password']);
        $_SESSION['user'] = $user;

        respond(true, 'Giriş başarılı.', $user);
        break;

    // ── Çıkış ─────────────────────────────────
    case 'logout':
        $_SESSION = [];
        session_destroy();
        respond(true, 'Çıkış yapıldı.');
        break;

    // ── Oturum Kontrolü ───────────────────────
    case 'check':
        if (!empty($_SESSION['user'])) {
            respond(true, 'Oturum aktif.', $_SESSION['user']);
        } else {
            respond(false, 'Oturum yok.');
        }
        break;

    default:
        respond(false, 'Geçersiz işlem.');
}
