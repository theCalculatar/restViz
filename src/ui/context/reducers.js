import {
    act_removeHeaders,
    act_setCurrentRoute,
    act_setHeaders,
    act_setHistory,
    act_setName,
    act_setRoutes,
    act_toogleNav,
    act_toogleTheme

} from "./actions"

const setRoutesFn = (state, { type, payload }) => {
    switch (type) {

        case act_setRoutes:
            return { ...state, ...payload }

        default:
            return state
    }
}

const setNameFn = (state, { type, payload }) => {
    switch (type) {
        case act_setName:
            return { ...payload }

        default:
            return state
    }
}

const setHeadersFn = (state, { type, payload }) => {
    switch (type) {
        case act_setHeaders:
            return [...state, ...payload]
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

const setThemeFn = (state, type) => {
    switch (type) {
        case act_toogleTheme:
            if (state === 'dark') {
                state = 'light'
                document.documentElement.classList.remove('dark')
                document.documentElement.classList.add('light')
                localStorage.setItem('theme', 'light')
            } else {
                state = 'dark'
                document.documentElement.classList.remove('light')
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            }
            return state
        default:
            return state
    }
}

export {
    setRoutesFn,
    setNameFn,
    setHeadersFn,
    setHistoryFn,
    setNavStaeFn,
    setCurrentRouteFn,
    setThemeFn
}
