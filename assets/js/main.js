/* Victor Young — portfolio behaviour */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- theme ---------- */
  function setTheme(t) {
    root.setAttribute('data-theme', t);
    try { localStorage.setItem('vy-theme', t); } catch (e) { /* storage blocked — fine */ }
    var btn = document.querySelector('.themebtn');
    if (btn) btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }
  document.addEventListener('click', function (e) {
    if (e.target.closest('.themebtn')) {
      setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
    }
  });
  // follow the OS if the visitor has never chosen
  try {
    if (!localStorage.getItem('vy-theme')) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (ev) {
        root.setAttribute('data-theme', ev.matches ? 'dark' : 'light');
      });
    }
  } catch (e) {}

  /* ---------- nav: scrolled state + mobile menu ---------- */
  var wrap = document.querySelector('.navwrap');
  function onScroll() {
    document.body.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  document.addEventListener('click', function (e) {
    if (e.target.closest('.menubtn')) {
      var open = document.body.classList.toggle('is-menu');
      var b = document.querySelector('.menubtn');
      if (b) b.setAttribute('aria-expanded', open ? 'true' : 'false');
      return;
    }
    if (!e.target.closest('.navwrap')) document.body.classList.remove('is-menu');
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') document.body.classList.remove('is-menu');
  });

  /* ---------- scroll reveals ---------- */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    document.querySelectorAll('.hero .rv, .cv-head.rv').forEach(function (el, i) {
      setTimeout(function () { el.classList.add('in'); }, 100 + i * 100);
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var sibs = Array.prototype.slice.call(en.target.parentNode.children)
          .filter(function (n) { return n.classList.contains('rv'); });
        var i = Math.max(0, sibs.indexOf(en.target));
        setTimeout(function () { en.target.classList.add('in'); }, Math.min(i, 5) * 80);
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 });
    items.forEach(function (el) {
      if (!el.closest('.hero') && !el.classList.contains('cv-head')) io.observe(el);
    });
  }

  /* ---------- the idea → live spine draws once ---------- */
  var spine = document.querySelector('.spine');
  if (spine && !reduce && 'IntersectionObserver' in window) {
    var so = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { spine.classList.add('on'); so.disconnect(); } });
    }, { threshold: 0.25 });
    so.observe(spine);
  } else if (spine) {
    spine.classList.add('on');
  }

  /* ---------- soft fade between pages ---------- */
  if (!reduce) {
    document.addEventListener('click', function (ev) {
      var a = ev.target.closest('a');
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (a.target === '_blank' || !href || href.charAt(0) === '#' ||
          href.indexOf('mailto:') === 0 || href.indexOf('tel:') === 0 || href.indexOf('http') === 0) return;
      ev.preventDefault();
      document.body.classList.add('leaving');
      setTimeout(function () { window.location.href = href; }, 240);
    });
  }
})();
