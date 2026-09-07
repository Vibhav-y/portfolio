'use client'

import { useEffect, useRef } from 'react'

const vertex = `attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}`

/* A slowly-breathing terrain rendered as survey contours. The height field is a
   domain-warped fBm; the cursor adds a gaussian peak to it, so the isolines
   genuinely bunch into rings around the pointer instead of just sliding about.
   Every fifth line is an index contour — thicker and brighter — which is what
   makes it read as a surveyed map rather than a pattern. */
const fragment = `#extension GL_OES_standard_derivatives : enable
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec2 pointer;    // aspect-corrected, origin at centre
uniform float grip;      // 0 when the cursor has left, eases to 1 on approach

// Same tokens as the site. The map is neutral grey everywhere and chromatic
// only along the index contours — chroma, not temperature, is what separates
// the every-fifth lines from the rest.
const vec3 PANEL   = vec3(.063,.067,.082);  // --portfolio-panel
const vec3 TROUGH  = vec3(.043,.047,.059);  // low ground, a shade deeper
const vec3 SLATE   = vec3(.267,.286,.325);  // moonlit rock — low contours
const vec3 GLACIER = vec3(.698,.733,.780);  // snow-light — high contours
const vec3 ICE     = vec3(.616,.725,.863);  // --portfolio-accent, snow-lit peak

float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  f=f*f*(3.-2.*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
}

const mat2 TURN = mat2(.80,.60,-.60,.80);

float fbm4(vec2 p){
  float v=0., a=.5;
  for(int i=0;i<4;i++){ v+=a*noise(p); p=TURN*p*2.03; a*=.5; }
  return v;
}
float fbm2(vec2 p){
  float v=0., a=.5;
  for(int i=0;i<2;i++){ v+=a*noise(p); p=TURN*p*2.11; a*=.5; }
  return v;
}

void main(){
  vec2 uv=(gl_FragCoord.xy-.5*resolution)/resolution.y;
  float t=time*.045;

  // Ridged, warped terrain. The warp is what stops it looking like plain noise.
  vec2 q=uv*1.55+vec2(t*.35,-t*.22);
  vec2 warp=vec2(fbm2(q*.75+t), fbm2(q*.75+vec2(5.2,1.3)-t));
  float h=fbm4(q+.85*warp);

  // The cursor lifts the ground under it — contours crowd on the flanks.
  float d=length(uv-pointer);
  float peak=exp(-d*d*13.0);
  h+=grip*.19*peak;

  // ── isolines ─────────────────────────────────────────────────────────────
  float LEVELS=30.0;
  float e=h*LEVELS;
  float lv=floor(e+.5);
  float di=abs(e-lv);
#ifdef GL_OES_standard_derivatives
  float aa=max(fwidth(e),.0008);
#else
  float aa=.055*LEVELS/resolution.y*220.;
#endif
  float minor=1.-smoothstep(.55*aa,1.55*aa,di);
  float major=1.-smoothstep(1.15*aa,2.45*aa,di);
  float isIndex=1.-min(1.,abs(mod(lv,5.)));
  float lines=mix(minor*.34,major*.92,isIndex);

  // A wide, very slow sweep of light — the map is being surveyed, not lit.
  float sweep=.72+.28*sin((uv.x*.9+uv.y*.45)*1.6-time*.16);
  lines*=sweep;

  // Keep the copy column quiet; let the terrain build toward the portrait.
  float x=gl_FragCoord.x/resolution.x;
  lines*=mix(.20,1.,smoothstep(.16,.60,x));
  lines*=smoothstep(-.02,.16,gl_FragCoord.y/resolution.y);

  // Lines brighten where the cursor is, so the map answers the hand.
  float halo=peak*grip;
  lines*=1.+halo*1.15;

  // ── compose ──────────────────────────────────────────────────────────────
  float elev=smoothstep(.25,.85,h);
  vec3 col=mix(TROUGH,PANEL,elev);
  col+=ICE*halo*.045;

  vec3 lineCol=mix(SLATE,GLACIER,smoothstep(.28,.82,h));
  lineCol=mix(lineCol,ICE,isIndex*.62);
  col=mix(col,lineCol,clamp(lines,0.,1.));

  // Edges settle back into the panel so the canvas has no visible seam.
  float vig=smoothstep(1.05,.42,length(uv*vec2(.72,1.)));
  col=mix(PANEL,col,.30+.70*vig);

  float grain=hash(gl_FragCoord.xy+fract(time)*13.7);
  col+=(grain-.5)*.014;

  gl_FragColor=vec4(col,1.);
}`

export default function HeroAtmosphere() {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) return
    gl.getExtension('OES_standard_derivatives')
    const shaders = []
    function compile(type, source) {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source); gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null }
      shaders.push(shader); return shader
    }
    const vs = compile(gl.VERTEX_SHADER, vertex), fs = compile(gl.FRAGMENT_SHADER, fragment)
    if (!vs || !fs) { shaders.forEach(s => gl.deleteShader(s)); return }
    const program = gl.createProgram()
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { gl.deleteProgram(program); shaders.forEach(s => gl.deleteShader(s)); return }
    gl.useProgram(program)
    const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW)
    const position = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(position); gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0)
    const res = gl.getUniformLocation(program,'resolution'), clock = gl.getUniformLocation(program,'time')
    const mouse = gl.getUniformLocation(program,'pointer'), hold = gl.getUniformLocation(program,'grip')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf=0, visible=true, last=0, elapsed=0
    // Target vs eased pair — the peak trails the cursor, which is what makes the
    // terrain feel like it has weight rather than being pinned to the pointer.
    let tx=0, ty=0, tg=0, px=0, py=0, grip=0
    function render() { gl.uniform2f(res,canvas.width,canvas.height); gl.uniform1f(clock,elapsed); gl.uniform2f(mouse,px,py); gl.uniform1f(hold,grip); gl.drawArrays(gl.TRIANGLES,0,3) }
    function tick(now) {
      const dt=Math.min((now-last)/1000,.05); last=now; elapsed+=dt
      const k=1-Math.pow(.0016,dt)
      px+=(tx-px)*k; py+=(ty-py)*k; grip+=(tg-grip)*(1-Math.pow(.02,dt))
      render(); raf=requestAnimationFrame(tick)
    }
    function sync(){ cancelAnimationFrame(raf); if(visible&&!document.hidden&&!reduced.matches){last=performance.now();raf=requestAnimationFrame(tick)}else render() }
    const resize=new ResizeObserver(()=>{const box=canvas.getBoundingClientRect();const dpr=Math.min(window.devicePixelRatio,1.5);canvas.width=Math.max(1,Math.round(box.width*dpr));canvas.height=Math.max(1,Math.round(box.height*dpr));gl.viewport(0,0,canvas.width,canvas.height);render()});resize.observe(canvas)
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync()});observer.observe(canvas)
    const parent=canvas.parentElement
    function move(event){
      if(reduced.matches)return
      const box=parent.getBoundingClientRect()
      tx=(event.clientX-box.left-box.width*.5)/box.height
      ty=(box.height*.5-(event.clientY-box.top))/box.height
      tg=1
    }
    function leave(){ tg=0 }
    parent.addEventListener('pointermove',move,{passive:true})
    parent.addEventListener('pointerleave',leave,{passive:true})
    document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);sync()
    return()=>{cancelAnimationFrame(raf);resize.disconnect();observer.disconnect();parent.removeEventListener('pointermove',move);parent.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',sync);reduced.removeEventListener('change',sync);gl.deleteBuffer(buffer);gl.deleteProgram(program);shaders.forEach(s=>gl.deleteShader(s))}
  }, [])
  return <canvas ref={ref} aria-hidden="true" style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}/>
}
