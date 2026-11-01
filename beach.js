(() => {
  'use strict';
  const beach = document.querySelector('.beach');
  if (!beach) return;
  const art = document.querySelector('#beachArt');
  const canvas = document.querySelector('#beachWater');
  const tracks = document.querySelector('#beachTracks');
  const dog = document.querySelector('#beachDog');
  const sprite = dog.firstElementChild;
  const ball = document.querySelector('#beachBall');
  const pause = document.querySelector('#beachPause');
  const fetchButton = document.querySelector('#beachFetch');
  const status = document.querySelector('#beachStatus');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const ink = tracks.getContext('2d');
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const ripples = new Float32Array(32).fill(-100);
  let w = 1, h = 1, cover = 1, imageLeft = 0, imageTop = 0;
  let clock = 0, last = 0, request = 0, visible = true, paused = motion.matches;
  let gl = null, program, uniforms, imageReady = false, rippleIndex = 0, lastRipple = -1;
  let pointer = null, target = null, home = null, nextWander = 3, stepDistance = 0;
  let x = 0, y = 0, angle = 0, gait = 0, state = 'wandering';
  const prints = [];
  const dogMargin = () => Math.max(42, dog.clientWidth * .5 + 8);

  // The shore follows the generated artwork; cover coordinates keep the dog on sand at every width.
  const shoreline = v => .76 - .22 * v + .08 * Math.sin(Math.PI * v);
  function sandMin(py) {
    const v = clamp((py - imageTop) / (1024 * cover), 0, 1);
    return clamp(imageLeft + shoreline(v) * 1536 * cover + 28, w * .32, w - dogMargin());
  }
  function onSand(px, py) { return px >= sandMin(py) - 20; }
  function sandPoint(px, py) {
    const sy = clamp(py, h * .23, h * .83);
    return { x: clamp(px, sandMin(sy), w - dogMargin()), y: sy };
  }
  function wanderPoint() { return sandPoint(w * (.68 + Math.random() * .23), h * (.30 + Math.random() * .47)); }
  function resize() {
    const beforeW = w, beforeH = h;
    w = beach.clientWidth; h = beach.clientHeight;
    cover = Math.max(w / 1536, h / 1024);
    imageLeft = (w - 1536 * cover) * .58; imageTop = (h - 1024 * cover) * .5;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    tracks.width = Math.round(w * dpr); tracks.height = Math.round(h * dpr);
    ink?.setTransform(dpr, 0, 0, dpr, 0, 0);
    const position = sandPoint(beforeW > 1 ? x / beforeW * w : w * .82, beforeH > 1 ? y / beforeH * h : h * .60);
    x = position.x; y = position.y; home = { ...position };
    target = null; pointer = null; state = 'wandering'; ball.hidden = true; prints.length = 0;
    paintDog(); drawWater();
  }
  function initWater() {
    try {
      gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' });
      if (!gl) return;
      const shader = (type, source) => {
        const item = gl.createShader(type); gl.shaderSource(item, source); gl.compileShader(item);
        if (!gl.getShaderParameter(item, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(item));
        return item;
      };
      program = gl.createProgram();
      gl.attachShader(program, shader(gl.VERTEX_SHADER, 'attribute vec2 p; varying vec2 uv; void main(){uv=vec2((p.x+1.)*.5,(1.-p.y)*.5);gl_Position=vec4(p,0.,1.);}'));
      gl.attachShader(program, shader(gl.FRAGMENT_SHADER, `
        precision mediump float;
        varying vec2 uv;
        uniform sampler2D art;
        uniform vec2 resolution, imageSize, imageOffset;
        uniform float time;
        uniform vec4 rings[8];
        void main() {
          vec2 source = (uv * resolution - imageOffset) / imageSize;
          float shore = .76 - .22 * source.y + .08 * sin(3.14159 * source.y);
          float water = 1. - smoothstep(shore - .04, shore, source.x);
          vec2 offset = vec2(sin(source.y*39.+time*.6), cos(source.x*31.+time*.7)) * .0012;
          float light = 0.;
          for(int i=0;i<8;i++) {
            float age=time-rings[i].z;
            vec2 delta=(uv-rings[i].xy)*vec2(resolution.x/resolution.y,1.);
            float distance=length(delta);
            float wave=sin((distance-age*.12)*105.)*exp(-abs(distance-age*.12)*32.);
            float strength=step(0.,age)*(1.-smoothstep(0.,2.8,age));
            offset+=normalize(delta+vec2(.0001))*wave*strength*.004;
            light+=wave*strength*.07;
          }
          vec3 color=texture2D(art,clamp(source+offset*water,0.,1.)).rgb;
          float shimmer=sin(source.x*52.+source.y*39.+time*.6)*sin(source.y*68.-source.x*23.-time*.45);
          color+=vec3(.7,.95,1.)*(light+shimmer*.012)*water;
          gl_FragColor=vec4(color,1.);
        }`));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
      gl.useProgram(program);
      const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]), gl.STATIC_DRAW);
      const p = gl.getAttribLocation(program, 'p'); gl.enableVertexAttribArray(p); gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0);
      uniforms = Object.fromEntries(['art','resolution','imageSize','imageOffset','time','rings[0]'].map(name => [name,gl.getUniformLocation(program,name)]));
      const texture = gl.createTexture(); gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, art);
      gl.uniform1i(uniforms.art, 0); imageReady = true;
      drawWater();
    } catch (error) {
      console.warn('Beach water uses the still artwork:', error.message);
      gl = null; canvas.style.visibility = 'hidden';
    }
  }
  function drawWater() {
    if (!gl || !imageReady) return;
    gl.viewport(0,0,canvas.width,canvas.height);
    gl.uniform2f(uniforms.resolution,w,h);
    gl.uniform2f(uniforms.imageSize,1536*cover,1024*cover);
    gl.uniform2f(uniforms.imageOffset,imageLeft,imageTop);
    gl.uniform1f(uniforms.time,clock);
    gl.uniform4fv(uniforms['rings[0]'],ripples);
    gl.drawArrays(gl.TRIANGLES,0,6);
  }
  function ripple(px, py) {
    if (paused || clock-lastRipple < .085 || onSand(px,py)) return;
    ripples.set([px/w,py/h,clock,1],rippleIndex*4);
    rippleIndex=(rippleIndex+1)%8; lastRipple=clock;
  }
  function paintDog() {
    dog.style.left=`${x}px`; dog.style.top=`${y}px`;
    dog.style.transform=`translate(-50%, -50%) rotate(${angle}rad)`;
    sprite.style.backgroundPosition=`${(Math.floor(gait)%4)*100/3}% center`;
    dog.dataset.state=state;
    dog.dataset.x=x.toFixed(1); dog.dataset.y=y.toFixed(1);
    if (state==='returning') {
      const reach=dog.clientWidth*.35;
      ball.style.left=`${x+Math.cos(angle)*reach}px`; ball.style.top=`${y+Math.sin(angle)*reach}px`;
    }
  }
  function paintTracks() {
    if (!ink) return;
    ink.clearRect(0,0,w,h);
    while(prints.length && clock-prints[0].time>7) prints.shift();
    for(const mark of prints) {
      ink.save(); ink.translate(mark.x,mark.y); ink.rotate(mark.angle);
      ink.fillStyle=`rgba(101,83,57,${.22*(1-(clock-mark.time)/7)})`;
      ink.beginPath(); ink.ellipse(0,0,3,2.3,0,0,Math.PI*2); ink.fill();
      for(const toe of [-2.6,0,2.6]) { ink.beginPath(); ink.arc(4,toe,1.1,0,Math.PI*2); ink.fill(); }
      ink.restore();
    }
    // A 2D ring fallback keeps pointer feedback available without WebGL.
    if(!gl) for(let i=0;i<8;i++) {
      const age=clock-ripples[i*4+2];
      if(age<0||age>2.8) continue;
      ink.strokeStyle=`rgba(233,255,250,${.26*(1-age/2.8)})`; ink.lineWidth=1.3;
      ink.beginPath(); ink.ellipse(ripples[i*4]*w,ripples[i*4+1]*h,age*h*.12,age*h*.10,0,0,Math.PI*2); ink.stroke();
    }
  }
  function throwBall(point) {
    home=sandPoint(x,y); target=sandPoint(point.x,point.y); state='fetching';
    ball.hidden=false; ball.style.left=`${target.x}px`; ball.style.top=`${target.y}px`;
    status.textContent='Ball thrown. Your poodle is fetching it.';
    if(paused) { x=target.x; y=target.y; state='resting'; ball.hidden=true; status.textContent='Your poodle found the ball. Motion is paused.'; }
    paintDog();
  }
  function advance(dt) {
    if(state!=='fetching' && state!=='returning') {
      if(pointer && clock-pointer.time<1.4 && onSand(pointer.x,pointer.y)) { target=sandPoint(pointer.x,pointer.y); state='following'; }
      else if(clock>nextWander) { target=wanderPoint(); state='wandering'; nextWander=clock+4+Math.random()*3; }
    }
    if(!target) return;
    const dx=target.x-x,dy=target.y-y,distance=Math.hypot(dx,dy);
    if(distance<8) {
      if(state==='fetching') { state='returning'; target={...home}; }
      else if(state==='returning') { state='resting'; target=null; ball.hidden=true; nextWander=clock+3; status.textContent='Ball returned. Ready for another throw!'; }
      else { target=null; state='resting'; }
      return;
    }
    const speed=state==='fetching'||state==='returning'?155:52;
    const step=Math.min(distance,speed*dt),desired=Math.atan2(dy,dx);
    angle+=Math.atan2(Math.sin(desired-angle),Math.cos(desired-angle))*Math.min(1,dt*9);
    x+=dx/distance*step; y+=dy/distance*step; gait+=step*.11; stepDistance+=step;
    if(stepDistance>22) {
      stepDistance=0;
      const side=Math.floor(gait)%2?1:-1;
      prints.push({x:x-Math.sin(angle)*side*8,y:y+Math.cos(angle)*side*8,angle,time:clock});
      if(prints.length>50) prints.shift();
    }
  }
  function frame(time) {
    request=0;
    if(!visible||document.hidden||paused) return;
    if(time-last>=1000/30) {
      const dt=Math.min(.05,(time-last)/1000); last=time; clock+=dt;
      advance(dt); paintDog(); paintTracks(); drawWater();
    }
    request=requestAnimationFrame(frame);
  }
  function start() { if(!request&&!paused&&visible&&!document.hidden) { last=performance.now(); request=requestAnimationFrame(frame); } }
  function syncPause() {
    cancelAnimationFrame(request); request=0;
    pause.setAttribute('aria-pressed',String(paused)); pause.textContent=paused?'Resume motion':'Pause motion';
    if(!paused) start();
  }
  beach.addEventListener('pointermove',event=>{
    if(event.pointerType==='touch') return;
    const rect=beach.getBoundingClientRect(); pointer={x:event.clientX-rect.left,y:event.clientY-rect.top,time:clock};
    ripple(pointer.x,pointer.y);
  },{passive:true});
  beach.addEventListener('pointerleave',()=>{pointer=null;});
  beach.addEventListener('click',event=>{
    if(event.target.closest('a,button')) return;
    const rect=beach.getBoundingClientRect(),px=event.clientX-rect.left,py=event.clientY-rect.top;
    if(onSand(px,py)) throwBall({x:px,y:py}); else ripple(px,py);
  });
  fetchButton.addEventListener('click',()=>throwBall(wanderPoint()));
  pause.addEventListener('click',()=>{paused=!paused;syncPause();});
  motion.addEventListener('change',event=>{paused=event.matches;syncPause();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(request);request=0;}else start();});
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();gl=null;canvas.style.visibility='hidden';});
  new ResizeObserver(resize).observe(beach);
  new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    document.body.classList.toggle('beach-at-top',entries[0].intersectionRatio>.35);
    if(visible)start();else{cancelAnimationFrame(request);request=0;}
  },{threshold:[0,.35]}).observe(beach);
  resize(); syncPause();
  if(art.complete&&art.naturalWidth)initWater();else art.addEventListener('load',initWater,{once:true});
})();
