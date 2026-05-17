/* =============================================
   VELORA SUIT HOTEL — API.JS
   PHP backend'e tüm istekleri yöneten wrapper
   ============================================= */

// Sayfanın pages/ içinde mi yoksa kök dizinde mi olduğunu anla
const BASE = (function () {
  const p = window.location.pathname;
  return p.includes('/pages/') ? '../api/' : 'api/';
})();

/* ── Genel POST yardımcısı ─────────────────── */
async function apiPost(endpoint, params = {}) {
  const body = new URLSearchParams(params);
  const res = await fetch(BASE + endpoint, {
    method: 'POST',
    credentials: 'include',
    body,
  });
  return res.json();
}

/* ── Genel GET yardımcısı ──────────────────── */
async function apiGet(endpoint, params = {}) {
  const qs = new URLSearchParams(params).toString();
  const url = BASE + endpoint + (qs ? '?' + qs : '');
  const res = await fetch(url, { credentials: 'include' });
  return res.json();
}

/* ================================================
   AUTH
   ================================================ */
const Auth = {
  async check() {
    return apiGet('auth.php', { action: 'check' });
  },
  async login(email, password) {
    return apiPost('auth.php', { action: 'login', email, password });
  },
  async register(name, email, password) {
    return apiPost('auth.php', { action: 'register', name, email, password });
  },
  async logout() {
    return apiPost('auth.php', { action: 'logout' });
  },
};

/* ================================================
   REZERVASYONLAR
   ================================================ */
const Reservations = {
  async add(data) {
    return apiPost('reservations.php', { action: 'add', ...data });
  },
  async list() {
    return apiGet('reservations.php', { action: 'list' });
  },
  async update(id, status) {
    return apiPost('reservations.php', { action: 'update', id, status });
  },
  async remove(id) {
    return apiPost('reservations.php', { action: 'delete', id });
  },
};

/* ================================================
   YORUMLAR
   ================================================ */
const Comments = {
  async list(room_id = '') {
    return apiGet('comments.php', { action: 'list', room_id });
  },
  async listAll() {
    return apiGet('comments.php', { action: 'list_all' });
  },
  async add(data) {
    return apiPost('comments.php', { action: 'add', ...data });
  },
  async remove(id) {
    return apiPost('comments.php', { action: 'delete', id });
  },
};

/* ================================================
   OTURUM YÖNETİMİ
   Sayfa yüklendiğinde mevcut kullanıcıyı kontrol et
   ================================================ */
let currentUser = null;

async function initSession() {
  try {
    const res = await Auth.check();
    if (res.ok && res.data) {
      currentUser = res.data;
      updateNavAuth(currentUser);
    } else {
      updateNavAuth(null);
    }
  } catch {
    updateNavAuth(null);
  }

  // Admin footer butonunu sadece admin'e göster
  document.querySelectorAll('.admin-footer-btn').forEach(btn => {
    btn.style.display = (currentUser && currentUser.role === 'admin') ? '' : 'none';
  });
}


/* Navbar'daki kullanıcı butonunu güncelle */
function updateNavAuth(user) {
  document.querySelectorAll('.nav-auth-item').forEach(el => el.remove());

  if (!document.getElementById('nav-dropdown-style')) {
    const s = document.createElement('style');
    s.id = 'nav-dropdown-style';
    s.textContent = `
      .nav-auth-item { position: relative; }
      .nav-auth-btn {
        background: none; border: none; cursor: pointer;
        font-family: var(--ff-body); font-size: .78rem; font-weight: 400;
        letter-spacing: .14em; text-transform: uppercase;
        color: var(--clr-muted); padding: 0; transition: color .3s;
        display: flex; align-items: center; gap: .35rem;
      }
      .nav-auth-btn:hover { color: var(--clr-gold); }
      .nav-dropdown {
        display: none; position: absolute; top: calc(100% + 10px); right: 0;
        background: var(--clr-surface); border: 1px solid var(--clr-border);
        border-radius: 4px; min-width: 160px; z-index: 2000;
        box-shadow: 0 8px 24px rgba(0,0,0,.4); overflow: hidden;
      }
      .nav-dropdown.open { display: block; }
      .nav-dropdown a, .nav-dropdown button {
        display: block; width: 100%; padding: .75rem 1.1rem;
        font-family: var(--ff-body); font-size: .78rem; letter-spacing: .08em;
        color: var(--clr-muted); background: none; border: none; text-align: left;
        cursor: pointer; transition: background .2s, color .2s; text-decoration: none;
      }
      .nav-dropdown a:hover, .nav-dropdown button:hover {
        background: rgba(197,165,90,.08); color: var(--clr-gold);
      }
      .nav-dropdown-divider { border: none; border-top: 1px solid var(--clr-border); margin: .3rem 0; }
    `;
    document.head.appendChild(s);
  }

  const nav = document.querySelector('.navbar__nav');
  if (!nav) return;

  const li = document.createElement('li');
  li.className = 'nav-auth-item';

  if (user) {
    const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    const adminLink = user.role === 'admin'
      ? `<a href="${base}admin.html">🛡 Admin Paneli</a><hr class="nav-dropdown-divider">` : '';

    li.innerHTML = `
      <button class="nav-auth-btn" id="navAuthToggle">
        👤 ${user.name.split(' ')[0]} ▾
      </button>
      <div class="nav-dropdown" id="navDropdown">
        ${adminLink}
        <button id="navLogoutBtn">🚪 Çıkış Yap</button>
      </div>`;

    const toggle   = li.querySelector('#navAuthToggle');
    const dropdown = li.querySelector('#navDropdown');

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.toggle('open');
    });

    document.addEventListener('click', () => dropdown.classList.remove('open'));

    li.querySelector('#navLogoutBtn').addEventListener('click', async () => {
      await Auth.logout();
      currentUser = null;
      window.location.reload();
    });

  } else {
    const base = window.location.pathname.includes('/pages/') ? '' : 'pages/';
    li.innerHTML = `<a href="${base}login.html">Giriş Yap</a>`;
  }

  nav.appendChild(li);
}

/* Sayfa yüklendiğinde oturumu kontrol et */
document.addEventListener('DOMContentLoaded', initSession);
