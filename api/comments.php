<?php
require_once __DIR__ . '/config.php';

$action = $_GET['action'] ?? $_POST['action'] ?? '';

switch ($action) {

    // ── Yorumları Listele (herkese açık) ──────
    case 'list':
        $room_id = trim($_GET['room_id'] ?? '');
        $db      = getDB();

        if ($room_id) {
            $stmt = $db->prepare(
                'SELECT id, user_name, room_id, room_name, rating, comment, created_at
                 FROM comments WHERE room_id = ? ORDER BY created_at DESC'
            );
            $stmt->execute([$room_id]);
        } else {
            $stmt = $db->query(
                'SELECT id, user_name, room_id, room_name, rating, comment, created_at
                 FROM comments ORDER BY created_at DESC'
            );
        }

        respond(true, '', $stmt->fetchAll());
        break;

    // ── Yorum Ekle (giriş yapmış kullanıcı) ──
    case 'add':
        $user = requireLogin();

        $room_id   = trim($_POST['room_id']   ?? '');
        $room_name = trim($_POST['room_name'] ?? '');
        $rating    = (int)($_POST['rating']   ?? 5);
        $comment   = trim($_POST['comment']   ?? '');

        if (!$room_id || !$comment) {
            respond(false, 'Oda ve yorum alanları zorunludur.');
        }
        if ($rating < 1 || $rating > 5) {
            respond(false, 'Puan 1-5 arasında olmalıdır.');
        }
        if (strlen($comment) < 5) {
            respond(false, 'Yorum en az 5 karakter olmalıdır.');
        }

        $db   = getDB();
        $stmt = $db->prepare(
            'INSERT INTO comments (user_id, user_name, room_id, room_name, rating, comment)
             VALUES (?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$user['id'], $user['name'], $room_id, $room_name, $rating, $comment]);

        respond(true, 'Yorumunuz eklendi!', [
            'id'         => $db->lastInsertId(),
            'user_name'  => $user['name'],
            'room_id'    => $room_id,
            'room_name'  => $room_name,
            'rating'     => $rating,
            'comment'    => $comment,
            'created_at' => date('Y-m-d H:i:s'),
        ]);
        break;

    // ── Yorum Sil (admin veya kendi yorumu) ──
    case 'delete':
        $user = requireLogin();
        $id   = (int)($_POST['id'] ?? 0);
        if (!$id) respond(false, 'Geçersiz ID.');

        $db   = getDB();
        $row  = $db->prepare('SELECT user_id FROM comments WHERE id = ?');
        $row->execute([$id]);
        $c = $row->fetch();

        if (!$c) respond(false, 'Yorum bulunamadı.');

        // Admin veya kendi yorumunu silebilir
        if ($user['role'] !== 'admin' && (int)$c['user_id'] !== (int)$user['id']) {
            http_response_code(403);
            respond(false, 'Bu yorumu silme yetkiniz yok.');
        }

        $del = $db->prepare('DELETE FROM comments WHERE id = ?');
        $del->execute([$id]);

        respond(true, 'Yorum silindi.');
        break;

    // ── Tüm Yorumlar (sadece admin) ───────────
    case 'list_all':
        requireAdmin();
        $db   = getDB();
        $rows = $db->query(
            'SELECT * FROM comments ORDER BY created_at DESC'
        )->fetchAll();
        respond(true, '', $rows);
        break;

    default:
        respond(false, 'Geçersiz işlem.');
}
