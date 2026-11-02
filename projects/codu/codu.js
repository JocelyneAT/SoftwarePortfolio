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
    { img: 'home-app', title: 'Start with a language', text: 'Pick Python, C++, JavaScript or Java and carry on where you left off.', tap: [242, 790] },
    { img: 'path', title: 'Follow the path', text: 'Short lessons unlock one level at a time.', tap: [145, 1192] },
    { img: 'complete', title: 'Earn your stars', text: 'Finish a level to collect stars and keep your streak going.', tap: [429, 1248] },
    { img: 'badge', title: 'Collect rewards', text: 'Reach a milestone and unlock a new badge.', tap: [433, 1253] },
    { img: 'matched', title: 'Find a rival', text: 'Matchmaking pairs you with a player on similar trophies.' },
    { img: 'battle', title: 'Duel in real time', text: 'Solve the same code question and race for points.', tap: [169, 1492] },
    { img: 'ranks', title: 'Climb the leaderboard', text: 'Wins earn trophies that count on global and friends rankings.', tap: [769, 1800] },
    { img: 'profile', title: 'Track your progress', text: 'See your streak, trophies and badges in one place.', tap: [120, 1805] },
    { img: 'home-app', title: 'Ask for help any time', text: 'Tap the mascot on the home screen to open the chatbot.', tap: [609, 215] },
    { img: 'chatbot', title: 'Get answers fast', text: 'Type a question, or pick a common one with a single tap.', tap: [90, 78] },
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
    const s = steps[index];
    // Match Found starts by itself, so nothing gets tapped on it.
    if (!s.tap) { timers.push(setTimeout(() => { go(index + 1); schedule(); }, STEP)); return; }
    const [x, y] = s.tap;
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
  show(0); place([435, 1450]);

  // Mini walkthroughs. Tap points are in the images' own 440 x 892 pixels; a step without one just rests.
  const flows = {
    signin: [
      { img: 'login', cap: 'Create an account', tap: [300, 252] },
      { img: 'register', cap: 'Fill in your details', tap: [220, 680] },
      { img: 'verify', cap: 'Verify your email', tap: [220, 732] },
      { img: 'character', cap: 'Pick your character', tap: [154, 332] },
      { img: 'home', cap: 'Ready to learn' },
    ],
    friends: [
      { img: 'profile', cap: 'See your profile', tap: [220, 404] },
      { img: 'friend-list', cap: 'Check your friend list', tap: [361, 223] },
      { img: 'add-friend', cap: 'Add someone new', tap: [128, 504] },
    ],
  };
  document.querySelectorAll('.mini-box').forEach(box => {
    const walk = box.querySelector('.mini-walk'), flow = flows[walk.dataset.flow];
    const shown = walk.querySelector('.mw-current'), incoming = walk.querySelector('.mw-next');
    const hand = walk.querySelector('.finger'), ripple = walk.querySelector('.tap');
    const caption = box.querySelector('.mw-caption'), toggle = box.querySelector('.mw-pause');
    let at = 0, later = [], stopped = calm, inView = false;
    flow.forEach(s => { new Image().src = `ui/${s.img}.webp`; });
    const point = ([x, y]) => {
      walk.style.setProperty('--fx', `${(x / 440 * walk.clientWidth).toFixed(1)}px`);
      walk.style.setProperty('--fy', `${(y / 892 * walk.clientHeight).toFixed(1)}px`);
    };
    const advance = () => {
      at = (at + 1) % flow.length;
      const src = `ui/${flow[at].img}.webp`, was = at;
      caption.textContent = flow[at].cap;
      incoming.src = src;
      const fade = () => {
        walk.classList.add('is-fading');
        setTimeout(() => {
          if (was !== at) return;
          shown.src = src;
          shown.decode().catch(() => {}).then(() => walk.classList.remove('is-fading'));
        }, 620);
      };
      incoming.decode().then(fade, fade);
      play();
    };
    function play() {
      later.forEach(clearTimeout); later = [];
      if (stopped || !inView) return;
      const s = flow[at];
      if (!s.tap) { later.push(setTimeout(advance, 2400)); return; }
      const [x, y] = s.tap;
      later.push(setTimeout(() => {
        hand.classList.add('no-glide');
        point([Math.min(400, x + 50), y > 700 ? y - 90 : y + 90]);
        void hand.offsetWidth;
        hand.classList.remove('no-glide');
        walk.classList.add('is-live');
      }, 500));
      later.push(setTimeout(() => point(s.tap), 700));
      later.push(setTimeout(() => { hand.classList.add('is-pressing'); ripple.classList.remove('is-on'); void ripple.offsetWidth; ripple.classList.add('is-on'); }, 2150));
      later.push(setTimeout(() => hand.classList.remove('is-pressing'), 2450));
      later.push(setTimeout(() => walk.classList.remove('is-live'), 2950));
      later.push(setTimeout(advance, 3300));
    }
    toggle.addEventListener('click', () => {
      stopped = !stopped;
      toggle.textContent = stopped ? 'Play' : 'Pause';
      toggle.setAttribute('aria-pressed', String(stopped));
      walk.classList.remove('is-live');
      play();
    });
    if (calm) toggle.hidden = true;
    new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; play(); }, { threshold: .35 }).observe(walk);
  });
})();
