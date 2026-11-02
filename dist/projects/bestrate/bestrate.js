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

})();

