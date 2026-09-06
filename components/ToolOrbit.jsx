'use client'

import { useEffect, useRef, useState } from 'react'
import s from './ToolOrbit.module.css'

const groups = {
  Frontend: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind', 'Framer'],
  Backend: ['Node.js', 'Express', 'Java', 'Python', 'Socket.io', 'REST APIs'],
  Data: ['MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Supabase', 'Firebase'],
  Workflow: ['Git', 'GitHub', 'Docker', 'VS Code', 'Electron', 'AWS'],
}
const descriptions = {
  'Next.js':'The framework connecting the interface and the server.', React:'Component-driven interfaces.', TypeScript:'Types for more dependable applications.', JavaScript:'The language connecting browser and server.', HTML5:'Semantic, accessible page structure.', CSS3:'Layout, responsive design, and visual detail.', Tailwind:'Utility-first styling.', Framer:'Interface motion and transitions.',
  'Node.js':'JavaScript on the server.', Express:'HTTP services and application APIs.', Java:'Object-oriented programming and DSA.', Python:'Scripting, problem solving, and experimentation.', 'Socket.io':'Real-time communication between clients and servers.', 'REST APIs':'Resource-oriented interfaces between systems.',
  MongoDB:'Flexible document-based data.', PostgreSQL:'Relational data and dependable persistence.', MySQL:'Relational databases and SQL.', Redis:'Caching and low-latency data access.', Supabase:'Postgres, authentication, and realtime services.', Firebase:'Application data and backend services.',
  Git:'Version control for every iteration.', GitHub:'Repositories and collaborative development.', Docker:'Consistent, containerized environments.', 'VS Code':'The everyday development workspace.', Electron:'Desktop applications built with web technology.', AWS:'Exploring cloud infrastructure and services.',
}
const toolkit = Object.entries(groups).flatMap(([group,names]) => names.map(name => ({name,group,slug:name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/-$/,''),detail:descriptions[name]})))
const colors = {Frontend:'#8ebdcb',Backend:'#cbb58a',Data:'#9abd9d',Workflow:'#adabd0'}
function point(i,count,time=0){
  const ring=count>12 ? (i<6?0:i<15?1:2) : (i%2)
  const start=count>12 ? [0,6,15][ring] : 0
  const total=count>12 ? [6,9,count-15][ring] : Math.ceil(count/2)
  const index=count>12 ? i-start : Math.floor(i/2)
  const radius=count>12 ? [107,178,246][ring] : [135,222][ring]
  const a=index/total*Math.PI*2+ring*.57+time*(ring%2?-1:1)*.085
  return {x:Number((Math.cos(a)*radius).toFixed(3)),y:Number((Math.sin(a)*radius*.69).toFixed(3)),z:Number((Math.sin(a)*radius*.22).toFixed(3)),depth:Math.sin(a),ring}
}
export default function ToolOrbit(){
  const root=useRef(null), badges=useRef([]), time=useRef(0)
  const [filter,setFilter]=useState('All'),[selected,setSelected]=useState(null),[paused,setPaused]=useState(false),[engaged,setEngaged]=useState(false),[burst,setBurst]=useState(0)
  const visible=filter==='All'?toolkit:toolkit.filter(t=>t.group===filter)
  const info=selected?toolkit.find(t=>t.name===selected):{name:'The toolkit',group:'At the center',detail:'Different technologies, working together. Select an orbiting icon to explore.'}
  useEffect(()=>{
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame=0,last=0,onScreen=true,dead=false
    const draw=now=>{
      if(dead)return
      if(last)time.current+=Math.min(now-last,50)/1000
      last=now
      badges.current.slice(0,visible.length).forEach((el,i)=>{if(!el)return;const p=point(i,visible.length,time.current);el.style.transform=`translate(-50%,-50%) translate3d(${p.x}px,${p.y}px,${p.z}px) scale(${.93+p.depth*.08})`;el.style.zIndex=String(Math.round(20+p.depth*10))})
      frame=requestAnimationFrame(draw)
    }
    const sync=()=>{cancelAnimationFrame(frame);last=0;if(!paused&&!engaged&&!motion.matches&&onScreen&&!document.hidden)frame=requestAnimationFrame(draw)}
    const observer=new IntersectionObserver(([entry])=>{onScreen=entry.isIntersecting;sync()},{threshold:.05});observer.observe(root.current)
    document.addEventListener('visibilitychange',sync);motion.addEventListener('change',sync);sync()
    return()=>{dead=true;cancelAnimationFrame(frame);observer.disconnect();document.removeEventListener('visibilitychange',sync);motion.removeEventListener('change',sync)}
  },[filter,paused,engaged,visible.length])
  function select(name){setSelected(name);setBurst(v=>v+1)}
  function move(e){if(e.pointerType!=='mouse'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--tilt-x',`${(e.clientY-r.top-r.height/2)/65}deg`);e.currentTarget.style.setProperty('--tilt-y',`${-(e.clientX-r.left-r.width/2)/70}deg`)}
  function reset(e){e.currentTarget.style.setProperty('--tilt-x','0deg');e.currentTarget.style.setProperty('--tilt-y','0deg');setEngaged(false)}
  return <div ref={root} className={s.orbit} data-paused={paused||engaged}>
    <div className={s.top}><span>THE DEVELOPMENT SYSTEM <b>{toolkit.length}</b></span><button onClick={()=>setPaused(v=>!v)} aria-pressed={paused}>{paused?'Resume motion':'Pause motion'}</button></div>
    <div className={s.filters} aria-label="Filter technologies">{['All',...Object.keys(groups)].map(group=><button key={group} aria-pressed={filter===group} onClick={()=>{setFilter(group);setSelected(null)}}>{group}</button>)}</div>
    <div className={s.viewport} onPointerMove={move} onPointerLeave={reset} onFocusCapture={()=>setEngaged(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setEngaged(false)}}>
      <div className={s.nebula} aria-hidden="true"/>
      <div className={s.scene}>
        <div className={s.stars} aria-hidden="true">{Array.from({length:28},(_,i)=><i key={i} style={{left:`${(i*37+13)%100}%`,top:`${(i*61+7)%100}%`,'--delay':`${-i*.37}s`}}/>)}</div>
        <div className={s.plane} aria-hidden="true">{(filter==='All'?[214,356,492]:[270,444]).map((size,i)=><span key={size} className={s.ring} style={{width:size,height:size,'--duration':`${24+i*11}s`}}/>)}</div>
        <div key={burst} className={s.pulse} aria-hidden="true"/>
        <button className={s.core} aria-label="Toolkit sun — reset selection" aria-pressed={selected===null} onPointerEnter={()=>setEngaged(true)} onPointerLeave={()=>setEngaged(false)} onClick={()=>select(null)}><svg className={s.solarFlames} viewBox="0 0 160 160" aria-hidden="true"><defs><filter id="solar-flame-distortion" x="-40%" y="-40%" width="180%" height="180%"><feTurbulence type="fractalNoise" baseFrequency=".035 .06" numOctaves="3" seed="7" result="noise"/><feDisplacementMap in="SourceGraphic" in2="noise" scale="9" xChannelSelector="R" yChannelSelector="G"/></filter><radialGradient id="solar-plasma"><stop offset="0" stopColor="#fff3bf"/><stop offset=".48" stopColor="#f3b34d"/><stop offset=".8" stopColor="#dd6525" stopOpacity=".65"/><stop offset="1" stopColor="#ad3e1c" stopOpacity="0"/></radialGradient></defs><g filter="url(#solar-flame-distortion)">{Array.from({length:12},(_,i)=><path key={i} className={s.flameTongue} style={{'--flame-angle':`${i*30}deg`,'--flame-delay':`${-i*.43}s`,'--flame-speed':`${3.2+i%4*.6}s`}} d="M67 54 C61 41 73 37 67 18 C85 29 70 36 80 43 C89 38 86 27 91 21 C94 39 102 47 92 59 Z" fill="url(#solar-plasma)"/>)}</g><g className={s.prominences}><path d="M111 61 C142 24 151 73 118 86"/><path d="M50 98 C16 128 41 149 67 114"/></g></svg><span className={s.sunCorona} aria-hidden="true"/><span className={s.sunSurface} aria-hidden="true"/><span className={s.sunFlare} aria-hidden="true"/></button>
        {visible.map((tool,i)=>{const p=point(i,visible.length,time.current);return <button key={tool.name} ref={el=>{badges.current[i]=el}} className={s.badge} style={{'--color':colors[tool.group],transform:`translate(-50%,-50%) translate3d(${p.x}px,${p.y}px,${p.z}px)`,zIndex:Math.round(20+p.depth*10)}} aria-label={`${tool.name} — show details`} aria-pressed={selected===tool.name} onPointerEnter={()=>setEngaged(true)} onPointerLeave={()=>setEngaged(false)} onClick={()=>select(tool.name)}><img src={`/tool-icons/${tool.slug}.svg`} alt="" className={['Next.js','Express','GitHub','AWS','Socket.io','REST APIs'].includes(tool.name)?s.mono:undefined}/><span className={s.tooltip}>{tool.name}</span></button>})}
      </div>
    </div>
    <div className={s.readout} aria-live="polite"><div><span>{info.group}</span><strong>{info.name}</strong></div><p>{info.detail}</p>{info.slug && <img src={`/tool-icons/${info.slug}.svg`} className={['Express','GitHub','AWS','Next.js','Socket.io','REST APIs'].includes(info.name)?s.mono:undefined} alt=""/>}</div>
    <div className={s.legend}><span><i/> {visible.length} technologies in view</span><span>Hover to hold · Select to explore</span></div>
  </div>
}
