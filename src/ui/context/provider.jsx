import { useReducer } from 'preact/hooks'
import { createContext } from 'preact'

import {
  setConfigFn,
  setCurrentRouteFn,
  setHeadersFn,
  setHistoryFn,
  setNavStaeFn,
  setRoutesFn,
} from './reducers'

const AppContext = createContext(null)

function Provider({ children }) {
  const [routes, setRoutes] = useReducer(setRoutesFn, [
    {
      id: '1',
      method: 'GET',
      path: '/users',
      description: 'Retrieve a list of all users',
      notes:
        'This endpoint supports pagination. Use ?page and ?limit parameters.',
      group: 'Users',
    },
    {
      id: '2',
      method: 'POST',
      path: '/users',
      description: 'Create a new user',
      notes:
        'Required fields: name, email. Password will be auto-generated if not provided.',
      group: 'Users',
    },
    {
      id: '3',
      method: 'GET',
      path: '/users/{id}',
      description: 'Get a specific user by ID',
      notes: 'Returns 404 if user not found.',
      group: 'Users',
    },
    {
      id: '4',
      method: 'PUT',
      path: '/users/{id}',
      description: 'Update a user completely',
      notes: 'All fields are required for PUT requests.',
      group: 'Users',
    },
    {
      id: '5',
      method: 'PATCH',
      path: '/users/{id}',
      description: 'Partially update a user',
      notes: 'Only provided fields will be updated.',
      group: 'Users',
    },
    {
      id: '6',
      method: 'DELETE',
      path: '/users/{id}',
      description: 'Delete a user',
      notes: 'This action cannot be undone. Use with caution.',
      group: 'Users',
    },
    {
      id: '7',
      method: 'GET',
      path: '/posts',
      description: 'Get all posts',
      notes: 'Supports filtering by author, category, and date range.',
      group: 'Posts',
    },
    {
      id: '8',
      method: 'POST',
      path: '/posts',
      description: 'Create a new post',
      notes: 'Requires authentication. Author will be set to current user.',
      group: 'Posts',
    },
    {
      id: '9',
      method: 'GET',
      path: '/auth/login',
      description: 'Authenticate user',
      notes: 'Returns JWT token for subsequent requests.',
      group: 'Authentication',
    },
    {
      id: '10',
      method: 'POST',
      path: '/auth/logout',
      description: 'Logout user',
      notes: 'Invalidates the current session token.',
      group: 'Authentication',
    },
  ])
  const [headers, setHeaders] = useReducer(setHeadersFn, [
    { key: '', value: '' },
  ])
  const [history, setHistory] = useReducer(setHistoryFn, [])
  const [isNavOpen, toogleNav] = useReducer(setNavStaeFn, false)
  const [activeRoute, setCurrentRoute] = useReducer(setCurrentRouteFn, {})
  const [config, setConfig] = useReducer(setConfigFn, {
    version: '1.0.0',
    hideEmpty: true,
    name: 'My Service API',
    groupBy: 'controller', // "tag" | "path"
    description: 'Api monitoring and documentation tool for RESTful services.',

    // UI / Theme
    theme: 'dark', // "light" | "dark"
    accentColor: 'blue',

    // Interactive API Testing
    enableTryItOut: true,
    timeout: 5000,
    retries: 3,

    // Advanced
    jsonEndpoint: '/docs.json',
    baseUrl: 'http://localhost:3000',
  })

  return (
    <AppContext.Provider
      value={{
        routes,
        setRoutes,

        headers,
        setHeaders,
        history,
        setHistory,
        isNavOpen,
        toogleNav,
        activeRoute,
        setCurrentRoute,
        config,
        setConfig,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { Provider, AppContext }
