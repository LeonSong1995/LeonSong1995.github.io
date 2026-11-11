/* ───────────────────────── theme toggle ───────────────────────── */
(function () {
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  btn.addEventListener('click', function () {
    var cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    var next = cur === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

/* ───────────────────────── typed terminal intro ─────────────────────────
   Edit the `lines` array to change the text. Each line is an array of
   [cssClass, text] segments; use "" for plain text. */
(function () {
  var el = document.getElementById('term');
  if (!el) return;

  // A short shell session: lines with a 'cmd' segment are typed slowly,
  // everything else "prints" instantly after a brief pause.
  var lines = [
    [['prompt', '❯ '], ['cmd', 'whoami']],
    [['hl', 'Liyang Song'], ['', ' · postdoctoral researcher, Yang Lab @ Westlake University']],
    [],
    [['prompt', '❯ '], ['cmd', 'cat research.md']],
    [['key', '# Statistical genetics × AI']],
    [['', 'Mapping the cells and tissue contexts behind human complex traits']],
    [['', 'by integrating GWAS with spatial and single-cell omics.']],
    [],
    [['prompt', '❯ '], ['cmd', 'ls ~/software']],
    [['hl', 'gsMap/'], ['', '    '], ['hl', 'MeDuSA/'], ['', '    '], ['hl', 'gsMap3D/']],
    [],
    [['prompt', '❯ '], ['cmd', 'git log --oneline']],
    [['key', '2026'], ['', '  Ray Wu Prize · Ray Wu Memorial Fund']],
    [['key', '2026'], ['', '  Ph.D. in statistical genetics · Westlake University']],
    [['key', '2025'], ['', '  gsMap · '], ['dim', 'Nature']],
    [['key', '2025'], ['', '  Perspective on spatial genetics · '], ['dim', 'Nature Reviews Genetics']],
    [['key', '2023'], ['', '  MeDuSA · '], ['dim', 'Nature Computational Science']],
    [],
    [['prompt', '❯ ']]
  ];

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var done = false, timer = null;

  function span(cls, text) {
    var s = document.createElement('span');
    if (cls) s.className = cls;
    s.textContent = text;
    return s;
  }
  function cursor() { var c = document.createElement('span'); c.className = 'cursor'; return c; }

  function renderAll() {
    done = true;
    if (timer) clearTimeout(timer);
    el.textContent = '';
    lines.forEach(function (segs, i) {
      segs.forEach(function (seg) { el.appendChild(span(seg[0], seg[1])); });
      if (i < lines.length - 1) el.appendChild(document.createTextNode('\n'));
    });
    el.appendChild(cursor());
  }

  function typeAnimated() {
    var li = 0, si = 0, ci = 0;
    var cur = cursor();
    el.textContent = '';
    el.appendChild(cur);

    function step() {
      if (done) return;
      if (li >= lines.length) { done = true; return; }
      var segs = lines[li];
      if (si >= segs.length) {
        // end of line: pause after a command (as if it runs), take a beat after blank lines
        var wasCmd = segs.some(function (s) { return s[0] === 'cmd'; });
        li++; si = 0; ci = 0;
        if (li < lines.length) el.insertBefore(document.createTextNode('\n'), cur);
        timer = setTimeout(step, wasCmd ? 320 : (segs.length === 0 ? 160 : 30));
        return;
      }
      var seg = segs[si];
      if (ci === 0) { seg._node = span(seg[0], ''); el.insertBefore(seg._node, cur); }
      ci++;
      seg._node.textContent = seg[1].slice(0, ci);
      if (ci >= seg[1].length) { si++; ci = 0; }
      // commands are typed, output "prints" fast
      timer = setTimeout(step, seg[0] === 'cmd' ? 55 : 5);
    }
    step();
  }

  el.addEventListener('click', function () { if (!done) renderAll(); });
  el.addEventListener('keydown', function (e) { if (!done && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); renderAll(); } });

  if (reduce) renderAll(); else typeAnimated();
})();

/* ───────────────────────── live GitHub star counts ───────────────────────── */
(function () {
  var nodes = document.querySelectorAll('[data-stars]');
  if (!nodes.length || !window.fetch) return;
  var repos = {};
  nodes.forEach(function (n) { (repos[n.getAttribute('data-stars')] = repos[n.getAttribute('data-stars')] || []).push(n); });
  Object.keys(repos).forEach(function (repo) {
    fetch('https://api.github.com/repos/' + repo)
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) {
        if (!d || typeof d.stargazers_count !== 'number') return;
        repos[repo].forEach(function (n) { n.textContent = d.stargazers_count; });
      })
      .catch(function () { /* keep the static fallback */ });
  });
})();

/* ───────────────────────── scroll-spy for the nav pills ───────────────────────── */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;
  var byId = {};
  links.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
  var visible = {};
  function update() {
    var best = null, bestTop = Infinity;
    Object.keys(visible).forEach(function (id) {
      var top = visible[id];
      if (top < bestTop) { bestTop = top; best = id; }
    });
    if (!best) return;
    links.forEach(function (a) { a.classList.toggle('active', a === byId[best]); });
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      var id = e.target.id;
      if (e.isIntersecting) visible[id] = Math.abs(e.boundingClientRect.top);
      else delete visible[id];
    });
    update();
  }, { rootMargin: '-20% 0px -60% 0px', threshold: 0 });
  Object.keys(byId).forEach(function (id) {
    var sec = document.getElementById(id);
    if (sec) io.observe(sec);
  });
})();

/* ───────────────────────── footer year ───────────────────────── */
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
})();
