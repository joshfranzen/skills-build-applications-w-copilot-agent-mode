import { createElement } from 'react'
import DataTablePage from './DataTablePage.js'

function Activities() {
  return createElement(
    DataTablePage,
    {
      columns: [
        { key: 'username', label: 'User' },
        { key: 'activityType', label: 'Activity' },
        { key: 'durationMinutes', label: 'Duration', render: (activity) => `${activity.durationMinutes} min` },
        { key: 'caloriesBurned', label: 'Calories' },
        { key: 'activityDate', label: 'Date', render: (activity) => new Date(activity.activityDate).toLocaleDateString() },
        { key: 'notes', label: 'Notes' },
      ],
      description: 'Logged activities with duration, calories, dates, and notes.',
      endpointName: 'activities',
      title: 'Activities',
    },
  )
}

export default Activities