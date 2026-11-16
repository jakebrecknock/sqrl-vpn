// SQrL site interactions. Everything here is an enhancement: the site works without it.
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ---------- Reading progress bar (all pages) ----------
  const bar = document.createElement('div');
  bar.className = 'sqrl-progress';
  bar.setAttribute('aria-hidden', 'true');
  document.body.appendChild(bar);

  // ---------- Back-to-top button ----------
  const topBtn = document.createElement('button');
  topBtn.type = 'button';
  topBtn.className = 'sqrl-top';
  topBtn.setAttribute('aria-label', 'Back to top');
  topBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));
  document.body.appendChild(topBtn);

  const nav = $('.td-navbar');
  let ticking = false;
  const onScroll = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    const p = max > 0 ? h.scrollTop / max : 0;
    bar.style.transform = `scaleX(${p})`;
    topBtn.classList.toggle('is-visible', h.scrollTop > 600);
    if (nav) nav.classList.toggle('sqrl-scrolled', h.scrollTop > 8);
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // ---------- Scroll reveal ----------
  const revealTargets = $$([
    '.sqrl-section-title', '.sqrl-kicker', '.sqrl-about', '.sqrl-lede',
    '.sqrl-card', '.sqrl-feature', '.sqrl-stat', '.sqrl-map', '.sqrl-arch',
    '.sqrl-index__card', '.td-content > h2', '.sqrl-pager',
  ].join(','));
  if ('IntersectionObserver' in window && !reduceMotion) {
    revealTargets.forEach((el) => {
      el.classList.add('sqrl-reveal');
      // stagger siblings in a grid
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.classList.contains(el.classList[0])) : [];
      const i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = `${Math.min(i, 6) * 70}ms`;
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealTargets.forEach((el) => io.observe(el));
  }

  // ---------- Card spotlight (follows the pointer) ----------
  $$('.sqrl-card, .sqrl-feature, .sqrl-index__card, .sqrl-arch__node').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });

  // ---------- Hero: soft light that follows the pointer ----------
  const hero = $('.sqrl-hero');
  if (hero) {
    const fx = document.createElement('div');
    fx.className = 'sqrl-hero__fx';
    fx.setAttribute('aria-hidden', 'true');
    hero.prepend(fx);
    if (!reduceMotion) {
      hero.addEventListener('pointermove', (e) => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--hx', `${((e.clientX - r.left) / r.width) * 100}%`);
        hero.style.setProperty('--hy', `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    }
  }

  // ---------- Count-up numbers ----------
  const counters = $$('[data-count]');
  if (counters.length && 'IntersectionObserver' in window && !reduceMotion) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        co.unobserve(el);
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const t0 = performance.now();
        const dur = 1100;
        const step = (t) => {
          const k = Math.min(1, (t - t0) / dur);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = `${Math.round(end * eased)}${suffix}`;
          if (k < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  // ---------- Server map demo ----------
  $$('[data-sqrl-map]').forEach((map) => {
    const pins = $$('.sqrl-pin', map);
    const rows = $$('.sqrl-city', map);
    const canvas = $('.sqrl-map__canvas', map);
    const tunnel = $('.sqrl-map__tunnel', map);
    const state = $('.sqrl-map__state', map);
    const detail = $('.sqrl-map__detail', map);
    const fastestBtn = $('[data-sqrl-fastest]', map);
    const offBtn = $('[data-sqrl-disconnect]', map);
    const idleText = detail.textContent;
    const yx = Number(map.dataset.youX);
    const yy = Number(map.dataset.youY);
    const tierName = { fastest: 'Fastest', fast: 'Fast', slow: 'Slow', slowest: 'Slowest' };
    const flag = (cc) => String.fromCodePoint(...cc.split('').map((c) => 127397 + c.charCodeAt(0)));

    // Keep the tunnel line about 2.5px thick whatever size the map is drawn at.
    const sizeLine = () => {
      const w = canvas.clientWidth || 360;
      tunnel.style.strokeWidth = String((2.5 * 360) / w);
    };
    sizeLine();
    window.addEventListener('resize', sizeLine, { passive: true });

    const mark = (i) => {
      pins.forEach((p) => p.classList.toggle('is-active', p.dataset.i === i));
      rows.forEach((r) => {
        const on = r.dataset.i === i;
        r.classList.toggle('is-active', on);
        r.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    };
    const connect = (pin) => {
      mark(pin.dataset.i);
      map.classList.add('is-connected');
      map.dataset.tier = pin.dataset.tier;
      const x = Number(pin.dataset.x);
      const y = Number(pin.dataset.y);
      const cx = (yx + x) / 2;
      const cy = Math.max(3, Math.min(yy, y) - Math.max(12, Math.abs(x - yx) * 0.18));
      sizeLine();
      tunnel.setAttribute('d', `M${yx} ${yy} Q${cx} ${cy} ${x} ${y}`);
      tunnel.classList.remove('is-drawn');
      void tunnel.getBoundingClientRect();
      tunnel.classList.add('is-drawn');
      state.textContent = 'Protected';
      detail.textContent = '';
      const strong = document.createElement('b');
      strong.textContent = `${flag(pin.dataset.cc)} ${pin.dataset.city}`;
      const t = document.createElement('span');
      t.className = `sqrl-tier-text sqrl-tier-text--${pin.dataset.tier}`;
      t.textContent = tierName[pin.dataset.tier];
      detail.append(strong, ` · ${pin.dataset.ms} ms · `, t);
      offBtn.hidden = false;
    };
    const disconnect = () => {
      mark(null);
      map.classList.remove('is-connected');
      delete map.dataset.tier;
      tunnel.classList.remove('is-drawn');
      tunnel.setAttribute('d', '');
      state.textContent = 'Not connected';
      detail.textContent = idleText;
      offBtn.hidden = true;
    };
    const pinFor = (el) => pins.find((p) => p.dataset.i === el.dataset.i);
    pins.forEach((p) => p.addEventListener('click', () => connect(p)));
    rows.forEach((r) => {
      r.addEventListener('click', () => connect(pinFor(r)));
      // pointing at a city in the list lights up its pin on the map
      const hover = (on) => () => pinFor(r).classList.toggle('is-hover', on);
      r.addEventListener('pointerenter', hover(true));
      r.addEventListener('pointerleave', hover(false));
      r.addEventListener('focus', hover(true));
      r.addEventListener('blur', hover(false));
    });
    fastestBtn.addEventListener('click', () => {
      connect(pins.reduce((a, b) => (Number(b.dataset.ms) < Number(a.dataset.ms) ? b : a)));
    });
    offBtn.addEventListener('click', () => { disconnect(); fastestBtn.focus(); });
  });

  // ---------- Tech page: architecture boxes open their tab ----------
  $$('.sqrl-arch__node[data-tab]').forEach((node) => {
    node.addEventListener('click', () => {
      const want = node.dataset.tab.toLowerCase();
      const tab = $$('.td-content .nav-tabs .nav-link').find((b) => b.textContent.trim().toLowerCase().startsWith(want));
      if (!tab) return;
      tab.click();
      tab.closest('.nav-tabs').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    });
  });

  // ---------- Keyboard: ← → move between pages, / jumps to search ----------
  document.addEventListener('keydown', (e) => {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    const t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    // Tabs, menus and the map use the arrow keys themselves.
    if (t && t.closest && t.closest('[role="tab"], [role="tablist"], [role="menu"], .dropdown-menu, .popover, [data-sqrl-map]')) return;
    if (e.shiftKey && e.key !== '/') return;
    if (e.key === '/') {
      const s = $$('.td-search__input').find((i) => i.offsetParent !== null);
      if (s) { e.preventDefault(); s.focus(); }
    } else if (e.key === 'ArrowLeft') {
      const p = $('[data-sqrl-prev]');
      if (p) window.location.href = p.href;
    } else if (e.key === 'ArrowRight') {
      const n = $('[data-sqrl-next]');
      if (n) window.location.href = n.href;
    }
  });
})();
