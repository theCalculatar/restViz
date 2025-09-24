import { setCurrentRoute, setHeaders, setHistory, setName, setRoutes, toogleNav } from "./actions"

const setRoutesFn = (state, { type, payload }) => {
    switch (type) {

        case setRoutes:
            return { ...state, ...payload }

        default:
            return state
    }
}

const setNameFn = (state, { type, payload }) => {
    switch (type) {
        case setName:
            return { ...payload }

        default:
            return state
    }
}

const setHeadersFn = (state, { type, payload }) => {
    switch (type) {
        case setHeaders:
            return { ...payload }

        default:
            return state
    }
}
const setHistoryFn = (state, { type, payload }) => {
    switch (type) {
        case setHistory:
            return { ...payload }
        default:
            return state
    }
}
const setNavStaeFn = (state, type) => {
    switch (type) {
        case toogleNav:
            return !state
        default:
            return state
    }
}
const setCurrentRouteFn = (state, { type, payload }) => {
    switch (type) {
        case setCurrentRoute:
            return { path: payload.path, method: payload.method }

        default:
            return state
    }
}

export { setRoutesFn, setNameFn, setHeadersFn, setHistoryFn, setNavStaeFn, setCurrentRouteFn }
