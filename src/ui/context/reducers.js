import { setHeaders, setHistory, setName, setRoutes } from "./actions"

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

export { setRoutesFn, setNameFn, setHeadersFn, setHistoryFn }
