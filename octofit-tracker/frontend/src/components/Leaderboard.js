import { createElement } from 'react'
import DataTablePage from './DataTablePage.js'

function Leaderboard() {
  return createElement(
    DataTablePage,
    {
      columns: [
        { key: 'rank', label: 'Rank' },
        { key: 'username', label: 'User' },
        { key: 'team', label: 'Team' },
        { key: 'totalMinutes', label: 'Total Minutes' },
        { key: 'totalCalories', label: 'Total Calories' },
        { key: 'points', label: 'Points' },
      ],
      description: 'Competitive rankings by minutes, calories, and points.',
      endpointName: 'leaderboard',
      title: 'Leaderboard',
    },
  )
}

export default Leaderboard