/* =============================================
   VELORA SUIT HOTEL — MAIN.JS
   ============================================= */

// ── Language System ──────────────────────────
const LANG_KEY = 'velora_lang';
let currentLang = localStorage.getItem(LANG_KEY) || 'tr';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-tr]').forEach(el => {
    const val = el.getAttribute('data-' + lang);
    if (val !== null) el.textContent = val;
  });

  document.querySelectorAll('[data-tr-html]').forEach(el => {
    const val = el.getAttribute('data-' + lang + '-html');
    if (val !== null) el.innerHTML = val;
  });

  document.querySelectorAll('[data-placeholder-tr]').forEach(el => {
    el.placeholder = el.getAttribute('data-placeholder-' + lang) || '';
  });

  const btn = document.querySelector('.lang-btn');
  if (btn) btn.textContent = lang === 'tr' ? 'EN' : 'TR';
}

function toggleLang() {
  setLang(currentLang === 'tr' ? 'en' : 'tr');
}

document.addEventListener('DOMContentLoaded', () => setLang(currentLang));

// ── Hamburger Menu ──────────────────────────
(function () {
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && hamburger.classList.contains('open')) {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
})();

// ── Scroll Reveal ───────────────────────────
(function () {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = idx * 80 + 'ms';
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  targets.forEach(el => observer.observe(el));
})();

// ── Lightbox ─────────────────────────────────
(function () {
  // Build lightbox DOM
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML = `
    <div class="lightbox__img-wrap">
      <button class="lightbox__close" aria-label="Kapat">✕</button>
      <button class="lightbox__nav lightbox__prev" aria-label="Önceki">‹</button>
      <button class="lightbox__nav lightbox__next" aria-label="Sonraki">›</button>
      <img src="" alt="">
      <p class="lightbox__caption"></p>
      <span class="lightbox__counter"></span>
    </div>`;
  document.body.appendChild(lb);

  const lbImg     = lb.querySelector('img');
  const lbCaption = lb.querySelector('.lightbox__caption');
  const lbCounter = lb.querySelector('.lightbox__counter');
  const lbWrap    = lb.querySelector('.lightbox__img-wrap');

  let images = [];
  let current = 0;

  function collectImages() {
    images = [...document.querySelectorAll('.img-trigger img')];
  }

  function show(idx) {
    collectImages();
    if (!images.length) return;
    current = (idx + images.length) % images.length;
    const img = images[current];
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = img.alt;
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbImg.focus?.();
  }

  function close() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Delegate click on .img-trigger
  document.addEventListener('click', e => {
    const trigger = e.target.closest('.img-trigger');
    if (trigger) {
      collectImages();
      const img = trigger.querySelector('img');
      const idx = images.indexOf(img);
      show(idx >= 0 ? idx : 0);
      return;
    }
    // Close on backdrop click
    if (e.target === lb) close();
  });

  lb.querySelector('.lightbox__close').addEventListener('click', close);
  lb.querySelector('.lightbox__prev').addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
  lb.querySelector('.lightbox__next').addEventListener('click', e => { e.stopPropagation(); show(current + 1); });
  lbWrap.addEventListener('click', e => e.stopPropagation());

  // Keyboard
  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape')    close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  // Touch swipe
  let touchX = 0;
  lb.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
  });
})();


(function () {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar__nav a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === path) link.classList.add('active');
  });
})();

// ── Navbar Scroll ───────────────────────────
(function () {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.background = window.scrollY > 40
      ? 'rgba(13,12,11,0.98)' : 'rgba(13,12,11,0.92)';
  }, { passive: true });
})();

// ── 3. Yukarı Çık Butonu ─────────────────────
// Sayfa aşağı kaydırıldığında sağ altta beliren,
// tıklayınca sayfanın en üstüne smooth scroll yapan buton.
(function () {
  // Butonu DOM'a ekle
  const btn = document.createElement('button');
  btn.className = 'scroll-top-btn';
  btn.setAttribute('aria-label', 'Yukarı çık');
  btn.innerHTML = '↑';
  document.body.appendChild(btn);

  // 300px aşağı inilince butonu göster
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 300);
  }, { passive: true });

  // Tıklanınca en üste git
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// ── 4. Sayaç Animasyonu ──────────────────────
// .counter-num class'ına sahip elementlerin
// data-target değerine kadar sayı animasyonu yapar.
// IntersectionObserver ile ekrana girince tetiklenir.
(function () {
  const counters = document.querySelectorAll('.counter-num');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = +el.getAttribute('data-target');
    const duration = 1800; // ms
    const step = 16;       // ~60fps
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
})();

// ── Accordion (SSS) ──────────────────────────
// Olanaklar sayfasındaki SSS bölümünde
// soruya tıklayınca cevap açılır/kapanır.
// Aynı anda sadece bir cevap açık kalır.
(function () {
  const triggers = document.querySelectorAll('.accordion__trigger');
  if (!triggers.length) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item    = trigger.closest('.accordion__item');
      const body    = item.querySelector('.accordion__body');
      const icon    = trigger.querySelector('.accordion__icon');
      const isOpen  = trigger.getAttribute('aria-expanded') === 'true';

      // Tümünü kapat
      document.querySelectorAll('.accordion__item').forEach(i => {
        i.querySelector('.accordion__trigger').setAttribute('aria-expanded', 'false');
        i.querySelector('.accordion__body').style.maxHeight = null;
        i.querySelector('.accordion__icon').textContent = '+';
        i.classList.remove('open');
      });

      // Tıklanan kapalıysa aç
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        body.style.maxHeight = body.scrollHeight + 'px';
        icon.textContent = '−';
        item.classList.add('open');
      }
    });
  });
})();

// ── Dark / Light Mode ────────────────────────
// Navbar'daki 🌙/☀️ butonuyla açık/koyu tema arasında geçiş.
// Seçim localStorage'a kaydedilir.
(function () {
  const DARK_KEY = 'velora_dark';
  const btn = document.querySelector('.darkmode-btn');
  if (!btn) return;

  function applyTheme(isDark) {
    document.body.classList.toggle('light-mode', !isDark);
    btn.textContent = isDark ? '☀️' : '🌙';
    btn.setAttribute('aria-label', isDark ? 'Açık temaya geç' : 'Koyu temaya geç');
    localStorage.setItem(DARK_KEY, isDark ? '1' : '0');
  }

  // Kayıtlı tercihi uygula (varsayılan: koyu)
  const saved = localStorage.getItem(DARK_KEY);
  applyTheme(saved === null ? true : saved === '1');

  btn.addEventListener('click', () => {
    applyTheme(document.body.classList.contains('light-mode'));
  });
})();

// ── Image Slider ─────────────────────────────
// Ana sayfadaki galeri bölümünde oda fotoğrafları
// arasında otomatik ve manuel geçiş yapan slider.
(function () {
  const slider = document.querySelector('.slider');
  if (!slider) return;

  const slides    = slider.querySelectorAll('.slide');
  const prevBtn   = slider.querySelector('.slider__prev');
  const nextBtn   = slider.querySelector('.slider__next');
  const dotsWrap  = slider.querySelector('.slider__dots');
  let current     = 0;
  let autoTimer;

  // Dot'ları oluştur
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider__dot';
    dot.setAttribute('aria-label', (i + 1) + '. slayt');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  const dots = dotsWrap.querySelectorAll('.slider__dot');

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
    resetAuto();
  }

  function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 4500);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  // Touch swipe
  let tx = 0;
  slider.addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - tx;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
  });

  // Keyboard
  slider.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  goTo(0);
})();

// ── Sekme (Tabs) Sistemi ─────────────────────
// Odalar sayfasında oda tiplerini sekme butonlarıyla
// gösterir/gizler. Aktif sekme vurgulu görünür.
(function () {
  const tabBtns    = document.querySelectorAll('.tab-btn');
  const tabPanels  = document.querySelectorAll('.tab-panel');
  if (!tabBtns.length) return;

  function activateTab(idx) {
    tabBtns.forEach((b, i) => {
      b.classList.toggle('active', i === idx);
      b.setAttribute('aria-selected', i === idx);
    });
    tabPanels.forEach((p, i) => {
      p.classList.toggle('active', i === idx);
    });
  }

  tabBtns.forEach((btn, i) => {
    btn.addEventListener('click', () => activateTab(i));
  });

  activateTab(0);
})();
