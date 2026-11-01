(() => {
  'use strict';
  const beach = document.querySelector('.beach');
  if (!beach) return;
  const art = document.querySelector('#beachArt');
  const canvas = document.querySelector('#beachWater');
  const tracks = document.querySelector('#beachTracks');
  const pause = document.querySelector('#beachPause');
  const rippleButton = document.querySelector('#beachRipple');
  const status = document.querySelector('#beachStatus');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const ink = tracks.getContext('2d');
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const ripples = new Float32Array(32).fill(-100);
  let w = 1, h = 1, cover = 1, imageLeft = 0, imageTop = 0;
  let clock = 0, last = 0, request = 0, visible = true, paused = motion.matches;
  let gl = null, program, uniforms, imageReady = false, rippleIndex = 0, lastRipple = -1;
  const floats = [...document.querySelectorAll('.beach-float')].map((el,i)=>({el,phase:i*1.7,x:0,y:0,vx:0,vy:0,rotation:0,spin:0}));
  function onWater(px,py) {
    const u=(px-imageLeft)/(1536*cover), v=(py-imageTop)/(1024*cover);
    return u+v>.25 && u+v<1.82;
  }
  function resize() {
    w = beach.clientWidth; h = beach.clientHeight;
    cover = Math.max(w / 1536, h / 1024);
    imageLeft = (w - 1536 * cover) * .5; imageTop = (h - 1024 * cover) * .5;
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    tracks.width = Math.round(w * dpr); tracks.height = Math.round(h * dpr);
    ink?.setTransform(dpr, 0, 0, dpr, 0, 0);
    floats.forEach(item=>{item.x=item.y=item.vx=item.vy=item.rotation=item.spin=0;});
    paintFloats(0); drawWater();
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
          vec3 ground = texture2D(art,clamp(source,0.,1.)).rgb;
          float water = smoothstep(.02,.12,(ground.g+ground.b)*.5-ground.r);
          vec2 offset = vec2(sin(source.y*39.+time*.6), cos(source.x*31.+time*.7)) * .0012;
          float light = 0.;
          for(int i=0;i<8;i++) {
            float age=time-rings[i].z;
            vec2 delta=(uv-rings[i].xy)*vec2(resolution.x/resolution.y,1.);
            float distance=length(delta);
            float wave=sin((distance-age*.12)*105.)*exp(-abs(distance-age*.12)*32.);
            float strength=step(0.,age)*(1.-smoothstep(0.,2.8,age))*rings[i].w;
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
  function ripple(px, py, strong=false) {
    if (paused || (!strong && clock-lastRipple < .085) || !onWater(px,py)) return;
    ripples.set([px/w,py/h,clock,strong?1.3:.6],rippleIndex*4);
    rippleIndex=(rippleIndex+1)%8; lastRipple=clock;
    beach.dataset.ripples=String((Number(beach.dataset.ripples)||0)+1);
    for(const item of floats) {
      const dx=item.el.offsetLeft-px,dy=item.el.offsetTop-py,distance=Math.max(1,Math.hypot(dx,dy));
      const force=(strong?75:6)/(1+distance/(Math.min(w,h)*.65));
      item.vx+=dx/distance*force; item.vy+=dy/distance*force;
      item.spin+=(dx/distance*.6+dy/distance*.4)*force*.35;
    }
  }
  function paintFloats(dt) {
    for(const item of floats) {
      item.vx+=(-item.x*8-item.vx*3.6)*dt; item.vy+=(-item.y*8-item.vy*3.6)*dt;
      item.spin+=(-item.rotation*6-item.spin*3.3)*dt;
      const roomLeft=Math.max(0,item.el.offsetLeft-item.el.clientWidth*.5-4);
      const roomRight=Math.max(0,w-item.el.offsetLeft-item.el.clientWidth*.5-4);
      item.x=clamp(item.x+item.vx*dt,-Math.min(26,roomLeft),Math.min(26,roomRight)); item.y=clamp(item.y+item.vy*dt,-26,26);
      item.rotation=clamp(item.rotation+item.spin*dt,-8,8);
      const bob=paused?0:Math.sin(clock*.8+item.phase)*2.5;
      const yaw=paused?0:Math.sin(clock*.4+item.phase)*1.3;
      item.el.style.transform=`translate(-50%, -50%) translate3d(${item.x.toFixed(2)}px,${(item.y+bob).toFixed(2)}px,0) rotate(${(item.rotation+yaw).toFixed(2)}deg)`;
    }
  }
  function paintTracks() {
    if (!ink) return;
    ink.clearRect(0,0,w,h);
    for(const item of floats) {
      const cx=item.el.offsetLeft+item.x,cy=item.el.offsetTop+item.y+item.el.clientHeight*.33;
      const radius=item.el.clientWidth*.49;
      ink.strokeStyle='rgba(233,240,211,.27)'; ink.lineWidth=1.3;
      ink.beginPath(); ink.ellipse(cx,cy,radius+Math.sin(clock*.8+item.phase)*3,radius*.26,0,.1,Math.PI*.82); ink.stroke();
      ink.beginPath(); ink.ellipse(cx,cy,radius*1.14,radius*.35,0,Math.PI*1.02,Math.PI*1.85); ink.stroke();
    }
    // A 2D ring fallback keeps pointer feedback available without WebGL.
    if(!gl) for(let i=0;i<8;i++) {
      const age=clock-ripples[i*4+2];
      if(age<0||age>2.8) continue;
      ink.strokeStyle=`rgba(233,255,250,${.26*(1-age/2.8)})`; ink.lineWidth=1.3;
      ink.beginPath(); ink.ellipse(ripples[i*4]*w,ripples[i*4+1]*h,age*h*.12,age*h*.10,0,0,Math.PI*2); ink.stroke();
    }
  }
  function frame(time) {
    request=0;
    if(!visible||document.hidden||paused) return;
    if(time-last>=1000/30) {
      const dt=Math.min(.05,(time-last)/1000); last=time; clock+=dt;
      paintFloats(dt); paintTracks(); drawWater();
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
    const rect=beach.getBoundingClientRect();
    ripple(event.clientX-rect.left,event.clientY-rect.top);
  },{passive:true});
  beach.addEventListener('click',event=>{
    if(event.target.closest('a,button')) return;
    const rect=beach.getBoundingClientRect(),px=event.clientX-rect.left,py=event.clientY-rect.top;
    ripple(px,py,true);
  });
  rippleButton.addEventListener('click',()=>{
    if(paused){status.textContent='Motion is paused. Use Resume motion to make ripples.';return;}
    ripple(w*.5,h*.55,true);status.textContent='A little ripple sends the shells and your poodle gently bobbing.';
  });
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
