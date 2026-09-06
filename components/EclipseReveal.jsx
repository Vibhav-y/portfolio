'use client'

import { useEffect, useRef, useState } from 'react'
import BrandMark from './BrandMark'
import s from './EclipseReveal.module.css'

export default function EclipseReveal(){
  const [phase,setPhase]=useState('forming')
  const shouldPlay = useRef(null)
  useEffect(()=>{
    // Cache the verdict across Strict Mode's effect cleanup/re-run.
    // Consume only the current document's intro, never the whole tab session.
    if (shouldPlay.current === null) {
      shouldPlay.current = window.__v3Eclipse === true && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.__v3Eclipse = false
    }
    if (!shouldPlay.current) { setPhase('done'); return }
    setPhase('forming')
    const reveal=setTimeout(()=>setPhase('opening'),1650)
    const finish=setTimeout(()=>setPhase('done'),3000)
    return()=>{clearTimeout(reveal);clearTimeout(finish)}
  },[])
  useEffect(()=>{
    if(phase!=='forming'&&phase!=='opening')return
    const onKey=e=>{if(e.key==='Escape')setPhase('done')}
    document.addEventListener('keydown',onKey)
    return()=>document.removeEventListener('keydown',onKey)
  },[phase])
  if(phase==='idle'||phase==='done')return null
  return <div className={s.reveal} data-phase={phase} aria-label="Portfolio introduction">
    <div className={s.strips} aria-hidden="true">{Array.from({length:10},(_,i)=><div key={i} className={s.strip} style={{'--i':i,'--exit':i%2?'105%':'-105%','--lag':`${Math.abs(i-4.5)*65}ms`}}><div className={s.composition}><div className={s.coordinates}><span>IDEA</span><span>ITERATION</span><span>EXPERIENCE</span></div><div className={s.name}>{'VIBHAV'.split('').map((letter,j)=><span key={j} style={{'--j':j,'--offset':`${j%2?110:-110}%`}}>{letter}</span>)}</div><div className={s.echo}>VIBHAV</div><div className={s.cursor}/><span className={s.caption}>A FEW PIECES. A DIFFERENT PERSPECTIVE.</span></div></div>)}</div>
    <div className={s.top}><BrandMark className={s.brand}/><span>VIBHAV YADAV</span><button onClick={()=>setPhase('done')}>Skip intro ↗</button></div>
    <div className={s.bottom}><span>DESIGNED IN DETAIL. BUILT TO EXPLORE.</span><span>{phase==='opening'?'YOURS TO EXPLORE ↗':'PUTTING THE PIECES TOGETHER'}</span></div>
  </div>
}
