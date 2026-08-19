import { seedState } from '../data/seed'

const ACCOUNTS_KEY = 'mindgrid-accounts-v1'
const SESSION_KEY = 'mindgrid-session-v1'

function cloneSeedState() {
  return JSON.parse(JSON.stringify({ ...seedState, profile: null }))
}

function normalizeState(state) {
  const base = cloneSeedState()
  return {
    ...base,
    ...state,
    skills: Array.isArray(state?.skills) ? state.skills : base.skills,
    resources: Array.isArray(state?.resources) ? state.resources : base.resources,
    evidence: Array.isArray(state?.evidence) ? state.evidence : base.evidence,
    logs: Array.isArray(state?.logs) ? state.logs : base.logs,
    goals: Array.isArray(state?.goals) ? state.goals : base.goals,
  }
}

function readAccounts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}')
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function getActiveEmail() {
  try {
    return localStorage.getItem(SESSION_KEY)
  } catch {
    return null
  }
}

export function loadState() {
  const email = getActiveEmail()
  if (!email) return cloneSeedState()
  const account = readAccounts()[email]
  return account ? normalizeState(account.state) : cloneSeedState()
}

export function accountExists(email) {
  return Boolean(readAccounts()[email.trim().toLowerCase()])
}

export function createAccount({ name, email, password }) {
  const normalizedEmail = email.trim().toLowerCase()
  const accounts = readAccounts()
  if (accounts[normalizedEmail]) return { ok: false, error: 'An account with this email already exists.' }
  accounts[normalizedEmail] = {
    password,
    state: { ...cloneSeedState(), profile: { name: name.trim(), email: normalizedEmail, bio: '', avatar: '' } },
  }
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  localStorage.setItem(SESSION_KEY, normalizedEmail)
  return { ok: true, state: accounts[normalizedEmail].state }
}

export function authenticate(email, password) {
  const normalizedEmail = email.trim().toLowerCase()
  const account = readAccounts()[normalizedEmail]
  if (!account || account.password !== password) return { ok: false, error: 'Email or password is incorrect.' }
  localStorage.setItem(SESSION_KEY, normalizedEmail)
  return { ok: true, state: normalizeState(account.state) }
}

export function saveState(state) {
  const email = getActiveEmail()
  if (!email) return
  try {
    const accounts = readAccounts()
    if (!accounts[email]) return
    accounts[email].state = normalizeState(state)
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
  } catch {
    // The current session remains usable when storage is unavailable.
  }
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // The UI still returns to the login screen if storage is unavailable.
  }
}
