'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react'
import s from './CertificateFolder.module.css'

export default function CertificateFolder({ certificates }) {
  const [active, setActive] = useState(0)
  const [outgoing, setOutgoing] = useState(null)
  const transitionTimer = useRef(null)
  const [zoomed, setZoomed] = useState(false)
  const dialog = useRef(null)
  const tabs = useRef([])
  const [issuer, title, file] = certificates[active]
  const src = `/Certificates/${encodeURIComponent(file)}`

  useEffect(() => {
    const element = dialog.current
    const restore = () => { document.body.style.overflow = previousOverflow; setZoomed(false) }
    let previousOverflow = document.body.style.overflow
    const lock = () => { previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden' }
    element.addEventListener('close', restore)
    element.addEventListener('folder-open', lock)
    return () => { element.removeEventListener('close', restore); element.removeEventListener('folder-open', lock); if (element.open) restore() }
  }, [])

  function openCertificate() {
    dialog.current.showModal()
    dialog.current.dispatchEvent(new Event('folder-open'))
  }
  useEffect(() => () => clearTimeout(transitionTimer.current), [])

  function select(index, focus = false) {
    if (index === active) { if (focus) tabs.current[index]?.focus(); return }
    clearTimeout(transitionTimer.current)
    setOutgoing({ file, key: Date.now() })
    transitionTimer.current = setTimeout(() => setOutgoing(null), 650)
    setActive(index)
    setZoomed(false)
    if (focus) tabs.current[index]?.focus()
  }
  function handleTabKey(event, index) {
    const last = certificates.length - 1
    const next = { ArrowDown: (index + 1) % certificates.length, ArrowUp: (index + last) % certificates.length, ArrowRight: (index + 1) % certificates.length, ArrowLeft: (index + last) % certificates.length, Home: 0, End: last }[event.key]
    if (next !== undefined) { event.preventDefault(); select(next, true) }
  }

  return (
    <div className={s.archive} id="certificates">
      <div className={s.heading}><span>THE CREDENTIAL COLLECTION</span><span>0{certificates.length} / SELECTED CERTIFICATES</span></div>
      <div className={s.collection}>
        <div className={s.stage} role="tabpanel" id="credential-panel" aria-labelledby={`credential-tab-${active}`}>
          <div className={s.stack}>
            {outgoing && <div key={outgoing.key} className={s.departingSheet} aria-hidden="true"><img src={`/Certificates/${encodeURIComponent(outgoing.file)}`} alt=""/></div>}
            {[2, 1].map(offset => { const index = (active + offset) % certificates.length; const [name, credential, document] = certificates[index]; return <button key={offset} type="button" className={s.backSheet} data-layer={offset} onClick={() => select(index)} aria-label={`Show ${name} ${credential} certificate`}><img src={`/Certificates/${encodeURIComponent(document)}`} alt="" loading="lazy"/></button> })}
            <button key={file} className={`${s.frontSheet} ${outgoing ? s.arrivingSheet : ''}`} onClick={openCertificate} aria-label={`Enlarge ${issuer} ${title} certificate`}><img src={src} alt={`${issuer}: ${title} — certificate awarded to Vibhav Yadav`} loading="lazy"/><span><Maximize2 size={14}/> View certificate</span></button>
          </div>
          <div className={s.stackCaption}><span>0{active + 1} / 0{certificates.length}</span><span>ISSUED TO VIBHAV YADAV</span></div>
        </div>
        <div className={s.selection}>
          <div className={s.selectionIntro} aria-live="polite"><span className={s.issuer}>{issuer}</span><h3>{title}</h3></div>
          <div className={s.credentialList} role="tablist" aria-label="Certificates" aria-orientation="vertical">
            {certificates.map(([name, credential], index) => <button key={credential} ref={el => { tabs.current[index] = el }} id={`credential-tab-${index}`} role="tab" aria-selected={active === index} aria-controls="credential-panel" tabIndex={active === index ? 0 : -1} onClick={() => select(index)} onKeyDown={e => handleTabKey(e, index)}><span className={s.listNumber}>0{index + 1}</span><span><strong>{credential}</strong><small>{name}</small></span><i aria-hidden="true"/></button>)}
          </div>
        </div>
      </div>
      <dialog ref={dialog} className={s.viewer} aria-labelledby="certificate-viewer-title" onClick={event => { if (event.target === event.currentTarget) dialog.current.close() }}>
        <div className={s.viewerBar}><div><span>{issuer}</span><h3 id="certificate-viewer-title">{title}</h3></div><div><button onClick={() => setZoomed(!zoomed)} aria-label={zoomed ? 'Fit certificate to screen' : 'Zoom in'} aria-pressed={zoomed}>{zoomed ? <ZoomOut size={20}/> : <ZoomIn size={20}/>}</button><a href={src} target="_blank" rel="noreferrer" aria-label="Open original certificate"><ArrowUpRight size={20}/></a><button onClick={() => dialog.current.close()} aria-label="Close certificate" autoFocus><X size={22}/></button></div></div>
        <div className={`${s.viewerContent} ${zoomed ? s.zoomed : ''}`}><img src={src} alt={`${issuer}: ${title} — certificate awarded to Vibhav Yadav`}/></div>
      </dialog>
    </div>
  )
}
