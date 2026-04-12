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
