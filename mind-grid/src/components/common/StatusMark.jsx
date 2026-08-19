import { statusLabels } from '../../data/seed'

export default function StatusMark({ status }) {
  return <span className={`status-mark status-${status}`}><i aria-hidden="true" />{statusLabels[status]}</span>
}
