import { useReducer, useEffect } from 'preact/hooks'
import { createContext, ComponentChildren } from 'preact'

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

export const AppContext = createContext<any>(null)

interface ProviderProps {
  children: ComponentChildren
}

export function Provider({ children }: ProviderProps) {
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
    saved.theme = localStorage.getItem('theme') || saved.theme || 'light'
    return saved
  })

  const [Frag, setDialog] = useReducer(setDialogFn, null)

  const [suites, setSuite] = useReducer(setSuiteFn, [], () => {
    const saved = localStorage.getItem('suites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('suites', JSON.stringify(suites))
  }, [suites])

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
