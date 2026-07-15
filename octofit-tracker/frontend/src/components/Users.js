import { createElement } from 'react'
import DataTablePage from './DataTablePage.js'

function Users() {
  return createElement(
    DataTablePage,
    {
      columns: [
        { key: 'username', label: 'Username' },
        { key: 'displayName', label: 'Name' },
        {
          key: 'email',
          label: 'Email',
          render: (user) => createElement('a', { className: 'link-primary', href: `mailto:${user.email}` }, user.email),
        },
        { key: 'age', label: 'Age' },
        { key: 'fitnessGoal', label: 'Fitness Goal' },
        { key: 'team', label: 'Team' },
      ],
      description: 'Profiles, teams, and goals pulled from the Octofit REST API.',
      endpointName: 'users',
      title: 'Users',
    },
  )
}

export default Users