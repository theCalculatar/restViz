import { useReducer } from 'preact/hooks'
import { createContext } from 'preact'

import { setHeadersFn, setHistoryFn, setNameFn, setRoutesFn } from './reducers'

const AppContext = createContext(null)

function Provider({ children }) {
  const [routes, setRoutes] = useReducer(setRoutesFn, [])
  const [name, setName] = useReducer(setNameFn, 'My API Documentation')
  const [headers, setHeaders] = useReducer(setHeadersFn, {})
  const [history, setHistory] = useReducer(setHistoryFn, [])
  return (
    <AppContext.Provider
      value={{
        routes,
        setRoutes,
        name,
        setName,
        headers,
        setHeaders,
        history,
        setHistory,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { Provider, AppContext }
