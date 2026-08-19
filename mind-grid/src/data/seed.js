export const statusOrder = ['not-started', 'learning', 'practicing', 'proficient', 'mastered']

export const statusLabels = {
  'not-started': 'Not started',
  learning: 'Learning',
  practicing: 'Practicing',
  proficient: 'Proficient',
  mastered: 'Mastered',
}

const skills = [
  { id: 'frontend', name: 'Frontend Development', category: 'Path', description: 'Build accessible, resilient interfaces for the web.', status: 'practicing', progress: 64, parentId: null, prerequisites: [], relatedSkills: [], lastPracticed: '2026-08-13' },
  { id: 'html', name: 'HTML', category: 'Foundation', description: 'Structure meaningful, semantic web documents.', status: 'mastered', progress: 94, parentId: 'frontend', prerequisites: [], relatedSkills: ['accessibility'], lastPracticed: '2026-08-10' },
  { id: 'css', name: 'CSS', category: 'Foundation', description: 'Create robust layouts and adaptive visual systems.', status: 'proficient', progress: 84, parentId: 'frontend', prerequisites: ['html'], relatedSkills: ['accessibility'], lastPracticed: '2026-08-12' },
  { id: 'javascript', name: 'JavaScript', category: 'Language', description: 'Model application behavior with the language of the web.', status: 'practicing', progress: 78, parentId: 'frontend', prerequisites: ['html'], relatedSkills: ['typescript'], lastPracticed: '2026-08-13' },
  { id: 'git', name: 'Git', category: 'Tooling', description: 'Track, review, and integrate changes safely.', status: 'proficient', progress: 81, parentId: 'frontend', prerequisites: [], relatedSkills: [], lastPracticed: '2026-08-11' },
  { id: 'react', name: 'React', category: 'Framework', description: 'Compose interactive interfaces from predictable state.', status: 'practicing', progress: 67, parentId: 'frontend', prerequisites: ['javascript'], relatedSkills: ['testing'], lastPracticed: '2026-08-13' },
  { id: 'typescript', name: 'TypeScript', category: 'Language', description: 'Add useful static constraints to JavaScript systems.', status: 'learning', progress: 38, parentId: 'frontend', prerequisites: ['javascript'], relatedSkills: ['react'], lastPracticed: '2026-08-09' },
  { id: 'apis', name: 'REST APIs', category: 'Integration', description: 'Consume and reason about HTTP-based data services.', status: 'practicing', progress: 61, parentId: 'frontend', prerequisites: ['javascript'], relatedSkills: ['react'], lastPracticed: '2026-08-12' },
  { id: 'testing', name: 'Testing', category: 'Quality', description: 'Prove behavior with focused automated checks.', status: 'learning', progress: 32, parentId: 'frontend', prerequisites: ['javascript', 'react'], relatedSkills: ['accessibility'], lastPracticed: '2026-08-08' },
  { id: 'accessibility', name: 'Accessibility', category: 'Quality', description: 'Build experiences that work across abilities and devices.', status: 'learning', progress: 45, parentId: 'frontend', prerequisites: ['html', 'css'], relatedSkills: ['testing'], lastPracticed: '2026-08-07' },
  { id: 'performance', name: 'Performance', category: 'Quality', description: 'Measure and improve responsiveness and delivery.', status: 'not-started', progress: 8, parentId: 'frontend', prerequisites: ['javascript', 'react'], relatedSkills: ['testing'], lastPracticed: null },
  { id: 'hooks', name: 'React Hooks', category: 'React', description: 'Express state, effects, and reusable behavior with hooks.', status: 'practicing', progress: 72, parentId: 'react', prerequisites: ['react'], relatedSkills: ['apis'], lastPracticed: '2026-08-13' },
  { id: 'effects', name: 'Effects', category: 'React', description: 'Synchronize React with systems outside component rendering.', status: 'practicing', progress: 69, parentId: 'hooks', prerequisites: ['hooks'], relatedSkills: ['apis'], lastPracticed: '2026-08-13' },
  { id: 'custom-hooks', name: 'Custom Hooks', category: 'React', description: 'Package reusable stateful behavior behind clear interfaces.', status: 'learning', progress: 41, parentId: 'hooks', prerequisites: ['effects'], relatedSkills: ['testing'], lastPracticed: '2026-08-12' },
]

const resources = [
  { id: 'r1', skillId: 'hooks', type: 'Documentation', title: 'Built-in React Hooks', source: 'react.dev', url: 'https://react.dev/reference/react/hooks', complete: false },
  { id: 'r2', skillId: 'effects', type: 'Documentation', title: 'Synchronizing with Effects', source: 'react.dev', url: 'https://react.dev/learn/synchronizing-with-effects', complete: true },
  { id: 'r3', skillId: 'accessibility', type: 'Guide', title: 'Web Content Accessibility Guidelines', source: 'w3.org', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/', complete: false },
  { id: 'r4', skillId: 'testing', type: 'Documentation', title: 'Testing Library Guiding Principles', source: 'testing-library.com', url: 'https://testing-library.com/docs/guiding-principles', complete: false },
  { id: 'r5', skillId: 'typescript', type: 'Handbook', title: 'TypeScript for JavaScript Programmers', source: 'typescriptlang.org', url: 'https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html', complete: true },
]

const evidence = [
  { id: 'e1', skillId: 'hooks', type: 'Project', title: 'Mind Grid', detail: 'Built filtering, persistence, and reusable state hooks.', url: 'https://github.com/', confidence: 4, date: '2026-08-11' },
  { id: 'e2', skillId: 'effects', type: 'Implementation', title: 'Abortable API loading state', detail: 'Handled race conditions and cleanup during request changes.', url: '', confidence: 4, date: '2026-08-13' },
  { id: 'e3', skillId: 'css', type: 'Project', title: 'Responsive editorial layout', detail: 'Built fluid layouts without breakpoint-specific duplication.', url: '', confidence: 5, date: '2026-08-05' },
  { id: 'e4', skillId: 'javascript', type: 'Challenge', title: 'Promise concurrency utilities', detail: 'Implemented all, allSettled, and bounded concurrency helpers.', url: '', confidence: 4, date: '2026-08-09' },
]

const logs = [
  { id: 'l1', skillId: 'effects', time: '16:42', date: '2026-08-13', text: 'Added evidence for abortable data loading', kind: 'prove' },
  { id: 'l2', skillId: 'effects', time: '16:03', date: '2026-08-13', text: 'Practiced effect dependency analysis', kind: 'practice' },
  { id: 'l3', skillId: 'hooks', time: '15:17', date: '2026-08-13', text: 'Built reusable API loading state', kind: 'build' },
  { id: 'l4', skillId: 'hooks', time: '14:32', date: '2026-08-13', text: 'Studied React effect synchronization', kind: 'learn' },
  { id: 'l5', skillId: 'apis', time: '18:20', date: '2026-08-12', text: 'Handled failed and cancelled fetch requests', kind: 'practice' },
]

const goals = [
  { id: 'g1', name: 'Become a production-ready frontend developer', targetDate: '2026-12-15', skillIds: ['html', 'css', 'javascript', 'git', 'react', 'typescript', 'apis', 'testing', 'accessibility', 'performance'] },
]

export const seedState = { skills, resources, evidence, logs, goals, profile: null }
