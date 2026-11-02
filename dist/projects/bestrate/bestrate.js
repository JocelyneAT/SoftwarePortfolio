(() => {
  'use strict';
  const root = document.documentElement;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scrolling and staggered entrances, as on the homepage.
  const lenis = !calm && window.Lenis ? new Lenis({ lerp: .085 }) : null;
  const nav = document.querySelector('#nav');
  let lastY = scrollY;
  const tick = time => {
    lenis?.raf(time);
    const y = scrollY;
    if (Math.abs(y - lastY) > 2) nav.classList.toggle('is-hidden', y > lastY && y > 160);
    lastY = y;
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
  if (!calm) {
    root.classList.add('motion');
    document.querySelectorAll('section').forEach(section => section.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--delay', `${Math.min(i * .07, .5)}s`)));
  }
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-in'); reveal.unobserve(entry.target);

  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-reveal], .bars').forEach(el => reveal.observe(el));

  // Walkthrough: each step shows a real screen, glides the finger to what gets tapped, then moves to the next screen.
  // Tap points are in the screens' own 870 × 1887 pixels.
  const steps = [
    { img: 'login', title: 'Sign in, quick and familiar', text: 'Log in with email, or continue with Google, Facebook or Apple.', tap: [445, 1123] },
    { img: 'home-app', title: 'Compare providers in one place', text: 'Pick the currencies and amount. The best deal sits at the top.', tap: [434, 1252] },
    { img: 'details-app', title: 'See the real cost', text: 'Check the rate trend and full fee breakdown before you exchange.', tap: [427, 1796] },
    { img: 'alerts-app', title: 'Set a target, then step away', text: 'Get notified when the market hits your target rate.', tap: [679, 1796] },
    { img: 'profile-app', title: 'Stay in control', text: 'Manage your account and connected platforms in one place.', tap: [160, 1796] },
  ];
  const STEP = 3300;
  const demo = document.querySelector('.demo');
  const screen = demo.querySelector('.k-phone-screen');
  const current = screen.querySelector('.k-screen-current'), next = screen.querySelector('.k-screen-next');
  const finger = screen.querySelector('.finger'), tap = screen.querySelector('.tap');
  const text = demo.querySelector('.demo-text');
  const title = demo.querySelector('.demo-step-title'), body = demo.querySelector('.demo-step-text');
  const pause = demo.querySelector('.demo-pause');
  const list = demo.querySelector('.demo-steps');
  steps.forEach(s => { const img = new Image(); img.src = `screens/${s.img}.webp`; });
  const dots = steps.map((s, i) => {
    const li = document.createElement('li'), button = document.createElement('button');
    button.type = 'button'; button.setAttribute('aria-label', `Step ${i + 1}: ${s.title}`);
    button.addEventListener('click', () => { go(i, false); if (!paused) schedule(); });
    li.append(button); list.append(li); return button;
  });
  demo.style.setProperty('--step', `${STEP}ms`);
  let index = 0, timers = [], paused = calm, visible = false;

  const place = ([x, y]) => {
    const w = screen.clientWidth, h = screen.clientHeight;
    screen.style.setProperty('--fx', `${(x / 870 * w).toFixed(1)}px`);
    screen.style.setProperty('--fy', `${(y / 1887 * h).toFixed(1)}px`);
  };
  function show(i) {
    const s = steps[i];
    text.classList.add('is-changing');
    setTimeout(() => {
      title.textContent = s.title; body.textContent = s.text;
      text.classList.remove('is-changing');
    }, 250);
    dots.forEach((d, n) => { d.toggleAttribute('aria-current', n === i); if (n === i) d.setAttribute('aria-current', 'step'); d.classList.toggle('is-done', n < i); });
  }
  // Move to step i, fading the new page in over the old one.
  function go(i, animate = true) {
    index = i;
    const src = `screens/${steps[i].img}.webp`;
    show(i);
    if (!animate || calm) { current.src = src; return; }
    next.src = src;
    const fade = () => {
      screen.classList.add('is-fading');
      setTimeout(() => {
        if (index !== i) return;
        current.src = src;
        current.decode().catch(() => {}).then(() => screen.classList.remove('is-fading'));
      }, 620);
    };
    next.decode().then(fade, fade);
  }
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function schedule() {
    clear();
    if (paused || !visible) return;
    const s = steps[index], [x, y] = s.tap;
    // The pointer appears a short way from its target, so it never crosses the whole screen.
    timers.push(setTimeout(() => {
      finger.classList.add('no-glide');
      place([Math.min(800, x + 90), y > 1400 ? y - 170 : y + 170]);
      void finger.offsetWidth;
      finger.classList.remove('no-glide');
      screen.classList.add('is-live');
    }, 500));
    timers.push(setTimeout(() => place(s.tap), 700));
    timers.push(setTimeout(() => { finger.classList.add('is-pressing'); tap.classList.remove('is-on'); void tap.offsetWidth; tap.classList.add('is-on'); }, 2150));
    timers.push(setTimeout(() => finger.classList.remove('is-pressing'), 2450));
    timers.push(setTimeout(() => screen.classList.remove('is-live'), 2950));
    timers.push(setTimeout(() => { go(index + 1 < steps.length ? index + 1 : 1); schedule(); }, STEP));
  }
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-pressed', String(paused));
    screen.classList.toggle('is-live', !paused);
    paused ? clear() : schedule();
  });
  if (calm) { pause.hidden = true; screen.classList.remove('is-live'); }
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? schedule() : clear(); }, { threshold: .35 }).observe(demo);
  show(0); place([435, 1450]);
})();

