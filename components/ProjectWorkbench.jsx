'use client'

import { useRef, useState } from 'react'
import { ArrowUpRight, GitMerge, RotateCcw, Sparkles } from 'lucide-react'
import { FEATURED_PROJECTS } from '../lib/projects'
import { workbench as s } from '../app/styleNames'

const notes = ['one sentence. lots of possibilities.', 'a little less terminal anxiety.', 'better ideas happen together.']

function MiniDemo({ id }) {
  const [played, setPlayed] = useState(false)
  return <div className={s.demo}>
    <div className={s.demoLabel}><span>↳ INTERACTIVE SKETCH</span><span>give it a go</span></div>
    {id === 'audienceos' ? <>
      <div className={s.prompt}>“Bring back customers who haven’t visited lately.”</div>
      <div className={s.campaign} aria-live="polite">{played ? <><span>01 / AUDIENCE<strong>Returning customers</strong></span><span>02 / CHANNEL<strong>Email campaign</strong></span><span>03 / NEXT STEP<strong>Review proposal ✓</strong></span></> : <p>A small idea, waiting to become a plan.</p>}</div>
      <button onClick={() => setPlayed(!played)}>{played ? <RotateCcw size={15}/> : <Sparkles size={15}/>} {played ? 'Start again' : 'Turn idea into a plan'}</button>
    </> : id === 'gittool' ? <>
      <div className={s.graph} data-played={played}>
        <svg viewBox="0 0 360 100" role="img" aria-label={played ? 'Feature branch merged into main' : 'Feature branch diverging from main'}><path d="M25 70 H335"/><path className={s.branchPath} d={played ? 'M80 70 C110 70 100 25 140 25 H225 C265 25 250 70 290 70' : 'M80 70 C110 70 100 25 140 25 H225'}/>{[25,80,290,335].map(x => <circle key={x} cx={x} cy="70" r="6"/>)}<circle cx="145" cy="25" r="6"/><circle cx="225" cy="25" r="6"/><text x="30" y="94">main</text><text x="150" y="13">feature / good-idea</text></svg>
      </div>
      <p className={s.demoStatus} aria-live="polite">{played ? 'Together at last. Feature merged into main.' : 'One good idea, on its own little branch.'}</p>
      <button onClick={() => setPlayed(!played)}>{played ? <RotateCcw size={15}/> : <GitMerge size={15}/>} {played ? 'Reset branches' : 'Merge the idea'}</button>
    </> : <>
      <div className={s.document}><span className={s.documentTitle}>The next good idea</span><p>Make a space for <span className={s.cursorOne}>curiosity<i>Vibhav</i></span></p><p aria-live="polite">{played ? <span className={s.cursorTwo}>and a little collective imagination.<i>You</i></span> : <span className={s.placeholder}>Your thought goes here…</span>}</p></div>
      <button onClick={() => setPlayed(!played)}>{played ? <RotateCcw size={15}/> : <Sparkles size={15}/>} {played ? 'Try again' : 'Add your little spark'}</button>
    </>}
  </div>
}

export default function ProjectWorkbench({ onDetails }) {
  const [active, setActive] = useState(0)
  const tabs = useRef([])
  const project = FEATURED_PROJECTS[active]
  function handleKey(event) {
    const next = { ArrowRight: (active + 1) % 3, ArrowLeft: (active + 2) % 3, Home: 0, End: 2 }[event.key]
    if (next !== undefined) { event.preventDefault(); setActive(next); tabs.current[next]?.focus() }
  }
  return <div className={s.workbench}>
    <div className={s.caption}><span>THE PROJECT FILES</span><span>Open a folder. Poke around. ↙</span></div>
    <div className={s.tabs} role="tablist" aria-label="Project folders">{FEATURED_PROJECTS.map((item, index) => <button key={item.id} ref={el => { tabs.current[index] = el }} type="button" role="tab" id={`project-tab-${item.id}`} aria-controls={`project-folder-${item.id}`} aria-selected={index === active} tabIndex={index === active ? 0 : -1} onKeyDown={handleKey} onClick={() => setActive(index)}><span>0{index + 1}</span>{item.name}<span aria-hidden="true">{index === active ? '↗' : '+'}</span></button>)}</div>
    {FEATURED_PROJECTS.map((item,index) => <div key={item.id} role="tabpanel" id={`project-folder-${item.id}`} aria-labelledby={`project-tab-${item.id}`} hidden={active !== index} tabIndex={0} className={s.folder} data-tone={index}>
      {active === index && <div className={s.folderContent}>
        <div className={s.story}><div className={s.meta}><span>FILE / 0{active + 1}</span><span className={s.status}>{project.status === 'Live' ? '● LIVE PROJECT' : '◌ IN THE MAKING'}</span></div><h3>{project.name}</h3><p className={s.summary}>{project.summary}</p><ul className={s.features}>{project.features.slice(0,3).map(feature => <li key={feature}>{feature}</li>)}</ul><div className={s.tags}>{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><div className={s.links}>{project.link && <a href={project.link} target="_blank" rel="noreferrer">Try it <ArrowUpRight size={15}/></a>}{project.github && <a href={project.github} target="_blank" rel="noreferrer">Source <ArrowUpRight size={15}/></a>}<button onClick={() => onDetails(project)}>How I built it <ArrowUpRight size={15}/></button></div></div>
        <div className={s.preview}><p className={s.marginNote}>{notes[active]} <span aria-hidden="true">↴</span></p><button className={s.screenshot} onClick={() => onDetails(project)} aria-label={`Read about ${project.name}`}><span className={s.windowBar}><i/><i/><i/><span>{project.name} / a peek inside</span></span><img src={project.image} alt={`${project.name} application preview`} loading="lazy"/></button><MiniDemo key={project.id} id={project.id}/></div>
        <div className={s.footer}><span>BUILT WITH CURIOSITY / {project.year}</span><span>✳ always room for another idea</span></div>
      </div>}
    </div>)}
  </div>
}
