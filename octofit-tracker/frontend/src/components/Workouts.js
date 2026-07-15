import { createElement } from 'react'
import DataTablePage from './DataTablePage.js'

function Workouts() {
  return createElement(
    DataTablePage,
    {
      columns: [
        { key: 'name', label: 'Workout' },
        { key: 'category', label: 'Category' },
        { key: 'difficulty', label: 'Difficulty' },
        { key: 'durationMinutes', label: 'Duration', render: (workout) => `${workout.durationMinutes} min` },
        { key: 'targetMuscles', label: 'Target Muscles' },
        { key: 'instructions', label: 'Instructions' },
      ],
      description: 'Suggested workouts by category, difficulty, duration, and target muscles.',
      endpointName: 'workouts',
      title: 'Workouts',
    },
  )
}

export default Workouts