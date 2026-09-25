/* Client-side site search over /search-index.json */
(function () {
  'use strict';
  var results = document.getElementById('search-results');
  var input = document.getElementById('search-q');
  if (!results || !input) return;
  var params = new URLSearchParams(location.search);
  var q = (params.get('q') || '').trim();
  input.value = q;
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function tokens(s) { return s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(function (t) { return t.length > 1; }); }
  function score(doc, terms) {
    var t = doc.t.toLowerCase(), d = doc.d.toLowerCase(), k = (doc.k || '').toLowerCase(), h = doc.h.toLowerCase();
    var s = 0;
    terms.forEach(function (term) {
      if (t.indexOf(term) !== -1) s += 6;
      if (k.indexOf(term) !== -1) s += 4;
      if (d.indexOf(term) !== -1) s += 2;
      if (h.indexOf(term) !== -1) s += 1;
    });
    var phrase = terms.join(' ');
    if (phrase && t.indexOf(phrase) !== -1) s += 8;
    return s;
  }
  function render(list, terms) {
    if (!terms.length) { results.innerHTML = '<p>Type a word or two above, for example <em>waking at 3am</em> or <em>brown noise</em>.</p>'; return; }
    if (!list.length) { results.innerHTML = '<p>No guides matched <strong>' + esc(terms.join(' ')) + '</strong>. Try a broader term, or browse the <a href="/sitemap/">sitemap</a>.</p>'; return; }
    results.innerHTML = '<p class="search-count">' + list.length + ' guide' + (list.length === 1 ? '' : 's') + ' found</p>' + list.map(function (r) {
      return '<article class="search-result"><span class="card-kicker">' + esc(r.h) + '</span><h2><a href="' + esc(r.u) + '">' + esc(r.t) + '</a></h2><p>' + esc(r.d) + '</p></article>';
    }).join('');
  }
  var index = null;
  function run() {
    var terms = tokens(input.value);
    if (!index) return;
    var scored = index.map(function (doc) { return { doc: doc, s: score(doc, terms) }; }).filter(function (x) { return x.s > 0; }).sort(function (a, b) { return b.s - a.s; }).slice(0, 30).map(function (x) { return x.doc; });
    render(scored, terms);
  }
  fetch('/search-index.json').then(function (r) { return r.json(); }).then(function (data) { index = data; run(); }).catch(function () { results.innerHTML = '<p>Search is unavailable right now. Browse the <a href="/sitemap/">sitemap</a> instead.</p>'; });
  var t;
  input.addEventListener('input', function () { clearTimeout(t); t = setTimeout(function () { history.replaceState(null, '', '/search/?q=' + encodeURIComponent(input.value)); run(); }, 150); });
  input.closest('form').addEventListener('submit', function (e) { e.preventDefault(); run(); });
})();
