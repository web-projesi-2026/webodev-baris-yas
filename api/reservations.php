<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    // ── Rezervasyon Ekle (herkese açık) ───────
    case 'add':
        $name     = trim($_POST['name']     ?? '');
        $email    = trim($_POST['email']    ?? '');
        $phone    = trim($_POST['phone']    ?? '');
        $room     = trim($_POST['room']     ?? '');
        $checkin  = trim($_POST['checkin']  ?? '');
        $checkout = trim($_POST['checkout'] ?? '');
        $message  = trim($_POST['message']  ?? '');

        if (!$name || !$email || !$room || !$checkin || !$checkout) {
            respond(false, 'Zorunlu alanlar eksik.');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            respond(false, 'Geçersiz e-posta adresi.');
        }
        if ($checkout <= $checkin) {
            respond(false, 'Çıkış tarihi giriş tarihinden sonra olmalıdır.');
        }

        $db   = getDB();
        $stmt = $db->prepare(
            'INSERT INTO reservations (name, email, phone, room, checkin, checkout, message)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$name, $email, $phone, $room, $checkin, $checkout, $message]);

        respond(true, 'Rezervasyon talebiniz alındı!', ['id' => $db->lastInsertId()]);
        break;

    // ── Listele (sadece admin) ─────────────────
    case 'list':
        requireAdmin();
        $db   = getDB();
        $rows = $db->query(
            'SELECT * FROM reservations ORDER BY created_at DESC'
        )->fetchAll();
        respond(true, '', $rows);
        break;

    // ── Durum Güncelle (sadece admin) ─────────
    case 'update':
        requireAdmin();
        $id     = (int)($_POST['id']     ?? 0);
        $status = trim($_POST['status']  ?? '');
        $allowed = ['Bekliyor', 'Onaylandı', 'İptal'];

        if (!$id || !in_array($status, $allowed)) {
            respond(false, 'Geçersiz istek.');
        }

        $db   = getDB();
        $stmt = $db->prepare('UPDATE reservations SET status = ? WHERE id = ?');
        $stmt->execute([$status, $id]);

        respond(true, 'Durum güncellendi.');
        break;

    // ── Sil (sadece admin) ────────────────────
    case 'delete':
        requireAdmin();
        $id = (int)($_POST['id'] ?? 0);
        if (!$id) respond(false, 'Geçersiz ID.');

        $db   = getDB();
        $stmt = $db->prepare('DELETE FROM reservations WHERE id = ?');
        $stmt->execute([$id]);

        respond(true, 'Rezervasyon silindi.');
        break;

    default:
        respond(false, 'Geçersiz işlem.');
}
