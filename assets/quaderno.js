/* ==========================================================================
   il Baito del Gigio — tema giorno/notte, menu a tendina, ordine dei viaggi.
   Nessuna dipendenza. Senza JavaScript il sito funziona lo stesso: l'elenco
   resta in ordine di data e il menu si apre comunque.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ------------------------------------------------------- giorno / notte */
  (function tema() {
    var btn = document.getElementById('tema');
    if (!btn) return;
    var KEY = 'baito-tema';
    var buio = window.matchMedia('(prefers-color-scheme: dark)');
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    var FONDO = { light: '#F4ECDD', dark: '#1D1611' };

    function attuale() {
      var t = root.getAttribute('data-theme');
      return t === 'light' || t === 'dark' ? t : (buio.matches ? 'dark' : 'light');
    }

    function aggiorna() {
      var t = attuale();
      var label = t === 'dark' ? 'Passa al giorno' : 'Passa alla notte';
      btn.setAttribute('aria-label', label);
      btn.title = label;
      if (root.hasAttribute('data-theme')) {
        for (var i = 0; i < metas.length; i++) metas[i].setAttribute('content', FONDO[t]);
      }
    }

    btn.addEventListener('click', function () {
      var dopo = attuale() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', dopo);
      try { localStorage.setItem(KEY, dopo); } catch (e) { /* navigazione privata */ }
      aggiorna();
    });

    if (buio.addEventListener) buio.addEventListener('change', aggiorna);
    btn.hidden = false;
    aggiorna();
  })();

  /* ---------------------------------------------------------------- menu */
  (function menu() {
    var m = document.querySelector('.menu');
    if (!m) return;
    var tasto = m.querySelector('summary');

    function aggiorna() { tasto.setAttribute('aria-label', m.open ? 'Chiudi menu' : 'Menu'); }
    m.addEventListener('toggle', aggiorna);

    // si chiude cliccando fuori…
    document.addEventListener('click', function (e) {
      if (m.open && !m.contains(e.target)) m.open = false;
    });
    // …o con Esc, e il fuoco torna sul tasto
    document.addEventListener('keydown', function (e) {
      if (m.open && (e.key === 'Escape' || e.key === 'Esc')) {
        m.open = false;
        tasto.focus();
      }
    });
  })();

  /* ------------------------------------------------------ ordine viaggi */
  (function ordina() {
    var barra = document.getElementById('ordina');
    var lista = document.getElementById('viaggi');
    if (!barra || !lista) return;

    var voci = Array.prototype.slice.call(lista.children);
    var tasti = Array.prototype.slice.call(barra.querySelectorAll('button[data-chiave]'));
    var stato = document.getElementById('ordina-stato');
    if (voci.length < 2) return;

    // verso di partenza per ogni chiave: recenti, lunghi, A→Z
    var INIZIO = { data: 'giu', durata: 'giu', nome: 'su' };
    var DETTO = {
      data:   { giu: 'dal più recente', su: 'dal più vecchio' },
      durata: { giu: 'dal più lungo',   su: 'dal più corto' },
      nome:   { giu: 'dalla Z alla A',  su: 'dalla A alla Z' }
    };
    var chiave = 'data';
    var verso = 'giu';

    function valore(li, k) {
      if (k === 'nome') return li.getAttribute('data-nome') || '';
      return parseFloat(li.getAttribute('data-' + k)) || 0;
    }

    function confronta(a, b) {
      var x = valore(a, chiave), y = valore(b, chiave);
      var d = chiave === 'nome' ? x.localeCompare(y, 'it', { sensitivity: 'base' }) : x - y;
      if (verso === 'giu') d = -d;
      // a parità, il più recente prima
      return d || valore(b, 'data') - valore(a, 'data');
    }

    function applica(annuncia) {
      voci.slice().sort(confronta).forEach(function (li) { lista.appendChild(li); });
      tasti.forEach(function (t) {
        var attivo = t.getAttribute('data-chiave') === chiave;
        t.setAttribute('aria-pressed', attivo ? 'true' : 'false');
        if (attivo) t.setAttribute('data-verso', verso); else t.removeAttribute('data-verso');
      });
      if (annuncia && stato) stato.textContent = 'Ordinati per ' + chiave + ', ' + DETTO[chiave][verso] + '.';
    }

    tasti.forEach(function (t) {
      t.addEventListener('click', function () {
        var k = t.getAttribute('data-chiave');
        if (k === chiave) verso = verso === 'giu' ? 'su' : 'giu';
        else { chiave = k; verso = INIZIO[k]; }
        applica(true);
      });
    });

    barra.hidden = false;
    applica(false);
  })();
})();
