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
    if (entry.target.matches('.result')) countUp(entry.target.querySelector('.score-value'));
  }), { rootMargin: '0px 0px -10% 0px' });
  document.querySelectorAll('[data-reveal], .bars').forEach(el => reveal.observe(el));

  // The usability score counts up when it appears.
  function countUp(el) {
    const target = Number(el.dataset.target);
    if (calm) return;
    const start = performance.now();
    const step = now => {
      const t = Math.min(1, (now - start) / 1400), eased = 1 - (1 - t) ** 3;
      el.textContent = (target * eased).toFixed(1);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  // Walkthrough: each step shows a real screen, glides the finger to what gets tapped, then moves to the next screen.
  // Tap points are in the screens' own 412 × 917 pixels.
  const steps = [
    { img: 'home', title: 'Everything in one place', text: 'Groceries, the fridge, recipes and charity all start from home.', tap: [253, 145] },
    { img: 'recipes', title: 'Find something to cook', text: 'Browse by cuisine and difficulty, or pick a recommendation.', tap: [215, 770] },
    { img: 'ingredients', title: 'Check what you already have', text: 'See which ingredients are in your fridge and which are missing.', tap: [34, 33], back: true },
    { img: 'charity-fridge', title: 'Spot what’s about to expire', text: 'Sealed items expiring soon are ready to donate.', tap: [212, 771] },
    { img: 'charity-foodbank', title: 'Send it to a food bank', text: 'Choose the closest food bank and how it gets there.', tap: [299, 150] },
    { img: 'charity-orphanage', title: 'Or buy what they need', text: 'Shop an orphanage’s list of needed items.', tap: [210, 789] },
  ];
  const STEP = 3400;
  const demo = document.querySelector('.demo');
  const screen = demo.querySelector('.k-phone-screen');
  const current = screen.querySelector('.k-screen-current'), next = screen.querySelector('.k-screen-next');
  const finger = screen.querySelector('.finger'), tap = screen.querySelector('.tap');
  const text = demo.querySelector('.demo-text');
  const title = demo.querySelector('.demo-step-title'), body = demo.querySelector('.demo-step-text');
  const pause = demo.querySelector('.demo-pause');
  const list = demo.querySelector('.demo-steps');
  steps.forEach(s => { const img = new Image(); img.src = `screens/${s.img}.png`; });
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
    screen.style.setProperty('--fx', `${(x / 412 * w).toFixed(1)}px`);
    screen.style.setProperty('--fy', `${(y / 917 * h).toFixed(1)}px`);
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
  // Move to step i, sliding the screen; `back` slides the other way.
  function go(i, animate = true) {
    const back = animate && steps[index].back;
    index = i;
    const src = `screens/${steps[i].img}.png`;
    if (!animate || calm) { current.src = src; show(i); return; }
    next.src = src;
    screen.classList.toggle('is-back', !!back);
    screen.classList.add('is-sliding');
    show(i);
    setTimeout(() => { current.src = src; screen.classList.remove('is-sliding', 'is-back'); }, 560);
  }
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function schedule() {
    clear();
    if (paused || !visible) return;
    const s = steps[index];
    screen.classList.add('is-live');
    timers.push(setTimeout(() => place(s.tap), 500));
    timers.push(setTimeout(() => { finger.classList.add('is-pressing'); tap.classList.remove('is-on'); void tap.offsetWidth; tap.classList.add('is-on'); }, 2100));
    timers.push(setTimeout(() => finger.classList.remove('is-pressing'), 2300));
    timers.push(setTimeout(() => { go((index + 1) % steps.length); schedule(); }, STEP));
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
  show(0); place([206, 700]);
})();
