(() => {
  'use strict';
  const hero = document.querySelector('.hero');
  const canvas = hero.querySelector('.hero-water');
  const context = canvas.getContext('2d');
  const toggle = hero.querySelector('.hero-ripple');
  if (!context) { toggle.hidden = true; return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, frame = 0, last = 0;
  let width = 0, height = 0;
  const ripples = [];
  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = width * ratio; canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }
  function draw(now) {
    frame = 0;
    context.clearRect(0, 0, width, height);
    for (let i = ripples.length - 1; i >= 0; i--) {
      const ripple = ripples[i], age = (now - ripple.time) / 1800;
      if (age >= 1) { ripples.splice(i, 1); continue; }
      for (let ring = 0; ring < 3; ring++) {
        const radius = 12 + age * 230 - ring * 24;
        if (radius <= 0) continue;
        context.beginPath();
        context.ellipse(ripple.x, ripple.y, radius, radius * .55, -.15, 0, Math.PI * 2);
        context.strokeStyle = `rgba(174, 82, 108, ${(1 - age) * .13})`;
        context.lineWidth = 1.5;
        context.stroke();
      }
    }
    if (ripples.length && !paused && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  function ripple(x, y) {
    if (paused || !visible) return;
    ripples.push({ x, y, time: performance.now() });
    if (ripples.length > 12) ripples.shift();
    if (!frame) frame = requestAnimationFrame(draw);
  }
  function stop() {
    cancelAnimationFrame(frame); frame = 0; ripples.length = 0;
    context.clearRect(0, 0, width, height);
  }
  function sync() {
    toggle.textContent = paused ? 'Play ripples' : 'Pause ripples';
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) stop();
  }
  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || performance.now() - last < 140) return;
    last = performance.now();
    const box = hero.getBoundingClientRect();
    ripple(event.clientX - box.left, event.clientY - box.top);
  }, { passive: true });
  hero.addEventListener('pointerdown', event => {
    if (event.target.closest('a, button')) return;
    const box = hero.getBoundingClientRect();
    ripple(event.clientX - box.left, event.clientY - box.top);
  }, { passive: true });
  toggle.addEventListener('click', () => {
    paused = !paused; sync();
    if (!paused) ripple(width * .75, height * .55);
  });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) stop(); }).observe(hero);
  new ResizeObserver(resize).observe(hero);
  resize(); sync();
})();
