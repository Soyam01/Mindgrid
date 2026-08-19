/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useReducer } from 'react'
import { loadState, saveState } from '../services/storage'

const MindGridContext = createContext(null)

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_SKILL':
      return { ...state, skills: state.skills.map((skill) => skill.id === action.id ? { ...skill, ...action.changes } : skill) }
    case 'ADD_LOG':
      return { ...state, logs: [action.log, ...state.logs] }
    case 'ADD_EVIDENCE':
      return { ...state, evidence: [action.evidence, ...state.evidence] }
    case 'ADD_SKILL':
      return { ...state, skills: [...state.skills, action.skill] }
    case 'ADD_GOAL':
      return { ...state, goals: [...state.goals, action.goal] }
    case 'SET_PROFILE':
      return { ...state, profile: action.profile }
    case 'LOGOUT':
      return { ...state, profile: null }
    case 'ADD_RESOURCE':
      return { ...state, resources: [action.resource, ...state.resources] }
    case 'REMOVE_RESOURCE':
      return { ...state, resources: state.resources.filter((resource) => resource.id !== action.id) }
    default:
      return state
  }
}

export function MindGridProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)
  useEffect(() => saveState(state), [state])
  return <MindGridContext.Provider value={{ state, dispatch }}>{children}</MindGridContext.Provider>
}

export function useMindGrid() {
  const context = useContext(MindGridContext)
  if (!context) throw new Error('useMindGrid must be used within MindGridProvider')
  return context
}
