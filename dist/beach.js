(() => {
  'use strict';
  const beach = document.querySelector('.beach');
  if (!beach) return;
  const canvas = document.querySelector('#beachWater');
  const flat = document.querySelector('#beachFlat');
  const pause = document.querySelector('#beachPause');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  // The sea floor (sand, light, fish) is painted here, then refracted by the wave field in WebGL.
  const under = document.createElement('canvas'), paint = under.getContext('2d');
  const floor = document.createElement('canvas');
  const flatInk = flat.getContext('2d');
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const turnToward = (to, from) => Math.atan2(Math.sin(to - from), Math.cos(to - from));
  const CELL = 7, STEP = 1 / 50, ENCODE = 260;
  let w = 1, h = 1, cols = 3, rows = 3, now = new Float32Array(9), old = new Float32Array(9), wavePixels = new Uint8Array(36);
  let clock = 0, last = 0, pending = 0, nextDrop = 1, request = 0, visible = true, paused = motion.matches, pointer = null;
  let gl = null, uniforms;
  const fish = [['#f39a83', .2, .3, 30], ['#f7c96f', .72, .62, 24], ['#fbe9cf', .45, .78, 20], ['#f39a83', .86, .2, 18], ['#f7c96f', .3, .58, 22]]
    .map(([color, fx, fy, size], i) => ({ color, fx, fy, size, x: 0, y: 0, angle: i * 1.3, speed: 26 + i * 4, phase: i * 2.1, rush: 0 }));
  const floats = [...document.querySelectorAll('.beach-float')].map((el, i) => ({ el, phase: i * 1.7, x: 0, y: 0, vx: 0, vy: 0, rotation: 0, spin: 0, nextRing: 1 + (i * .37) % 3 }));

  function resize() {
    w = Math.max(1, beach.clientWidth); h = Math.max(1, beach.clientHeight);
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    for (const item of [canvas, flat]) { item.width = Math.round(w * dpr); item.height = Math.round(h * dpr); }
    flatInk.setTransform(dpr, 0, 0, dpr, 0, 0);
    under.width = floor.width = Math.ceil(w * .5); under.height = floor.height = Math.ceil(h * .5);
    cols = Math.ceil(w / CELL) + 2; rows = Math.ceil(h / CELL) + 2;
    now = new Float32Array(cols * rows); old = new Float32Array(cols * rows);
    wavePixels = new Uint8Array(cols * rows * 4).fill(128);
    fish.forEach(f => { f.x = f.fx * w; f.y = f.fy * h; });
    floats.forEach(item => { item.x = item.y = item.vx = item.vy = item.rotation = item.spin = 0; });
    paintFloor(); moveFloats(0); render();
  }

  // A wavy shoreline hugging one corner; sx/sy flip it to the opposite corner.
  function shore(g, sx, sy, reach, fill, wobble) {
    g.beginPath(); g.moveTo(sx ? w : 0, sy ? h : 0);
    for (let a = 0; a <= 1.0001; a += .02) {
      const r = reach * (1 + Math.sin(a * 17 + wobble) * .05 + Math.sin(a * 6 + wobble * 2) * .07);
      const x = Math.cos(a * Math.PI / 2) * r * 1.45, y = Math.sin(a * Math.PI / 2) * r;
      g.lineTo(sx ? w - x : x, sy ? h - y : y);
    }
    g.closePath(); g.fillStyle = fill; g.fill();
  }

  function paintFloor() {
    const g = floor.getContext('2d'), r = Math.min(w, h), blob = (x, y, rx, ry, color) => { g.fillStyle = color; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); g.fill(); };
    g.setTransform(floor.width / w, 0, 0, floor.height / h, 0, 0);
    const deep = g.createRadialGradient(w * .5, h * .45, 0, w * .5, h * .45, Math.hypot(w, h) * .62);
    deep.addColorStop(0, '#2f8c8c'); deep.addColorStop(.55, '#2a8186'); deep.addColorStop(1, '#1f6a70');
    g.fillStyle = deep; g.fillRect(0, 0, w, h);
    g.filter = `blur(${r * .07}px)`;
    blob(w * .25, h * .72, r * .4, r * .16, 'rgb(122 214 203 / .16)');
    blob(w * .78, h * .3, r * .4, r * .16, 'rgb(122 214 203 / .14)');
    // A deeper pool behind the headline, like light falling off in the middle of the pond.
    blob(w * .5, h * .46, w * .3, h * .22, 'rgb(9 48 54 / .42)');
    g.filter = `blur(${r * .006}px)`;
    for (const [sx, sy] of [[0, 0], [1, 1]]) {
      shore(g, sx, sy, r * .48, 'rgb(120 206 196 / .45)', sx * 3);
      shore(g, sx, sy, r * .36, 'rgb(255 246 230 / .9)', sx * 3 + .4);
      shore(g, sx, sy, r * .33, '#f2d1a4', sx * 3 + .8);
      shore(g, sx, sy, r * .2, '#f6dcb4', sx * 3 + 1.4);
    }
    g.filter = 'none';
  }

  function swim(dt) {
    for (const f of fish) {
      let turn = Math.sin(clock * .25 + f.phase) * .45;
      if (pointer) {
        const dx = f.x - pointer.x, dy = f.y - pointer.y, distance = Math.hypot(dx, dy);
        if (distance < 170) { turn += turnToward(Math.atan2(dy, dx), f.angle) * 3 * (1 - distance / 170); f.rush = 1; }
      }
      f.angle += turn * dt; f.rush = Math.max(0, f.rush - dt * .6);
      const speed = f.speed * (1 + f.rush * 2.5), margin = f.size * 2;
      f.x += Math.cos(f.angle) * speed * dt; f.y += Math.sin(f.angle) * speed * dt;
      if (f.x < -margin) f.x = w + margin; else if (f.x > w + margin) f.x = -margin;
      if (f.y < -margin) f.y = h + margin; else if (f.y > h + margin) f.y = -margin;
    }
  }

  function drawFish(f, color, lift) {
    const s = f.size, wag = Math.sin(clock * (5 + f.rush * 8) + f.phase) * .4;
    paint.save(); paint.translate(f.x + lift * s * .5, f.y + lift * s * .8); paint.rotate(f.angle); paint.fillStyle = color;
    paint.beginPath(); paint.ellipse(0, 0, s, s * .36, 0, 0, Math.PI * 2); paint.fill();
    paint.beginPath(); paint.ellipse(s * .1, 0, s * .28, s * .6, wag * .4, 0, Math.PI * 2); paint.fill();
    paint.translate(-s * .85, 0); paint.rotate(wag);
    paint.beginPath(); paint.moveTo(0, 0); paint.quadraticCurveTo(-s * .4, -s * .2, -s * .75, -s * .5); paint.quadraticCurveTo(-s * .5, 0, -s * .75, s * .5); paint.quadraticCurveTo(-s * .4, s * .2, 0, 0); paint.fill();
    paint.restore();
  }

  function paintUnder() {
    paint.setTransform(under.width / w, 0, 0, under.height / h, 0, 0);
    paint.drawImage(floor, 0, 0, w, h);
    paint.filter = 'blur(4px)';
    for (const f of fish) drawFish(f, 'rgb(10 50 55 / .28)', 1);
    paint.filter = 'blur(.8px)'; paint.globalAlpha = .85;
    for (const f of fish) drawFish(f, f.color, 0);
    paint.filter = 'none'; paint.globalAlpha = 1;
  }

  function disturb(x, y, radius, amount) {
    const cx = x / CELL + 1, cy = y / CELL + 1, r = radius / CELL;
    for (let j = Math.max(1, Math.floor(cy - r * 2)); j < Math.min(rows - 1, cy + r * 2); j++)
      for (let i = Math.max(1, Math.floor(cx - r * 2)); i < Math.min(cols - 1, cx + r * 2); i++)
        now[j * cols + i] += amount * Math.exp(-((i - cx) ** 2 + (j - cy) ** 2) / (r * r));
  }

  // A splash also nudges nearby floats straight away, so they drift off before the ring reaches them.
  function splash(x, y, radius, amount, reach) {
    disturb(x, y, radius, amount);
    for (const item of floats) {
      const dx = item.el.offsetLeft + item.x - x, dy = item.el.offsetTop + item.y - y, distance = Math.max(1, Math.hypot(dx, dy));
      if (distance > reach) continue;
      const push = (1 - distance / reach) * 170;
      item.vx += dx / distance * push; item.vy += dy / distance * push; item.spin += (dx > 0 ? 1 : -1) * push * .25;
    }
  }

  function simulate() {
    for (let j = 1; j < rows - 1; j++) for (let i = 1, k = j * cols + 1; i < cols - 1; i++, k++)
      old[k] = ((now[k - 1] + now[k + 1] + now[k - cols] + now[k + cols]) * .5 - old[k]) * .982;
    [now, old] = [old, now];
  }

  function slopeAt(x, y) {
    const i = clamp(Math.round(x / CELL) + 1, 3, cols - 4), k = clamp(Math.round(y / CELL) + 1, 3, rows - 4) * cols + i;
    return [(now[k + 3] - now[k - 3]) / 6, (now[k + 3 * cols] - now[k - 3 * cols]) / 6];
  }

  function moveFloats(dt) {
    for (const item of floats) {
      const size = item.el.clientWidth, cx = item.el.offsetLeft + item.x, cy = item.el.offsetTop + item.y, [gx, gy] = slopeAt(cx, cy);
      // Each float rocks gently and sheds a faint ring now and then, so it sits in the water rather than on it.
      if (!paused && dt && clock > item.nextRing) { disturb(cx, cy, Math.min(26, size * .16), .07); item.nextRing = clock + 2.6 + Math.random() * 2.4; }
      item.vx += (-gx * 3200 - item.x * 3 - item.vx * 1.8) * dt; item.vy += (-gy * 3200 - item.y * 3 - item.vy * 1.8) * dt;
      item.spin += (-(gx + gy) * 400 - item.rotation * 4 - item.spin * 2.4) * dt;
      item.x = clamp(item.x + item.vx * dt, -45, 45); item.y = clamp(item.y + item.vy * dt, -45, 45);
      item.rotation = clamp(item.rotation + item.spin * dt, -14, 14);
      const bob = paused ? 0 : Math.sin(clock * .8 + item.phase) * 3, yaw = paused ? 0 : Math.sin(clock * .4 + item.phase) * 2.5;
      const dip = paused ? 1 : 1 + Math.sin(clock * .8 + item.phase + 1.2) * .015;
      item.el.style.transform = `translate(-50%, -50%) translate3d(${item.x.toFixed(2)}px,${(item.y + bob).toFixed(2)}px,0) rotate(${(item.rotation + yaw).toFixed(2)}deg) scale(${dip.toFixed(4)})`;
    }
  }

  function initWater() {
    try {
      gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
      if (!gl) throw new Error('WebGL is unavailable');
      const shader = (type, source) => {
        const item = gl.createShader(type); gl.shaderSource(item, source); gl.compileShader(item);
        if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(item));
        return item;
      };
      const program = gl.createProgram();
      gl.attachShader(program, shader(gl.VERTEX_SHADER, 'attribute vec2 p; varying vec2 uv; void main(){uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);gl_Position=vec4(p,0.,1.);}'));
      gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `
        #ifdef GL_FRAGMENT_PRECISION_HIGH
        precision highp float;
        #else
        precision mediump float;
        #endif
        varying vec2 uv;
        uniform sampler2D under, waves;
        uniform vec2 waveScale, waveOffset;
        uniform float time, aspect;
        // Thin, drifting light lines on the sea floor, made by folding a sine field back on itself.
        float caustic(vec2 p, float t) {
          vec2 i = p; float c = 1.;
          for (int n = 0; n < 4; n++) {
            float s = t * (1. - 3.5 / float(n + 1));
            i = p + vec2(cos(s - i.x) + sin(s + i.y), sin(s - i.y) + cos(s + i.x));
            c += 1. / length(vec2(p.x / (sin(i.x + s) / .005), p.y / (cos(i.y + s) / .005)));
          }
          c = 1.17 - pow(c / 4., 1.4);
          return pow(clamp(c, 0., 1.), 8.);
        }
        void main() {
          vec4 wave = texture2D(waves, uv * waveScale + waveOffset);
          vec2 slope = wave.rg - .5;
          vec2 swell = vec2(sin(uv.y * 7. + time * .5) + sin(uv.x * 11. - time * .3), cos(uv.x * 6. + time * .4) + cos(uv.y * 9. - time * .45)) * .0014;
          vec2 bent = uv + slope * .035 + swell;
          vec3 color = texture2D(under, clamp(bent, 0., 1.)).rgb;
          vec2 p = mod(bent * vec2(aspect, 1.) * 4.5, 6.2832) - 250.;
          float light = clamp(caustic(p, time * .3 + 23.), 0., 1.);
          color += vec3(.85, 1., .96) * light * .22;
          float glint = dot(slope, vec2(-.55, -.84));
          color += vec3(.85, 1., .97) * (glint * .28 + pow(max(glint * 3., 0.), 3.) * .05);
          gl_FragColor = vec4(color, 1.);
        }`));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
      const p = gl.getAttribLocation(program, 'p'); gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['under', 'waves', 'waveScale', 'waveOffset', 'time', 'aspect'].map(name => [name, gl.getUniformLocation(program, name)]));
      for (const unit of [0, 1]) {
        gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        for (const [key, value] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]]) gl.texParameteri(gl.TEXTURE_2D, key, value);
      }
      gl.uniform1i(uniforms.under, 0); gl.uniform1i(uniforms.waves, 1);
    } catch (error) {
      console.warn('Beach water uses the flat sea:', error.message);
      gl = null; canvas.hidden = true;
    }
  }

  function render() {
    paintUnder();
    if (!gl) { flatInk.drawImage(under, 0, 0, w, h); return; }
    for (let j = 1; j < rows - 1; j++) for (let i = 1, k = j * cols + 1; i < cols - 1; i++, k++) {
      wavePixels[k * 4] = clamp(128 + (now[k + 1] - now[k - 1]) * ENCODE, 0, 255);
      wavePixels[k * 4 + 1] = clamp(128 + (now[k + cols] - now[k - cols]) * ENCODE, 0, 255);
    }
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.activeTexture(gl.TEXTURE0); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, under);
    gl.activeTexture(gl.TEXTURE1); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, cols, rows, 0, gl.RGBA, gl.UNSIGNED_BYTE, wavePixels);
    gl.uniform2f(uniforms.waveScale, w / CELL / cols, h / CELL / rows);
    gl.uniform2f(uniforms.waveOffset, 1.5 / cols, 1.5 / rows);
    gl.uniform1f(uniforms.time, clock);
    gl.uniform1f(uniforms.aspect, w / h);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function frame(time) {
    request = 0;
    if (!visible || document.hidden || paused) return;
    const dt = Math.min(.05, (time - last) / 1000); last = time; clock += dt;
    pending = Math.min(pending + dt, STEP * 3);
    while (pending >= STEP) { simulate(); pending -= STEP; }
    if (clock > nextDrop) { disturb(Math.random() * w, Math.random() * h, 20, .08); nextDrop = clock + 2 + Math.random() * 3; }
    swim(dt); moveFloats(dt); render();
    request = requestAnimationFrame(frame);
  }
  function start() { if (!request && !paused && visible && !document.hidden) { last = performance.now(); request = requestAnimationFrame(frame); } }
  function syncPause() {
    cancelAnimationFrame(request); request = 0;
    pause.setAttribute('aria-pressed', String(paused)); pause.textContent = paused ? 'Resume motion' : 'Pause motion';
    if (paused) { moveFloats(0); render(); } else start();
  }
  const local = event => { const rect = beach.getBoundingClientRect(); return { x: event.clientX - rect.left, y: event.clientY - rect.top }; };
  beach.addEventListener('pointermove', event => {
    const next = local(event);
    if (pointer && !paused) {
      // Stamp soft drops along the stroke so the wake trails the cursor instead of forming separate rings.
      const dx = next.x - pointer.x, dy = next.y - pointer.y, distance = Math.hypot(dx, dy), stamps = Math.min(24, Math.ceil(distance / 6));
      const amount = Math.min(1, distance / 40) * .035;
      for (let s = 1; s <= stamps; s++) disturb(pointer.x + dx * s / stamps, pointer.y + dy * s / stamps, 12, amount);
    }
    pointer = next;
  }, { passive: true });
  beach.addEventListener('pointerleave', () => { pointer = null; });
  beach.addEventListener('click', event => {
    if (paused || event.target.closest('a,button')) return;
    const { x, y } = local(event); splash(x, y, 18, .55, Math.min(w, h) * .4);
  });
  pause.addEventListener('click', () => { paused = !paused; syncPause(); });
  motion.addEventListener('change', event => { paused = event.matches; syncPause(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) { cancelAnimationFrame(request); request = 0; } else start(); });
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); gl = null; canvas.hidden = true; });
  new ResizeObserver(resize).observe(beach);
  new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    document.body.classList.toggle('beach-at-top', entries[0].intersectionRatio > .35);
    if (visible) start(); else { cancelAnimationFrame(request); request = 0; }
  }, { threshold: [0, .35] }).observe(beach);
  initWater(); resize(); syncPause();
})();
