import { statusOrder } from '../data/seed'

export function getSkill(state, id) {
  return state.skills.find((skill) => skill.id === id)
}

export function goalProgress(goal, skills) {
  const targets = skills.filter((skill) => goal.skillIds.includes(skill.id))
  return Math.round(targets.reduce((sum, skill) => sum + skill.progress, 0) / targets.length)
}

export function getRecommendation(state) {
  const candidates = state.skills.filter((skill) => skill.status !== 'mastered' && skill.id !== 'frontend')
  const ready = candidates.filter((skill) => skill.prerequisites.every((id) => (getSkill(state, id)?.progress || 0) >= 60))
  return ready.sort((a, b) => {
    const statusDelta = statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status)
    return statusDelta || b.progress - a.progress
  })[0] || candidates[0]
}

export function formatDate(date) {
  if (!date) return 'Not practiced'
  return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(`${date}T12:00:00`))
}
