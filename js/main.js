/* ============================================================
   YANZ — portfolio interactions
   ============================================================ */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- LOADER ---------- */
  const loader = document.getElementById('loader');
  const bar = document.getElementById('loaderBar');
  const pct = document.getElementById('loaderPct');
  let p = 0;
  const tick = setInterval(() => {
    p = Math.min(100, p + Math.random() * 18 + 6);
    bar.style.width = p + '%';
    pct.textContent = Math.floor(p);
    if (p >= 100) {
      clearInterval(tick);
      setTimeout(() => {
        loader.classList.add('done');
        document.body.classList.add('loaded');
        startTyping();
      }, 320);
    }
  }, 160);

  /* ---------- THEME ---------- */
  const root = document.documentElement;
  root.dataset.theme = 'dark'; /* neon-first: gelap sebagai default */
  document.getElementById('themeToggle').addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  });

  /* ---------- HEADER / NAV ---------- */
  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const progress = document.getElementById('progress');

  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.classList.remove('open');
  }));

  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 40);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- ACTIVE NAV LINK ---------- */
  const sections = [...document.querySelectorAll('main section[id]')];
  const links = [...nav.querySelectorAll('a')];
  const navObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navObs.observe(s));

  /* ---------- REVEAL ON SCROLL ---------- */
  const revealObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      e.target.style.transitionDelay = Math.min(i * 90, 360) + 'ms';
      e.target.classList.add('in');
      obs.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* ---------- COUNTERS ---------- */
  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const suffix = el.dataset.suffix || '';
      const dur = 1500;
      const t0 = performance.now();
      const step = now => {
        const k = Math.min(1, (now - t0) / dur);
        const eased = 1 - Math.pow(1 - k, 3);
        el.textContent = Math.round(target * eased) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      obs.unobserve(el);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll('.num').forEach(el => countObs.observe(el));

  /* ---------- TYPING ---------- */
  const phrases = [
    'Fullstack Developer — Insyaallah',
    'Jasa Website & Landing Page',
    'Jual File & Source Code',
    '5 Project APK, Semua Lancar'
  ];
  function startTyping() {
    const out = document.getElementById('typed');
    if (!out) return;
    if (reduce) { out.textContent = phrases[0]; return; }
    let pi = 0, ci = 0, del = false;
    (function loop() {
      const cur = phrases[pi];
      out.textContent = cur.slice(0, ci);
      if (!del && ci < cur.length) { ci++; setTimeout(loop, 55); }
      else if (!del) { del = true; setTimeout(loop, 1700); }
      else if (ci > 0) { ci--; setTimeout(loop, 26); }
      else { del = false; pi = (pi + 1) % phrases.length; setTimeout(loop, 320); }
    })();
  }

  /* ---------- CURSOR GLOW ---------- */
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(pointer: fine)').matches && !reduce) {
    let gx = window.innerWidth / 2, gy = window.innerHeight / 2, tx = gx, ty = gy;
    document.body.classList.add('has-cursor');
    window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; });
    (function follow() {
      gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
      glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      requestAnimationFrame(follow);
    })();
  }

  /* ---------- TILT ---------- */
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
        const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- FOOTER YEAR ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* =========================================================
     VIRUS PARTICLE BACKGROUND (procedural canvas)
     ========================================================= */
  const cv = document.getElementById('virusCanvas');
  const ctx = cv.getContext('2d');
  let W = 0, H = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let virus = [], motes = [], scrollY = 0;

  const NEON = [126, 255, 128];
  const MAG = [255, 90, 210];

  function resize() {
    W = cv.width = Math.floor(window.innerWidth * dpr);
    H = cv.height = Math.floor(window.innerHeight * dpr);
    cv.style.width = window.innerWidth + 'px';
    cv.style.height = window.innerHeight + 'px';
    build();
  }

  function build() {
    const area = (window.innerWidth * window.innerHeight) / 1000000;
    const nV = Math.max(6, Math.min(14, Math.round(area * 7)));
    const nM = Math.max(30, Math.min(110, Math.round(area * 70)));
    virus = Array.from({ length: nV }, () => spawnVirus());
    motes = Array.from({ length: nM }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: (Math.random() * 1.6 + 0.5) * dpr,
      vx: (Math.random() - 0.5) * 0.16 * dpr,
      vy: (Math.random() - 0.5) * 0.16 * dpr,
      a: Math.random() * 0.5 + 0.15,
      ph: Math.random() * Math.PI * 2
    }));
  }

  function spawnVirus() {
    const r = (Math.random() * 26 + 14) * dpr;
    return {
      x: Math.random() * W, y: Math.random() * H, r,
      vx: (Math.random() - 0.5) * 0.28 * dpr,
      vy: (Math.random() - 0.5) * 0.28 * dpr,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.006,
      spikes: Math.floor(Math.random() * 5) + 9,
      pulse: Math.random() * Math.PI * 2,
      mag: Math.random() < 0.28,
      depth: Math.random() * 0.7 + 0.3
    };
  }

  function drawVirus(v, t) {
    const pulse = 1 + Math.sin(t * 0.0016 + v.pulse) * 0.07;
    const r = v.r * pulse;
    const c = v.mag ? MAG : NEON;
    const rgb = `${c[0]},${c[1]},${c[2]}`;
    const alpha = 0.12 + v.depth * 0.22;

    ctx.save();
    ctx.translate(v.x, v.y + scrollY * 0.06 * v.depth);
    ctx.rotate(v.rot);

    // halo
    const g = ctx.createRadialGradient(0, 0, r * 0.2, 0, 0, r * 2.6);
    g.addColorStop(0, `rgba(${rgb},${alpha * 0.5})`);
    g.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(0, 0, r * 2.6, 0, Math.PI * 2); ctx.fill();

    ctx.lineWidth = 1.15 * dpr;
    ctx.strokeStyle = `rgba(${rgb},${alpha + 0.2})`;

    // capsid
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = `rgba(${rgb},${alpha * 0.12})`;
    ctx.fill();

    // inner ring
    ctx.beginPath(); ctx.arc(0, 0, r * 0.58, 0, Math.PI * 2);
    ctx.setLineDash([3 * dpr, 5 * dpr]); ctx.stroke(); ctx.setLineDash([]);

    // spikes
    for (let i = 0; i < v.spikes; i++) {
      const a = (i / v.spikes) * Math.PI * 2;
      const x1 = Math.cos(a) * r, y1 = Math.sin(a) * r;
      const len = r * (0.34 + Math.sin(t * 0.002 + i + v.pulse) * 0.05);
      const x2 = Math.cos(a) * (r + len), y2 = Math.sin(a) * (r + len);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.beginPath(); ctx.arc(x2, y2, 2.2 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${alpha + 0.32})`; ctx.fill();
    }

    // nucleus dots
    for (let i = 0; i < 4; i++) {
      const a = v.rot * 2 + i * 1.7;
      const rr = r * 0.3;
      ctx.beginPath();
      ctx.arc(Math.cos(a) * rr, Math.sin(a) * rr, 1.8 * dpr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb},${alpha + 0.25})`; ctx.fill();
    }
    ctx.restore();
  }

  function frame(t) {
    ctx.clearRect(0, 0, W, H);

    // linked motes
    for (const m of motes) {
      m.x += m.vx; m.y += m.vy;
      if (m.x < 0) m.x = W; if (m.x > W) m.x = 0;
      if (m.y < 0) m.y = H; if (m.y > H) m.y = 0;
      const tw = 0.55 + Math.sin(t * 0.002 + m.ph) * 0.45;
      ctx.beginPath();
      ctx.arc(m.x, m.y + scrollY * 0.03, m.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(126,255,128,${m.a * tw})`;
      ctx.fill();
    }
    const LINK = 120 * dpr;
    for (let i = 0; i < motes.length; i++) {
      for (let j = i + 1; j < motes.length; j++) {
        const dx = motes[i].x - motes[j].x, dy = motes[i].y - motes[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const o = (1 - Math.sqrt(d2) / LINK) * 0.13;
          ctx.beginPath();
          ctx.moveTo(motes[i].x, motes[i].y + scrollY * 0.03);
          ctx.lineTo(motes[j].x, motes[j].y + scrollY * 0.03);
          ctx.strokeStyle = `rgba(126,255,128,${o})`;
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();
        }
      }
    }

    // virus bodies
    for (const v of virus) {
      v.x += v.vx; v.y += v.vy; v.rot += v.vr;
      const pad = v.r * 3;
      if (v.x < -pad) v.x = W + pad; if (v.x > W + pad) v.x = -pad;
      if (v.y < -pad) v.y = H + pad; if (v.y > H + pad) v.y = -pad;
      drawVirus(v, t);
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', () => { dpr = Math.min(window.devicePixelRatio || 1, 2); resize(); });
  window.addEventListener('scroll', () => { scrollY = window.scrollY * -1 * 0.12; }, { passive: true });
  resize();
  if (!reduce) requestAnimationFrame(frame);
  else { /* single static frame */ frameOnce(); }
  function frameOnce() { ctx.clearRect(0, 0, W, H); virus.forEach(v => drawVirus(v, 0)); }
})();
