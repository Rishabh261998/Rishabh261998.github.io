(function () {
  'use strict';

  var root = document.documentElement;

  // Theme toggle (persists in localStorage; falls back to system preference).
  var toggle = document.getElementById('theme-toggle');
  function currentTheme() {
    var attr = root.getAttribute('data-theme');
    if (attr === 'dark' || attr === 'light') return attr;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Mobile navigation.
  var navToggle = document.getElementById('nav-toggle');
  var nav = document.getElementById('site-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = root.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        root.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Header shadow once scrolled.
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Highlight the nav link for the section in view (home page only).
  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav__link[href*="#"]'));
  if (sections.length && links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').split('#')[1];
      if (id) byId[id] = a;
    });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var active = null;
      for (var i = 0; i < sections.length; i++) {
        if (visible[sections[i].id]) { active = sections[i].id; break; }
      }
      links.forEach(function (a) { a.classList.remove('is-active'); });
      if (active && byId[active]) byId[active].classList.add('is-active');
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    sections.forEach(function (s) { io.observe(s); });
  }

  // Reveal-on-scroll for cards (respects reduced motion).
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealables = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
  if (!reduce && revealables.length && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          ro.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
    revealables.forEach(function (el) { ro.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // Expand/collapse long experience entries.
  Array.prototype.slice.call(document.querySelectorAll('[data-expand]')).forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('aria-controls'));
      if (!target) return;
      var open = target.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Show less' : 'Show more';
    });
  });
})();
