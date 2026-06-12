import { Suite } from '../types/suites'
import {
  act_removeHeaders,
  act_setConfig,
  act_setConfigtTheme,
  act_setCurrentRoute,
  act_setHeaders,
  act_setHistory,
  act_setRoutes,
  act_toogleNav,
  act_openNav,
  act_closeNav,
  act_dismissDialog,
  act_setDialog,
  act_addSuit,
  act_updateSuit,
  act_addSuitTest,
  act_editSuitTest,
  act_deleteSuit,
  act_deleteSuitTest,
} from './actions'

interface Action {
  type: string
  payload?: any
}

export const setRoutesFn = (state: any[], { type, payload }: Action): any[] => {
  switch (type) {
    case act_setRoutes:
      return [...payload]

    default:
      return state
  }
}

export const setHeadersFn = (state: any[], { type, payload }: Action): any[] => {
  switch (type) {
    case act_setHeaders:
      const headersMap = new Map([...payload].map((item) => [item.key, item]))
      const headers = [...headersMap.values()]
      localStorage.setItem('headers', JSON.stringify(headers))
      return headers
    case act_removeHeaders:
      return [
        ...state.filter(
          (header) => header.key !== '' && header.value !== payload.key
        ),
      ]

    default:
      return state
  }
}

export const setHistoryFn = (state: any, { type, payload }: Action): any => {
  switch (type) {
    case act_setHistory:
      return { ...payload }
    default:
      return state
  }
}

export const setNavStaeFn = (state: boolean, type: string): boolean => {
  switch (type) {
    case act_closeNav:
      return false
    case act_openNav:
      return true
    case act_toogleNav:
      return !state
    default:
      return state
  }
}

export const setCurrentRouteFn = (state: any, { type, payload }: Action): any => {
  switch (type) {
    case act_setCurrentRoute:
      return { path: payload.path, method: payload.method }

    default:
      return state
  }
}

export const setConfigFn = (state: any, { type, payload }: Action): any => {
  switch (type) {
    case act_setConfig:
      return { ...state, ...payload }
    case act_setConfigtTheme:
      if (state.theme === 'dark') {
        state.theme = 'light'
        document.documentElement.classList.remove('dark')
        document.documentElement.classList.add('light')
        localStorage.setItem('theme', 'light')
      } else {
        state.theme = 'dark'
        document.documentElement.classList.remove('light')
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      }
      return { ...state }
    default:
      return state
  }
}

export const setDialogFn = (state: any, { type, payload }: Action): any => {
  switch (type) {
    case act_dismissDialog:
      return null
    case act_setDialog:
      return payload
    default:
      return state
  }
}

export const setSuiteFn = (state: Suite[], { type, payload }: Action): Suite[] => {
  let suites: Suite[]
  switch (type) {
    case act_addSuit:
      const id = btoa(Date.now().toString())
      return [...state, { ...payload, id, tests: [] }]

    case act_updateSuit:
      suites = state.map((suite) => {
        if (suite.id === payload.id) {
          suite.title = payload.title
          suite.description = payload.description
        }
        return suite
      })
      return [...suites]

    case act_addSuitTest:
      suites = state.map((suite) => {
        if (suite.id === payload.id) {
          suite.tests = [...suite.tests, payload.test]
        }
        return suite
      })
      return [...suites]

    case act_editSuitTest:
      suites = state.map((suite) => {
        if (suite.id === payload.id) {
          const tests = suite.tests.map((test) => {
            if (test.id === payload.test.id) {
              test.title = payload.test.title
              test.description = payload.test.description
              test.assertions = payload.test.assertions
              test.method = payload.test.method
              test.endpoint = payload.test.endpoint
              test.body = payload.test.body
            }
            return test
          })
          suite.tests = [...tests]
        }
        return suite
      })
      return [...suites]

    case act_deleteSuit:
      return state.filter((suite) => suite.id !== payload.id)

    case act_deleteSuitTest:
      return state.map((suite) => {
        if (suite.id === payload.id) {
          suite.tests = suite.tests.filter((test) => test.id !== payload.testId)
        }
        return suite
      })

    default:
      return state
  }
}
