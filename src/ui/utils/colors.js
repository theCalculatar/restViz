const methodColors = {
    GET: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    POST: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    PUT: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    DELETE: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    PATCH: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400'
}

const statusColor = {
    200: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    300: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    400: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400',
    500: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
}

const getStatusColor = (status) => {
    if (status >= 200 && status < 300) return statusColor[200]
    if (status >= 300 && status < 400) return statusColor[300]
    if (status >= 400 && status < 500) return statusColor[400]
    return statusColor[500]
}

export { methodColors, statusColor, getStatusColor }