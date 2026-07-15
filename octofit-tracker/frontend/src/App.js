import { createElement } from 'react'
import { BrowserRouter, NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.js'
import Leaderboard from './components/Leaderboard.js'
import Teams from './components/Teams.js'
import Users from './components/Users.js'
import Workouts from './components/Workouts.js'

function App() {
  const navClass = ({ isActive }) => `nav-link px-3 rounded-pill${isActive ? ' active' : ''}`

  return createElement(
    BrowserRouter,
    null,
    createElement(
      'div',
      { className: 'app-shell' },
      createElement(
        'nav',
        { className: 'navbar navbar-expand-lg navbar-dark bg-dark shadow-sm' },
        createElement(
          'div',
          { className: 'container py-2' },
          createElement(NavLink, { className: 'navbar-brand fw-bold', to: '/users' }, 'Octofit Tracker'),
          createElement(
            'div',
            { className: 'navbar-nav flex-row flex-wrap gap-2 ms-lg-auto' },
            createElement(NavLink, { className: navClass, to: '/users' }, 'Users'),
            createElement(NavLink, { className: navClass, to: '/teams' }, 'Teams'),
            createElement(NavLink, { className: navClass, to: '/activities' }, 'Activities'),
            createElement(NavLink, { className: navClass, to: '/leaderboard' }, 'Leaderboard'),
            createElement(NavLink, { className: navClass, to: '/workouts' }, 'Workouts'),
          ),
        ),
      ),
      createElement(
        'main',
        { className: 'container py-4' },
        createElement(
          Routes,
          null,
          createElement(Route, {
            path: '/',
            element: createElement(Navigate, { to: '/users', replace: true }),
          }),
          createElement(Route, { path: '/users', element: createElement(Users) }),
          createElement(Route, { path: '/teams', element: createElement(Teams) }),
          createElement(Route, { path: '/activities', element: createElement(Activities) }),
          createElement(Route, { path: '/leaderboard', element: createElement(Leaderboard) }),
          createElement(Route, { path: '/workouts', element: createElement(Workouts) }),
        ),
      ),
    ),
  )
}

export default App