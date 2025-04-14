import { utilService } from '../services/util.service.js'

const { useEffect } = React

export function ActivityList({ activities }) {


  function getActivityTime(at) {
    return utilService.getFormattedTime(at)
  }

  return (
    <ul className="Activities-list">
      {activities.map(activity => (
        <li key={activity.at}>
          <span>{getActivityTime(activity.at)}</span> |&nbsp;
          <span>{activity.txt}</span>
        </li>
      ))}
    </ul>
  )
}
