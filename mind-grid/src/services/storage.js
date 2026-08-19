import { seedState } from '../data/seed'

const STORAGE_KEY = 'mindgrid-state-v1'

export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return seedState
    const parsed = JSON.parse(stored)
    return {
      ...seedState,
      ...parsed,
      skills: Array.isArray(parsed.skills) ? parsed.skills : seedState.skills,
      resources: Array.isArray(parsed.resources) ? parsed.resources : seedState.resources,
      evidence: Array.isArray(parsed.evidence) ? parsed.evidence : seedState.evidence,
      logs: Array.isArray(parsed.logs) ? parsed.logs : seedState.logs,
      goals: Array.isArray(parsed.goals) ? parsed.goals : seedState.goals,
    }
  } catch {
    return seedState
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {
    // The current session remains usable when storage is unavailable.
  }
}
