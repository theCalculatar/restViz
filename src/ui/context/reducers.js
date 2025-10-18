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
    act_addSuit
} from "./actions"

const setRoutesFn = (state, { type, payload }) => {
    switch (type) {

        case act_setRoutes:
            return [...payload]

        default:
            return state
    }
}

const setHeadersFn = (state, { type, payload }) => {
    switch (type) {
        case act_setHeaders:
            const headersMap = new Map([...payload].map(item => [item.key, item]));
            const headers = [...headersMap.values()]
            localStorage.setItem('headers', JSON.stringify(headers))
            return headers
        case act_removeHeaders:
            return [...state.filter((header) => header.key !== '' && header.value !== payload.key)]

        default:
            return state
    }
}
const setHistoryFn = (state, { type, payload }) => {
    switch (type) {
        case act_setHistory:
            return { ...payload }
        default:
            return state
    }
}
const setNavStaeFn = (state, type) => {
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
const setCurrentRouteFn = (state, { type, payload }) => {
    switch (type) {
        case act_setCurrentRoute:
            return { path: payload.path, method: payload.method }

        default:
            return state
    }
}


const setConfigFn = (state, { type, payload }) => {
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

const setDialogFn = (state, { type, payload }) => {
    switch (type) {
        case act_dismissDialog:
            return null
        case act_setDialog:
            return payload
        default:
            return state
    }
}

const setSuiteFn = (state, { type, payload }) => {
    switch (type) {
        case act_addSuit:
            const id = btoa(Date.now().toString())
            return [...state, { ...payload, id, tests: [3, 23, 3] }]

        default:
            break;
    }
}

export {
    setRoutesFn,
    setHeadersFn,
    setHistoryFn,
    setNavStaeFn,
    setCurrentRouteFn,
    setConfigFn,
    setDialogFn,
    setSuiteFn
}
