(() => {
  'use strict';
  const hero = document.querySelector('.hero');
  const canvas = hero.querySelector('.hero-water');
  const context = canvas.getContext('2d');
  const toggle = hero.querySelector('.hero-ripple');
  if (!context) { toggle.hidden = true; return; }
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = reduced.matches, visible = true, frame = 0, width = 0, height = 0;
  // A soft ribbon of points: the head chases the cursor and every point chases the one before it.
  const trail = Array.from({ length: 26 }, () => ({ x: 0, y: 0 }));
  const blooms = [];
  const layer = document.createElement('canvas'), ink = layer.getContext('2d');
  let target = null;

  function resize() {
    width = hero.clientWidth; height = hero.clientHeight;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    canvas.width = layer.width = width * ratio; canvas.height = layer.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function draw(now) {
    frame = 0;
    context.clearRect(0, 0, width, height);
    let moving = false;
    if (target) {
      trail.forEach((point, i) => {
        const lead = i ? trail[i - 1] : target, pull = i ? .5 : .35;
        point.x += (lead.x - point.x) * pull; point.y += (lead.y - point.y) * pull;
        if (Math.abs(lead.x - point.x) + Math.abs(lead.y - point.y) > .4) moving = true;
      });
      // The ribbon is painted opaque on its own layer, then laid down once with blur and transparency,
      // so overlapping joints never stack into visible dots when the cursor moves fast.
      ink.setTransform(1, 0, 0, 1, 0, 0); ink.clearRect(0, 0, layer.width, layer.height);
      ink.setTransform(context.getTransform());
      ink.lineCap = 'round'; ink.lineJoin = 'round'; ink.strokeStyle = '#e86e92';
      const mid = (a, b) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      for (let i = 1; i < trail.length - 1; i++) {
        const from = mid(trail[i - 1], trail[i]), to = mid(trail[i], trail[i + 1]);
        ink.lineWidth = 4 + (1 - i / trail.length) * 36;
        ink.beginPath(); ink.moveTo(from.x, from.y); ink.quadraticCurveTo(trail[i].x, trail[i].y, to.x, to.y); ink.stroke();
      }
      context.save();
      context.setTransform(1, 0, 0, 1, 0, 0);
      context.filter = 'blur(10px)'; context.globalAlpha = .28;
      context.drawImage(layer, 0, 0);
      context.restore();
      const glow = context.createRadialGradient(trail[0].x, trail[0].y, 0, trail[0].x, trail[0].y, 90);
      glow.addColorStop(0, 'rgba(244, 167, 185, .45)'); glow.addColorStop(1, 'rgba(244, 167, 185, 0)');
      context.fillStyle = glow; context.fillRect(trail[0].x - 90, trail[0].y - 90, 180, 180);
    }
    // A click or tap blooms a soft pink cloud that swells and fades.
    for (let i = blooms.length - 1; i >= 0; i--) {
      const bloom = blooms[i], age = (now - bloom.time) / 1400;
      if (age >= 1) { blooms.splice(i, 1); continue; }
      const eased = 1 - (1 - age) ** 3, radius = 40 + eased * 220;
      const cloud = context.createRadialGradient(bloom.x, bloom.y, 0, bloom.x, bloom.y, radius);
      cloud.addColorStop(0, `rgba(236, 120, 152, ${(.28 * (1 - age)).toFixed(3)})`);
      cloud.addColorStop(.6, `rgba(244, 167, 185, ${(.16 * (1 - age)).toFixed(3)})`);
      cloud.addColorStop(1, 'rgba(244, 167, 185, 0)');
      context.fillStyle = cloud; context.fillRect(bloom.x - radius, bloom.y - radius, radius * 2, radius * 2);
    }
    if ((moving || blooms.length) && !paused && visible && !document.hidden) frame = requestAnimationFrame(draw);
  }
  const wake = () => { if (!frame && !paused && visible) frame = requestAnimationFrame(draw); };
  const local = event => { const box = hero.getBoundingClientRect(); return { x: event.clientX - box.left, y: event.clientY - box.top }; };

  hero.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch' || paused) return;
    const point = local(event);
    if (!target) trail.forEach(p => { p.x = point.x; p.y = point.y; });
    target = point; wake();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { target = null; wake(); });
  hero.addEventListener('pointerdown', event => {
    if (paused || event.target.closest('a, button')) return;
    blooms.push({ ...local(event), time: performance.now() });
    if (blooms.length > 6) blooms.shift();
    wake();
  }, { passive: true });

  function stop() { cancelAnimationFrame(frame); frame = 0; blooms.length = 0; target = null; context.clearRect(0, 0, width, height); }
  function sync() {
    toggle.textContent = paused ? 'Play hover effect' : 'Pause hover effect';
    toggle.setAttribute('aria-pressed', String(paused));
    if (paused) stop();
  }
  toggle.addEventListener('click', () => { paused = !paused; sync(); });
  reduced.addEventListener('change', () => { paused = reduced.matches; sync(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stop(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (!visible) stop(); }).observe(hero);
  new ResizeObserver(resize).observe(hero);
  resize(); sync();
})();
