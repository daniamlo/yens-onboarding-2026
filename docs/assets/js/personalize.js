/* Fill the student's own identifiers into the commands on the page.
 *
 * The pages are written with placeholders — SUNetID for the Stanford account,
 * YOUR_GITHUB_USERNAME (and YOUR_USERNAME in diagrams) for the GitHub one, and
 * YENNODE for whichever interactive Yen the load balancer handed them.
 * Setting a value once rewrites every one of them, so a student can copy a
 * command straight out of the page instead of pasting it and then editing it in
 * the terminal, which is where the typos happen.
 *
 * Four rules keep the substitution honest:
 *
 *   1. Only inside code and SVG <text>. Running prose says things like "sign in
 *      with your SUNetID", meaning the term rather than the value; rewriting
 *      those to "sign in with your jdoe" would be nonsense.
 *   2. Each occurrence becomes its own element, so an unfilled one can be
 *      clicked to jump to the field that fills it — which is how a student who
 *      never noticed the sidebar finds it, at the moment they need it. HTML
 *      gets a <span>; SVG gets a <tspan>, since a <text> cannot hold a span.
 *   3. The literal token is kept on the element, so clearing a field puts the
 *      placeholders back rather than leaving a half-substituted page.
 *   4. A link whose href still holds a placeholder loses its href entirely —
 *      pointing at a literal YOUR_GITHUB_USERNAME account is worse than
 *      offering no link.
 *
 * Values live in localStorage (this browser only, never sent anywhere), so the
 * other pages are already filled in when the student reaches them.
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';

  // `where` names the control that fills the field, for the tooltip on a
  // placeholder: two of these live in the sidebar, the third does not.
  var FIELDS = {
    sunet:  { key: 'yens-sunet',       label: 'SUNet ID',        where: 'the sidebar', tokens: ['SUNetID'] },
    // yens-gh-username predates this script; kept so anyone who already typed
    // their GitHub name on Git & GitHub does not have to type it again.
    github: { key: 'yens-gh-username', label: 'GitHub username', where: 'the sidebar', tokens: ['YOUR_GITHUB_USERNAME', 'YOUR_USERNAME'] },
    // Which interactive Yen they landed on. Unlike the two above, this changes
    // at every login, so it lives in sessionStorage: a stale yen3 tomorrow
    // would aim the second terminal at the wrong machine, which is the one
    // thing Profiling's two-terminal exercise cannot survive. Only that page
    // needs it, so its control is inline there rather than in the sidebar.
    yen:    { key: 'yens-node',        label: 'Yen node',        where: 'Step 1', session: true, tokens: ['YENNODE'] }
  };
  var NAMES = Object.keys(FIELDS);

  // Longest first, so YOUR_GITHUB_USERNAME is matched before YOUR_USERNAME
  // would claim its tail.
  var TOKENS = [];
  NAMES.forEach(function (n) {
    FIELDS[n].tokens.forEach(function (t) { TOKENS.push({ token: t, field: n }); });
  });
  TOKENS.sort(function (a, b) { return b.token.length - a.token.length; });

  function store(name) {
    return FIELDS[name].session ? window.sessionStorage : window.localStorage;
  }

  function read(name) {
    try { return (store(name).getItem(FIELDS[name].key) || '').trim(); }
    catch (e) { return ''; }                       // private mode
  }

  function write(name, value) {
    try {
      if (value) store(name).setItem(FIELDS[name].key, value);
      else store(name).removeItem(FIELDS[name].key);
    } catch (e) { /* private mode — substitution still works for this page */ }
  }

  function firstToken(text) {
    var best = null;
    for (var i = 0; i < TOKENS.length; i++) {
      var at = text.indexOf(TOKENS[i].token);
      if (at > -1 && (!best || at < best.at)) best = { at: at, spec: TOKENS[i] };
    }
    return best;
  }

  // ── Wrapping: one element per occurrence, done once ───────────────────────

  function wrap() {
    var root = document.querySelector('.main-content');
    if (!root) return;
    var hosts = root.querySelectorAll('code, pre, svg text');
    Array.prototype.forEach.call(hosts, function (host) {
      // A <code> inside <pre> would otherwise be walked twice.
      if (host.tagName === 'CODE' && host.closest('pre')) return;
      var isSvg = host.namespaceURI === SVG_NS;
      var walker = document.createTreeWalker(host, NodeFilter.SHOW_TEXT, null);
      var texts = [];
      while (walker.nextNode()) texts.push(walker.currentNode);
      texts.forEach(function (node) {
        if (node.parentNode && node.parentNode.dataset &&
            node.parentNode.dataset.personalizeToken) return;      // already wrapped
        var rest = node.nodeValue;
        if (!firstToken(rest)) return;
        var frag = document.createDocumentFragment();
        var hit;
        while ((hit = firstToken(rest))) {
          if (hit.at) frag.appendChild(document.createTextNode(rest.slice(0, hit.at)));
          var el = isSvg ? document.createElementNS(SVG_NS, 'tspan')
                         : document.createElement('span');
          el.setAttribute('data-personalize-token', hit.spec.token);
          el.setAttribute('data-personalize-field', hit.spec.field);
          frag.appendChild(el);
          rest = rest.slice(hit.at + hit.spec.token.length);
        }
        if (rest) frag.appendChild(document.createTextNode(rest));
        node.parentNode.replaceChild(frag, node);
      });
    });
  }

  function tokenEls() {
    return Array.prototype.slice.call(
      document.querySelectorAll('[data-personalize-token]')
    );
  }

  // ── Links ────────────────────────────────────────────────────────────────

  // Links whose href names the student's fork — the repo settings page, the
  // checkpoint branch. Substituting the visible label while leaving the href on
  // a placeholder would hand them a broken link.
  var links = null;

  function collectLinks() {
    if (links) return links;
    links = [];
    var root = document.querySelector('.main-content');
    if (!root) return links;
    Array.prototype.forEach.call(root.querySelectorAll('a[href]'), function (a) {
      if (firstToken(a.getAttribute('href'))) {
        links.push({ el: a, original: a.getAttribute('href') });
      }
    });
    return links;
  }

  function fillText(text, vals) {
    TOKENS.forEach(function (spec) {
      if (vals[spec.field]) text = text.split(spec.token).join(vals[spec.field]);
    });
    return text;
  }

  function hrefIsIncomplete(href, vals) {
    for (var i = 0; i < TOKENS.length; i++) {
      if (href.indexOf(TOKENS[i].token) > -1 && !vals[TOKENS[i].field]) return true;
    }
    return false;
  }

  // ── Render ───────────────────────────────────────────────────────────────

  function render() {
    var vals = {};
    NAMES.forEach(function (n) { vals[n] = read(n); });

    tokenEls().forEach(function (el) {
      var field = el.getAttribute('data-personalize-field');
      var token = el.getAttribute('data-personalize-token');
      var value = vals[field];
      el.textContent = value || token;
      el.setAttribute('class', 'personalize-token' + (value ? '' : ' personalize-token-unset'));
      if (value) {
        el.removeAttribute('role');
        el.removeAttribute('tabindex');
        el.setAttribute('title', 'Your ' + FIELDS[field].label + ' — change it in ' + FIELDS[field].where);
      } else {
        el.setAttribute('role', 'button');
        el.setAttribute('tabindex', '0');
        el.setAttribute('title', 'Click to set your ' + FIELDS[field].label);
      }
    });

    collectLinks().forEach(function (rec) {
      if (hrefIsIncomplete(rec.original, vals)) {
        rec.el.removeAttribute('href');
        rec.el.setAttribute('title', 'Set your details in the sidebar to enable this link');
        rec.el.classList.add('personalize-pending');
      } else {
        rec.el.setAttribute('href', fillText(rec.original, vals));
        rec.el.removeAttribute('title');
        rec.el.classList.remove('personalize-pending');
      }
    });

    inputs().forEach(function (input) {
      var name = input.getAttribute('data-personalize');
      if (input !== document.activeElement) input.value = vals[name] || '';
    });

    var filled = NAMES.filter(function (n) { return vals[n]; }).length;
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-personalize-status]'),
      function (box) { box.textContent = filled ? '✓ commands updated' : ''; }
    );
  }

  // ── Inputs ───────────────────────────────────────────────────────────────

  // Every control bound to a field, wherever it lives: the sidebar renders
  // twice (desktop and mobile), Git & GitHub has one inline in a callout, and
  // Profiling has a <select> — five nodes exist, so picking beats typing.
  function inputs() {
    return Array.prototype.slice.call(
      document.querySelectorAll('input[data-personalize], select[data-personalize]')
    );
  }

  // Prefer one the student can actually see — the desktop sidebar copy is
  // display:none on narrow screens and the mobile copy is hidden on wide ones.
  function focusField(name) {
    var all = inputs().filter(function (i) {
      return i.getAttribute('data-personalize') === name;
    });
    var target = all.filter(function (i) { return i.offsetParent !== null; })[0] || all[0];
    if (!target) return;
    target.scrollIntoView({ block: 'center' });
    target.focus();
    if (target.select) target.select();            // a <select> has no select()
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest ? e.target.closest('.personalize-token-unset') : null;
    if (!el) return;
    e.preventDefault();
    focusField(el.getAttribute('data-personalize-field'));
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.classList && e.target.classList.contains('personalize-token-unset')
      ? e.target : null;
    if (!el) return;
    e.preventDefault();
    focusField(el.getAttribute('data-personalize-field'));
  });

  inputs().forEach(function (input) {
    input.addEventListener('input', function () {
      var name = input.getAttribute('data-personalize');
      if (!FIELDS[name]) return;
      write(name, input.value.trim());
      render();
    });
  });

  wrap();
  render();   // also what strips the placeholder hrefs when nothing is set yet
})();
