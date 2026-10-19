'use client'

import { useEffect, useRef, useState } from 'react'
import { eclipse as s } from '../app/styleNames'

// Pen-down paths traced from the reference's letter shapes. Separate paths
// represent pen lifts; the underline is written only after the name.
const signatureStrokes = [
  { d: 'M46 318 C100 267 168 203 181 226 C198 251 133 377 133 438 C144 457 278 218 379 133 C400 116 415 103 423 109', duration: .48, delay: .08 },
  { d: 'M249 335 C234 354 213 393 233 382 C250 374 269 357 280 344', duration: .12, delay: .57 },
  { d: 'M260 311 L258 314', duration: .04, delay: .7 },
  { d: 'M268 379 C292 325 346 230 369 213 C404 186 337 285 294 321 C279 340 273 355 278 360 C291 344 320 330 320 346 C317 369 269 405 273 392 C275 384 326 365 348 350', duration: .23, delay: .75 },
  { d: 'M347 352 C373 307 416 217 445 204 C474 178 419 282 382 314 C369 339 354 371 357 379 C370 365 385 345 398 345 C411 341 398 361 411 365 C427 369 450 351 463 342', duration: .24, delay: .99 },
  { d: 'M481 336 C476 320 451 343 445 357 C439 377 470 352 481 339 C474 358 482 364 494 356 L521 336', duration: .14, delay: 1.24 },
  { d: 'M518 346 C529 321 540 309 530 339 C520 373 525 366 542 335 C548 317 549 335 560 333 C591 324 629 303 647 306', duration: .18, delay: 1.39 },
  { d: 'M738 187 C718 184 663 265 660 323 C651 380 677 369 727 348 C803 314 883 228 908 185 C942 133 876 183 833 246 C784 317 734 414 705 497', duration: .4, delay: 1.61 },
  { d: 'M849 326 C842 314 821 337 817 350 C813 365 839 345 851 334 C838 355 850 358 865 350 L882 342', duration: .13, delay: 2.02 },
  { d: 'M913 332 C904 319 881 337 880 349 C878 367 920 338 945 308 C972 280 1007 230 1007 240 C1002 257 957 308 943 330 C928 353 947 355 975 339', duration: .23, delay: 2.16 },
  { d: 'M1002 324 C994 315 978 334 977 344 C979 358 997 333 1000 329 C1004 343 1007 349 1022 341 L1038 327 C1049 317 1034 346 1040 346 C1053 334 1064 307 1070 323 C1077 337 1100 331 1124 325 C1174 313 1216 304 1232 314', duration: .23, delay: 2.4 },
  { d: 'M456 459 C538 418 716 391 879 382 C983 377 1052 376 1107 370', duration: .22, delay: 2.7 },
  { d: 'M1127 369 L1128 369 M1149 367 L1151 366', duration: .07, delay: 2.94 },
]

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
    const reveal=setTimeout(()=>setPhase('opening'),3350)
    const finish=setTimeout(()=>setPhase('done'),3900)
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
    <div className={s.sheet}>
      <button className={s.skip} type="button" onClick={()=>setPhase('done')}>Skip</button>
      <div className={s.note}>
        <svg className={s.signature} viewBox="0 70 1280 480" role="img" aria-label="Vibhav Yadav signature">
          {signatureStrokes.map((stroke, index) => <path key={index} d={stroke.d} pathLength="1" className={s.penStroke} style={{ '--duration': `${stroke.duration}s`, '--delay': `${stroke.delay}s` }} />)}
        </svg>
      </div>
    </div>
  </div>
}
