import { ArrowUpRight, CalendarDays, Check, Link2 } from 'lucide-react'
import { statusLabels, statusOrder } from '../../data/seed'
import { useMindGrid } from '../../context/MindGridContext'
import { formatDate, getSkill } from '../../utils/learning'
import StatusMark from '../common/StatusMark'

export default function SkillInspector({ skillId }) {
  const { state, dispatch } = useMindGrid()
  const skill = getSkill(state, skillId)
  if (!skill) return null
  const resources = state.resources.filter((item) => item.skillId === skill.id)
  const evidence = state.evidence.filter((item) => item.skillId === skill.id)
  const children = state.skills.filter((item) => item.parentId === skill.id)
  const next = children.find((item) => item.status !== 'mastered')

  return <aside className="inspector">
    <header><div><span className="eyebrow">Skill record / {skill.category}</span><h2>{skill.name}</h2></div><StatusMark status={skill.status} /></header>
    <p className="inspector-description">{skill.description}</p>
    <div className="inspector-progress"><div><span>Capability</span><strong>{skill.progress}%</strong></div><div className="progress-track"><i style={{ width: `${skill.progress}%` }} /></div></div>
    <label className="field-label" htmlFor="status-select">Learning state</label>
    <select id="status-select" value={skill.status} onChange={(e) => dispatch({ type: 'UPDATE_SKILL', id: skill.id, changes: { status: e.target.value } })}>
      {statusOrder.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}
    </select>
    <label className="field-label" htmlFor="progress-range">Demonstrated confidence</label>
    <input id="progress-range" type="range" min="0" max="100" value={skill.progress} onChange={(e) => dispatch({ type: 'UPDATE_SKILL', id: skill.id, changes: { progress: Number(e.target.value) } })} />
    <div className="meta-row"><CalendarDays size={15} /><span>Last practiced</span><strong>{formatDate(skill.lastPracticed)}</strong></div>
    {next && <section className="next-block"><span className="eyebrow">Next subskill</span><strong>{next.name}</strong><p>{next.progress}% capability established</p></section>}
    <section className="inspector-section"><div className="section-title"><h3>Evidence</h3><span>{evidence.length}</span></div>
      {evidence.length ? evidence.map((item) => <article className="evidence-line" key={item.id}><Check size={15} /><div><strong>{item.title}</strong><span>{item.type} · Confidence {item.confidence}/5</span></div></article>) : <p className="compact-empty">No proof attached. Build something that exercises this skill.</p>}
    </section>
    <section className="inspector-section"><div className="section-title"><h3>Resources</h3><span>{resources.length}</span></div>
      {resources.map((item) => <a className="resource-line" key={item.id} href={item.url} target="_blank" rel="noreferrer"><Link2 size={15} /><span><strong>{item.title}</strong><small>{item.type} · {item.source}</small></span><ArrowUpRight size={14} /></a>)}
      {!resources.length && <p className="compact-empty">No resources linked to this skill.</p>}
    </section>
  </aside>
}
