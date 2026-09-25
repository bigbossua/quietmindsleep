/* Quiet Mind Sleep — minimal, dependency-free behaviour. */
(function () {
  'use strict';
  // Mobile navigation
  var toggle = document.querySelector('[data-nav-toggle]');
  var nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });
  }
  // Affiliate click events (only when analytics is configured; no tracking otherwise)
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-affiliate]');
    if (!a) return;
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', { provider: a.getAttribute('data-affiliate'), product: a.getAttribute('data-product'), page_path: location.pathname });
    }
  });
  // Email forms: until a provider is connected, show the on-site plan instead of failing silently
  var forms = document.querySelectorAll('[data-email-form]');
  Array.prototype.forEach.call(forms, function (form) {
    if (form.getAttribute('data-configured') === 'true') return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var fb = form.querySelector('.email-fallback');
      if (fb) fb.hidden = false;
      var input = form.querySelector('input[type="email"]');
      if (input) input.blur();
    });
  });
  // Track FAQ opens for GA4 only when configured
  document.addEventListener('toggle', function (e) {
    if (e.target && e.target.matches && e.target.matches('details.faq-item') && e.target.open && typeof window.gtag === 'function') {
      window.gtag('event', 'faq_open', { question: (e.target.querySelector('summary') || {}).textContent });
    }
  }, true);
})();
