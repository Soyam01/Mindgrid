import { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { BookOpen, Boxes, Command, Flag, Grid3X3, Menu, NotebookPen, Search, Target, UserCircle, X } from 'lucide-react'
import { useMindGrid } from '../../context/MindGridContext'

const nav = [
  ['/', 'Overview', Command],
  ['/skills', 'Skills', Boxes],
  ['/map', 'Map', Grid3X3],
  ['/practice', 'Practice', Target],
  ['/logs', 'Logs', NotebookPen],
  ['/resources', 'Resources', BookOpen],
  ['/goals', 'Goals', Flag],
]

export default function AppShell() {
  const { state } = useMindGrid()
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const handler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setSearchOpen(true)
      }
      if (event.key === 'Escape') setSearchOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const results = query.trim() ? [
    ...state.skills.map((item) => ({ ...item, type: 'Skill', path: `/skills/${item.id}` })),
    ...state.resources.map((item) => ({ ...item, name: item.title, type: 'Resource', path: '/resources' })),
    ...state.goals.map((item) => ({ ...item, type: 'Goal', path: '/goals' })),
    ...state.logs.map((item) => ({ ...item, name: item.text, type: 'Log', path: '/logs' })),
  ].filter((item) => item.name.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : []

  function chooseResult(result) {
    navigate(result.path)
    setQuery('')
    setSearchOpen(false)
  }

  return (
    <div className="app-shell">
      <aside className={`rail ${mobileOpen ? 'rail-open' : ''}`}>
        <div className="brand"><span className="brand-mark" aria-hidden="true"><i /><i /><i /><i /></span><strong>MindGrid</strong></div>
        <nav aria-label="Primary navigation">
          {nav.map(([to, label, Icon]) => <NavLink key={to} to={to} end={to === '/'} onClick={() => setMobileOpen(false)}><Icon size={18} /><span>{label}</span></NavLink>)}
        </nav>
        <div className="rail-footer"><NavLink className="profile-link" to={state.profile ? '/profile' : '/login'} onClick={() => setMobileOpen(false)}><UserCircle size={17} /><span>{state.profile ? state.profile.name : 'Local profile'}</span><small>{state.profile ? 'Profile' : 'Sign in'}</small></NavLink><span>LOCAL SYSTEM</span><strong><i /> SYNCED</strong></div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <button className="mobile-menu icon-button" onClick={() => setMobileOpen(!mobileOpen)} aria-expanded={mobileOpen} aria-label="Toggle navigation">{mobileOpen ? <X /> : <Menu />}</button>
          <button className="search-trigger" onClick={() => setSearchOpen(true)}><Search size={17} /><span>Search skills, evidence, logs...</span><kbd>Ctrl K</kbd></button>
          <div className="today"><span>{new Intl.DateTimeFormat('en', { weekday: 'short' }).format(new Date()).toUpperCase()}</span><strong>{new Date().getDate()}</strong></div>
        </header>
        <main><Outlet /></main>
      </div>
      {searchOpen && <div className="command-backdrop" onMouseDown={(e) => e.target === e.currentTarget && setSearchOpen(false)}>
        <section className="command-dialog" role="dialog" aria-modal="true" aria-label="Search MindGrid">
          <div className="command-input"><Search size={19} /><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search your knowledge system" /></div>
          <div className="command-results">
            {!query && <p className="command-hint">Search across skills, resources, logs, and goals.</p>}
            {query && !results.length && <p className="command-hint">No matching records.</p>}
            {results.map((result) => <button key={`${result.type}-${result.id}`} onClick={() => chooseResult(result)}><span>{result.name}</span><small>{result.type}</small></button>)}
          </div>
          <footer><span><kbd>ESC</kbd> close</span><span><kbd>ENTER</kbd> open</span></footer>
        </section>
      </div>}
    </div>
  )
}
