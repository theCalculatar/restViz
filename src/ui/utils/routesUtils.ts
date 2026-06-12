export const groupRoutesFn = (routes: any[]): Map<string, any[]> => {
    const _routes = new Map<string, any[]>()
    for (const route of routes) {
        const path = '/' + route.path.split('/')[1]
        const group = _routes.get(path)
        route.description ??= 'Not provided!'
        if (!group) {
            _routes.set(path, [route])
        } else {
            group.push(route)
            _routes.set(path, group)
        }
    }
    return _routes
}
