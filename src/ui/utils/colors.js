const methodColors = {
    GET: 'green',
    POST: 'blue',
    PUT: 'orange',
    DELETE: 'red',
    PATCH: 'purple'
}

const statusColor = {
    200: 'green',
    300: 'yellow',
    400: 'orange',
    500: 'red'
}

const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return statusColor[200]
    if (status >= 300 && status < 400) return statusColor[300]
    if (status >= 400 && status < 500) return statusColor[400]
    return 'red'
}

export { methodColors, statusColor, getStatusColor }