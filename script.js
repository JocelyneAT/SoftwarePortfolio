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

  // One loop drives the scroll-linked bits: menu, hero parallax, marquee speed, the cursor.
  let lastY = scrollY, mx = 0;
  const cursor = { x: -100, y: -100, tx: -100, ty: -100 };
  function frame(time) {
    lenis?.raf(time);
    const y = scrollY, velocity = y - lastY;
    if (Math.abs(velocity) > 2) nav.classList.toggle('is-hidden', velocity > 0 && y > 160);
    lastY = y;
    if (!calm) {
      hero.style.setProperty('--hs', Math.min(1, y / innerHeight).toFixed(4));
      mx -= .8 + Math.min(14, Math.abs(velocity) * .35);
      if (-mx >= marquee.scrollWidth / 2) mx += marquee.scrollWidth / 2;
      marquee.style.transform = `translate3d(${mx.toFixed(1)}px,0,0)`;
      cursor.x += (cursor.tx - cursor.x) * .18; cursor.y += (cursor.ty - cursor.y) * .18;
      root.style.setProperty('--cx', `${cursor.x.toFixed(1)}px`); root.style.setProperty('--cy', `${cursor.y.toFixed(1)}px`);
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

  // Desktop details: the glow and chips drift toward the cursor, a soft "View" cursor over projects, buttons that lean in.
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
    const dot = document.querySelector('.cursor');
    addEventListener('pointermove', event => { cursor.tx = event.clientX; cursor.ty = event.clientY; root.classList.add('has-cursor'); }, { passive: true });
    document.addEventListener('pointerleave', () => root.classList.remove('has-cursor'));
    document.querySelectorAll('.project').forEach(project => {
      project.addEventListener('pointerenter', () => dot.classList.add('is-big'));
      project.addEventListener('pointerleave', () => dot.classList.remove('is-big'));
    });
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

  // Project filter: cards fade out, the grid updates, the remaining cards fade back in.
  const buttons = [...document.querySelectorAll('.filters button')];
  const projects = [...document.querySelectorAll('.project')];
  buttons.forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.filter;
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    projects.forEach(p => p.classList.add('is-out'));
    setTimeout(() => {
      projects.forEach(p => { p.hidden = kind !== 'all' && p.dataset.kind !== kind; });
      requestAnimationFrame(() => projects.forEach(p => p.classList.remove('is-out')));
    }, calm ? 0 : 250);
  }));
})();
