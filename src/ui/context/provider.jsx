import { useReducer } from 'preact/hooks'
import { createContext } from 'preact'

import {
  setConfigFn,
  setCurrentRouteFn,
  setDialogFn,
  setHeadersFn,
  setHistoryFn,
  setNavStaeFn,
  setRoutesFn,
  setSuiteFn,
} from './reducers'
// @ts-ignore

const AppContext = createContext(null)

function Provider({ children }) {
  const [routes, setRoutes] = useReducer(setRoutesFn, [], () => {
    // @ts-ignore
    return window.__routes__ || []
  })

  const [headers, setHeaders] = useReducer(setHeadersFn, [], () => {
    const saved = localStorage.getItem('headers')
    return saved ? JSON.parse(saved) : [{ key: '', value: '' }]
  })

  const [history, setHistory] = useReducer(setHistoryFn, [], () => {
    const saved = localStorage.getItem('history')
    return saved ? JSON.parse(saved) : []
  })

  const [isNavOpen, toogleNav] = useReducer(setNavStaeFn, false)

  const [activeRoute, setCurrentRoute] = useReducer(setCurrentRouteFn, {})

  const [config, setConfig] = useReducer(setConfigFn, {}, () => {
    // @ts-ignore
    const saved = window.__config__ || {}
    saved.theme = localStorage.getItem('theme') || config.theme
    return saved
  })

  const [Frag, setDialog] = useReducer(setDialogFn, null)

  const [suites, setSuite] = useReducer(setSuiteFn, [])

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
        Frag,
        setDialog,
        suites,
        setSuite,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { Provider, AppContext }
