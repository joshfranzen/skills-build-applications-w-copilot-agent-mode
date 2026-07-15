import { createElement } from 'react'
import DataTablePage from './DataTablePage.js'

function Teams() {
  return createElement(
    DataTablePage,
    {
      columns: [
        { key: 'name', label: 'Team' },
        { key: 'mascot', label: 'Mascot' },
        { key: 'coach', label: 'Coach' },
        { key: 'members', label: 'Members' },
        { key: 'weeklyGoalMinutes', label: 'Weekly Goal' },
      ],
      description: 'Team rosters, coaches, mascots, and weekly movement goals.',
      endpointName: 'teams',
      title: 'Teams',
    },
  )
}

export default Teams