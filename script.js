(() => {
  'use strict';
  const root = document.documentElement;
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const hero = document.querySelector('.hero');
  const marquee = document.querySelector('.marquee-track');
  const nav = document.querySelector('#nav');

  // Smooth scrolling, skipped for people who ask for less motion.
  const lenis = !calm && window.Lenis ? new Lenis({ lerp: .085 }) : null;
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: target === hero ? 0 : -60, duration: 1.4 }); else target.scrollIntoView();
    if (link.classList.contains('skip')) target.focus();
  }));

  // Education and experience: the entry at the middle of the screen sets the year, dates and progress beside it.
  const journey = document.querySelector('.journey');
  const line = journey.querySelector('.journey-line'), stops = [...journey.querySelectorAll('.stop')];
  const digits = [0, 1, 2, 3].map(() => {
    const digit = document.createElement('span');
    digit.className = 'journey-digit';
    digit.innerHTML = `<i>${'0123456789'.replace(/\d/g, n => `<u>${n}</u>`)}</i>`;
    journey.querySelector('.journey-year').append(digit);
    return digit;
  });
  journey.querySelector('.journey-of').textContent = `/ ${String(stops.length).padStart(2, '0')}`;
  if (!calm) journey.classList.add('is-live');
  let centres = [], onStop = -1, journeyVisible = false;
  const measureJourney = () => {
    centres = stops.map(stop => stop.offsetTop + stop.offsetHeight / 2);
    line.style.setProperty('--rail-top', `${centres[0]}px`);
    line.style.setProperty('--rail-h', `${centres.at(-1) - centres[0]}px`);
  };
  const showStop = i => {
    onStop = i;
    stops.forEach((stop, n) => stop.classList.toggle('is-on', n === i));
    [...stops[i].dataset.year].forEach((n, d) => digits[d].style.setProperty('--d', n));
    journey.querySelector('.journey-when').textContent = stops[i].querySelector('.stop-date span').textContent;
    journey.querySelector('.journey-count').textContent = String(i + 1).padStart(2, '0');
  };
  const updateJourney = () => {
    const first = centres[0], last = centres.at(-1);
    const dot = Math.min(last, Math.max(first, innerHeight / 2 - line.getBoundingClientRect().top));
    const progress = (dot - first) / (last - first);
    line.style.setProperty('--dot', `${dot.toFixed(1)}px`);
    line.style.setProperty('--tail', progress.toFixed(4));
    journey.style.setProperty('--p', progress.toFixed(4));
    const nearest = centres.reduce((best, c, i) => Math.abs(c - dot) < Math.abs(centres[best] - dot) ? i : best, 0);
    if (nearest !== onStop) showStop(nearest);
  };
  measureJourney(); updateJourney();
  addEventListener('resize', () => { measureJourney(); updateJourney(); });
  document.fonts?.ready.then(() => { measureJourney(); updateJourney(); });
  new IntersectionObserver(([entry]) => { journeyVisible = entry.isIntersecting; }).observe(journey);

  // One loop drives the scroll-linked bits: menu, hero parallax, and marquee speed.
  let lastY = scrollY, mx = 0;
  function frame(time) {
    lenis?.raf(time);
    const y = scrollY, velocity = y - lastY;
    if (Math.abs(velocity) > 2) nav.classList.toggle('is-hidden', velocity > 0 && y > 160);
    lastY = y;
    if (journeyVisible) updateJourney();
    if (!calm) {
      hero.style.setProperty('--hs', Math.min(1, y / innerHeight).toFixed(4));
      mx -= .8 + Math.min(14, Math.abs(velocity) * .35);
      if (-mx >= marquee.scrollWidth / 2) mx += marquee.scrollWidth / 2;
      marquee.style.transform = `translate3d(${mx.toFixed(1)}px,0,0)`;
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  // Entrances: content stays visible without script; with it, each group rises in on a short stagger, once.
  if (!calm) {
    root.classList.add('motion');
    document.querySelectorAll('section').forEach(section => section.querySelectorAll('[data-reveal]').forEach((el, i) => el.style.setProperty('--delay', `${Math.min(i * .06, .6)}s`)));
    const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-in'); reveal.unobserve(entry.target); }
    }), { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));
    document.querySelectorAll('.chips li').forEach((el, i) => el.style.setProperty('--i', i));
    requestAnimationFrame(() => requestAnimationFrame(() => root.classList.add('is-ready')));
  }

  // The menu marks the section on screen.
  const links = [...document.querySelectorAll('.nav nav a')];
  const watch = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) links.forEach(link => link.setAttribute('aria-current', String(link.hash === `#${entry.target.id}`)));
  }), { rootMargin: '-45% 0px -50% 0px' });
  document.querySelectorAll('section[id]').forEach(section => watch.observe(section));

  // Desktop details: the glow and chips drift toward the cursor; buttons lean in.
  if (fine && !calm) {
    hero.addEventListener('pointermove', event => {
      hero.style.setProperty('--gx', `${(event.clientX / innerWidth - .5) * 80}px`);
      hero.style.setProperty('--gy', `${(event.clientY / innerHeight - .5) * 60}px`);
    });
    const principles = document.querySelector('.principles');
    const chips = [...principles.querySelectorAll('.chips li')];
    principles.addEventListener('pointermove', event => chips.forEach((chip, i) => {
      const depth = 10 + (i % 3) * 8;
      chip.style.setProperty('--px', `${(event.clientX / innerWidth - .5) * -depth}px`);
      chip.style.setProperty('--py', `${(event.clientY / innerHeight - .5) * -depth}px`);
    }));
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const box = button.getBoundingClientRect();
        button.style.transform = `translate(${(event.clientX - box.left - box.width / 2) * .3}px, ${(event.clientY - box.top - box.height / 2) * .4}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  // Gift box: opens while it sits in the middle of the screen and packs up again once scrolled past (either way).
  const gift = document.querySelector('.gift');
  if (calm) gift.classList.add('is-open');
  else {
    const box = gift.querySelector('.box'), tools = [...gift.querySelectorAll('.tool')];
    // Every tool remembers how far it sits from the box (layout offsets ignore transforms), so it can start inside it.
    const cloud = gift.querySelector('.tool-cloud');
    const pack = () => {
      const cx = box.offsetLeft + box.offsetWidth / 2, cy = box.offsetTop + box.offsetHeight * .6;
      tools.forEach(tool => {
        tool.style.setProperty('--fx', `${(cx - cloud.offsetLeft - tool.offsetLeft - tool.offsetWidth / 2).toFixed(0)}px`);
        tool.style.setProperty('--fy', `${(cy - cloud.offsetTop - tool.offsetTop - tool.offsetHeight / 2).toFixed(0)}px`);
      });
    };
    pack(); addEventListener('resize', pack);
    new IntersectionObserver(([entry]) => gift.classList.toggle('is-open', entry.isIntersecting), { rootMargin: '-25% 0px -25% 0px' }).observe(gift);
  }

  // Resume: opens in a dialog as a plain page image; the image loads on first open.
  const resume = document.querySelector('#resume');
  const paper = resume.querySelector('.resume-paper img');
  document.querySelector('[data-resume]').addEventListener('click', () => {
    if (!paper.src) paper.src = paper.dataset.src;
    resume.showModal(); lenis?.stop();
  });
  resume.querySelector('[data-close]').addEventListener('click', () => resume.close());
  resume.addEventListener('click', event => { if (event.target === resume) resume.close(); });
  resume.addEventListener('close', () => lenis?.start());

  // Native dialogs provide focus trapping, Escape, and focus restoration.
  const contactDialog = document.querySelector('#contact-dialog');
  const contactForm = document.querySelector('#contact-form');
  document.querySelectorAll('[data-contact]').forEach(button => button.addEventListener('click', () => {
    contactDialog.showModal(); lenis?.stop();
  }));
  contactDialog.querySelector('.contact-close').addEventListener('click', () => contactDialog.close());
  contactDialog.addEventListener('click', event => { if (event.target === contactDialog && (event.clientX < contactDialog.getBoundingClientRect().left || event.clientX > contactDialog.getBoundingClientRect().right || event.clientY < contactDialog.getBoundingClientRect().top || event.clientY > contactDialog.getBoundingClientRect().bottom)) contactDialog.close(); });
  contactDialog.addEventListener('close', () => lenis?.start());
  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const status = contactForm.querySelector('.form-status');
    const submit = contactForm.querySelector('[type="submit"]');
    const payload = Object.fromEntries(new FormData(contactForm));
    if (payload._honey) return;
    if (![payload.name, payload.email, payload.message].every(value => value.trim())) {
      status.textContent = 'Please fill in your name, email, and message.';
      status.dataset.error = 'true';
      return;
    }
    submit.disabled = true;
    submit.textContent = 'Sending…';
    status.textContent = '';
    status.dataset.error = 'false';
    try {
      // shortcut: FormSubmit needs inbox activation once per site; use a dedicated backend if delivery guarantees are needed.
      const response = await fetch(contactForm.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload), signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        status.dataset.error = 'true';
        status.textContent = /activat/i.test(result.message || '')
          ? 'Email delivery is awaiting activation by Jocelyne. Please use the email link below for now.'
          : 'Your message could not be sent. Please try again or email me below.';
        return;
      }
      status.textContent = 'Thank you! Your message has been sent. I’ll get back to you by email.';
      contactForm.reset();
    } catch {
      status.dataset.error = 'true';
      status.textContent = 'Delivery could not be confirmed. Your message is still here; please try again or email me below.';
    } finally {
      submit.disabled = false;
      submit.innerHTML = 'Send message <span aria-hidden="true">↗</span>';
    }
  });

  // Achievements: the list picks which certificate is showing.
  const awards = [...document.querySelectorAll('.award')], awardRows = [...document.querySelectorAll('.awards-list button')];
  const showAward = picked => {
    awards.forEach((award, i) => award.classList.toggle('is-on', i === picked));
    awardRows.forEach((row, i) => row.setAttribute('aria-pressed', String(i === picked)));
  };
  awardRows.forEach((row, i) => {
    row.addEventListener('click', () => showAward(i));
    if (fine) row.addEventListener('pointerenter', () => showAward(i));
  });
  showAward(0);
  // Featured projects: each card plays the same motion as its case study, while it's on screen.
  // Tap points are in each screen's own pixels.
  const fp = 'projects/fivepawns/screens/app/';
  const cardMotions = {
    kitchin: [{ dir: 'projects/kitchin/screens/', ext: 'png', w: 412, h: 917, steps: [['home', 253, 145], ['recipes', 215, 770], ['ingredients', 34, 33], ['charity-fridge', 212, 771], ['charity-foodbank', 299, 150], ['charity-orphanage', 210, 789]] }],
    bestrate: [{ dir: 'projects/bestrate/screens/', ext: 'webp', w: 870, h: 1887, steps: [['login', 445, 1123], ['home-app', 434, 1252], ['details-app', 427, 1796], ['alerts-app', 679, 1796], ['profile-app', 160, 1796]] }],
    codu: [{ dir: 'projects/codu/screens/', ext: 'webp', w: 870, h: 1887, steps: [['home-app', 242, 790], ['path', 145, 1192], ['complete', 429, 1248], ['badge', 433, 1253], ['matched'], ['battle', 169, 1492], ['ranks', 769, 1800], ['profile', 120, 1805], ['home-app', 609, 215], ['chatbot', 90, 78]] }],
    fivepawns: [
      { dir: fp, ext: 'webp', w: 1440, h: 900, steps: [['d-home', 325, 464], ['d-book', 299, 164], ['d-home', 570, 464], ['d-score', 219, 91], ['d-home', 1027, 29], ['d-fb', 911, 280]] },
      { dir: fp, ext: 'webp', w: 390, h: 844, steps: [['home', 111, 545], ['time0', 77, 141], ['home', 291, 545], ['score0', 77, 79], ['home', 219, 27], ['fb0', 354, 469]] },
    ],
  };
  const cardPause = document.querySelector('.show-pause');
  let cardsStopped = calm;
  const cards = [...document.querySelectorAll('[data-motion]')].map((panel, order) => {
    const screens = [...panel.querySelectorAll('.sm-screen')].map((el, n) => {
      const motion = cardMotions[panel.dataset.motion][n];
      const next = document.createElement('img'); next.className = 'sm-next'; next.alt = '';
      const finger = document.createElement('span'); finger.className = 'sm-finger';
      el.append(next, finger);
      return { el, next, finger, motion, current: el.querySelector('.sm-current') };
    });
    let at = 0, timers = [], seen = false, loaded = false;
    // The screens are cropped from the top to fill the frame, so the pointer follows the same scale.
    const place = (s, x, y) => {
      const W = s.el.clientWidth, H = s.el.clientHeight, scale = Math.max(W / s.motion.w, H / s.motion.h);
      s.el.style.setProperty('--fx', `${(x * scale + (W - s.motion.w * scale) / 2).toFixed(1)}px`);
      s.el.style.setProperty('--fy', `${(y * scale).toFixed(1)}px`);
    };
    const srcOf = (s, i) => `${s.motion.dir}${s.motion.steps[i][0]}.${s.motion.ext}`;
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));
    const advance = () => {
      at = (at + 1) % screens[0].motion.steps.length;
      const was = at;
      screens.forEach(s => {
        const src = srcOf(s, at);
        s.next.src = src;
        const fade = () => {
          s.el.classList.add('is-fading');
          setTimeout(() => {
            if (was !== at) return;
            s.current.src = src;
            s.current.decode().catch(() => {}).then(() => s.el.classList.remove('is-fading'));
          }, 620);
        };
        s.next.decode().then(fade, fade);
      });
      play();
    };
    function play(delay = 0) {
      timers.forEach(clearTimeout); timers = [];
      if (cardsStopped || !seen) return;
      screens.forEach(s => {
        const [, x, y] = s.motion.steps[at];
        if (x === undefined) return;
        later(() => {
          s.finger.classList.add('no-glide');
          place(s, Math.min(s.motion.w * .9, x + s.motion.w * .1), y > s.motion.h * .75 ? y - s.motion.h * .09 : y + s.motion.h * .09);
          void s.finger.offsetWidth;
          s.finger.classList.remove('no-glide');
          s.el.classList.add('is-live');
        }, delay + 500);
        later(() => place(s, x, y), delay + 700);
        later(() => s.finger.classList.add('is-pressing'), delay + 2150);
        later(() => s.finger.classList.remove('is-pressing'), delay + 2450);
        later(() => s.el.classList.remove('is-live'), delay + 2950);
      });
      later(advance, delay + 3300);
    }
    if (!calm) new IntersectionObserver(([entry]) => {
      seen = entry.isIntersecting;
      if (seen && !loaded) {
        loaded = true;
        screens.forEach(s => s.motion.steps.forEach((_, i) => { new Image().src = srcOf(s, i); }));
      }
      play(seen ? order * 400 : 0);
    }, { threshold: .3 }).observe(panel);
    return { play, screens };
  });
  if (calm) cardPause.hidden = true;
  cardPause.addEventListener('click', () => {
    cardsStopped = !cardsStopped;
    cardPause.textContent = cardsStopped ? 'Play' : 'Pause';
    cardPause.setAttribute('aria-pressed', String(cardsStopped));
    cards.forEach(card => {
      card.screens.forEach(s => s.el.classList.remove('is-live'));
      card.play();
    });
  });
})();
