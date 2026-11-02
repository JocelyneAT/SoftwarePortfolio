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

  // Overview: the website and the phone do the same thing at the same time. Tap points are in each screen's own pixels.
  const overview = [
    { img: 'home', pc: 'd-home', scroll: true, title: 'One site, website and mobile', text: "How to book, the location and today's promo are all on the homepage." },
    { img: 'home', pc: 'd-home', title: 'Book a table', text: 'Reserve a table online from a laptop or a phone.', tap: [111, 545], pcTap: [325, 464] },
    { img: 'time0', pc: 'd-book', title: 'A full booking system', text: 'Choose a time and a table, then pay by QRIS or at the venue.', tap: [77, 141], pcTap: [299, 164] },
    { img: 'home', pc: 'd-home', title: 'Count your points', text: 'A mahjong calculator for use right at the table.', tap: [291, 545], pcTap: [570, 464] },
    { img: 'score0', pc: 'd-score', title: 'Tap the tiles', text: 'Pick the tiles in your hand and get the score.', tap: [77, 79], pcTap: [219, 91] },
    { img: 'home', pc: 'd-home', title: 'Leave feedback', text: 'The feedback button is in the menu on every page.', tap: [219, 27], pcTap: [1027, 29] },
    { img: 'fb0', pc: 'd-fb', title: 'A direct line to the owner', text: 'Rate the visit and send a message straight to the venue.', tap: [354, 469], pcTap: [911, 280] },
  ];
  const STEP = 3300, SCROLL = 4200;
  const srcOf = s => `screens/app/${s.img}.webp`;
  const demo = document.querySelector('.demo');
  const screenOf = (selector, w, h, imgKey, tapKey) => {
    const el = demo.querySelector(`${selector} .ov-screen`);
    return { el, w, h, imgKey, tapKey, current: el.querySelector('.k-screen-current'), next: el.querySelector('.k-screen-next'), tall: el.querySelector('.k-screen-scroll'), finger: el.querySelector('.finger'), tap: el.querySelector('.tap') };
  };
  const screens = [screenOf('.device-pc', 1440, 900, 'pc', 'pcTap'), screenOf('.device-phone', 390, 844, 'img', 'tap')];
  const text = demo.querySelector('.demo-text');
  const title = demo.querySelector('.demo-step-title'), body = demo.querySelector('.demo-step-text');
  const pause = demo.querySelector('.demo-pause');
  overview.forEach(s => screens.forEach(d => { new Image().src = `screens/app/${s[d.imgKey]}.webp`; }));
  const dots = overview.map((s, i) => {
    const li = document.createElement('li'), button = document.createElement('button');
    button.type = 'button'; button.setAttribute('aria-label', `Step ${i + 1}: ${s.title}`);
    button.addEventListener('click', () => { go(i, false); if (!paused) schedule(); });
    li.append(button); demo.querySelector('.demo-steps').append(li);
    return button;
  });
  let index = 0, timers = [], paused = calm, visible = false;

  const place = (d, [x, y]) => {
    d.el.style.setProperty('--fx', `${(x / d.w * d.el.clientWidth).toFixed(1)}px`);
    d.el.style.setProperty('--fy', `${(y / d.h * d.el.clientHeight).toFixed(1)}px`);
  };
  function show(i) {
    const s = overview[i];
    text.classList.add('is-changing');
    setTimeout(() => {
      title.textContent = s.title; body.textContent = s.text;
      text.classList.remove('is-changing');
    }, 250);
    demo.style.setProperty('--step', `${s.scroll ? SCROLL : STEP}ms`);
    dots.forEach((d, n) => {
      if (n === i) d.setAttribute('aria-current', 'step'); else d.removeAttribute('aria-current');
      d.classList.toggle('is-done', n < i);
    });
  }
  // Move to step i, fading the new page in over the old one. The scrolled homepage fades away rather than scrolling back up.
  function go(i, animate = true) {
    index = i;
    show(i);
    screens.forEach(d => {
      const src = `screens/app/${overview[i][d.imgKey]}.webp`;
      d.el.classList.remove('is-scrolling');
      d.tall.style.transition = '';
      setTimeout(() => { if (!d.el.classList.contains('is-scrolling')) { d.tall.style.transition = 'opacity .6s ease-in-out'; d.tall.style.transform = 'none'; } }, 650);
      if (!animate || calm || d.current.getAttribute('src') === src) { d.current.src = src; return; }
      d.next.src = src;
      const fade = () => {
        d.el.classList.add('is-fading');
        setTimeout(() => {
          if (index !== i) return;
          d.current.src = src;
          d.current.decode().catch(() => {}).then(() => d.el.classList.remove('is-fading'));
        }, 620);
      };
      d.next.decode().then(fade, fade);
    });
  }
  function clear() { timers.forEach(clearTimeout); timers = []; }
  function schedule() {
    clear();
    if (paused || !visible) return;
    const s = overview[index], onward = () => { go((index + 1) % overview.length); schedule(); };
    if (s.scroll) {
      screens.forEach(d => {
        d.tall.style.transform = 'none';
        d.el.classList.add('is-scrolling');
        timers.push(setTimeout(() => {
          d.tall.style.transition = 'opacity .6s ease-in-out, transform 3.4s ease-in-out';
          d.tall.style.transform = `translateY(${-Math.max(0, d.tall.offsetHeight - d.el.clientHeight)}px)`;
        }, 300));
      });
      timers.push(setTimeout(onward, SCROLL));
      return;
    }
    screens.forEach(d => {
      const [x, y] = s[d.tapKey];
      // The pointer appears a short way from its target, so it never crosses the whole screen.
      timers.push(setTimeout(() => {
        d.finger.classList.add('no-glide');
        place(d, [Math.min(d.w * .9, x + d.w * .1), y > d.h * .75 ? y - d.h * .09 : y + d.h * .09]);
        void d.finger.offsetWidth;
        d.finger.classList.remove('no-glide');
        d.el.classList.add('is-live');
      }, 500));
      timers.push(setTimeout(() => place(d, s[d.tapKey]), 700));
      timers.push(setTimeout(() => { d.finger.classList.add('is-pressing'); d.tap.classList.remove('is-on'); void d.tap.offsetWidth; d.tap.classList.add('is-on'); }, 2150));
      timers.push(setTimeout(() => d.finger.classList.remove('is-pressing'), 2450));
      timers.push(setTimeout(() => d.el.classList.remove('is-live'), 2950));
    });
    timers.push(setTimeout(onward, STEP));
  }
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-pressed', String(paused));
    if (paused) { clear(); screens.forEach(d => d.el.classList.remove('is-live')); } else schedule();
  });
  if (calm) pause.hidden = true;
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; visible ? schedule() : clear(); }, { threshold: .35 }).observe(demo);
  show(0);

  // Booking and points each get their own walkthrough, as Codu's sign-in does.
  const flows = {
    booking: [
      { img: 'date', cap: 'Pick a date', tap: [195, 800] },
      { img: 'time1', cap: 'Pick your hours', tap: [83, 414] },
      { img: 'time2', cap: 'See your time', tap: [292, 804] },
      { img: 'table1', cap: 'Choose a table', tap: [110, 436] },
      { img: 'table2', cap: 'Check the total', tap: [292, 803] },
      { img: 'confirm', cap: 'Add your details', tap: [295, 804] },
      { img: 'pay1', cap: 'Scan to pay' },
      { img: 'pay2', cap: 'Upload your proof', tap: [296, 618] },
      { img: 'pay3', cap: 'Submit the payment', tap: [299, 804] },
      { img: 'done', cap: 'Payment submitted', tap: [195, 575] },
      { img: 'wa1', cap: 'Message ready to send', tap: [359, 797] },
      { img: 'wa2', cap: 'Sent to FivePawns' },
    ],
    score: [
      { img: 'score0', cap: 'Tap your tiles', tap: [71, 689] },
      { img: 'score1', cap: 'Build the hand', tap: [195, 707] },
      { img: 'score2', cap: 'A full hand: 10 faan, 64 points' },
      { img: 'score3', cap: 'Every scoring item listed' },
    ],
  };
  document.querySelectorAll('.mini-box').forEach(box => {
    const walk = box.querySelector('.mini-walk'), flow = flows[walk.dataset.flow];
    const shown = walk.querySelector('.mw-current'), incoming = walk.querySelector('.mw-next');
    const hand = walk.querySelector('.finger'), ripple = walk.querySelector('.tap');
    const caption = box.querySelector('.mw-caption'), toggle = box.querySelector('.mw-pause');
    let at = 0, later = [], stopped = calm, inView = false;
    flow.forEach(s => { new Image().src = srcOf(s); });
    const point = ([x, y]) => {
      walk.style.setProperty('--fx', `${(x / 390 * walk.clientWidth).toFixed(1)}px`);
      walk.style.setProperty('--fy', `${(y / 844 * walk.clientHeight).toFixed(1)}px`);
    };
    const advance = () => {
      at = (at + 1) % flow.length;
      const src = srcOf(flow[at]), was = at;
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
        point([Math.min(350, x + 40), y > 640 ? y - 76 : y + 76]);
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
