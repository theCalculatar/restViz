/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

const fs = require('fs')
const { isValid } = require('./stucture.js')

/**
 * Retrieves existing routes from the routes.json file.
 * If the file does not exist or contains invalid data, it is created.
 *
 * @returns {Array} An array of route objects stored in the routes.json file.
 */
const existingRoutes = () => {
  try {
    let routes = fs.readFileSync('routes.json', 'utf-8')
    if (isValid(routes)) {
      return JSON.parse(routes) // Return parsed routes if valid
    }
  } catch (error) {
    createFile() // Create the file if it doesn't exist or there's an error
    return []
  }
}

/**
 * Creates an empty routes.json file.
 * Initializes the file with an empty array to store route data.
 */
const createFile = () => {
  fs.writeFileSync('routes.json', '[]', 'utf8')
}

/**
 * Writes an array of routes to the routes.json file.
 *
 * @param {Array} routes - An array of route objects to be stored.
 */
const addRoutes = (routes) => {
  fs.writeFileSync('routes.json', JSON.stringify(routes, null, 2))
}

/**
 * Updates the routes.json file by synchronizing with appRoutes.
 * The order of routes in the file will match the order in the code.
 *
 * @param {Array} appRoutes - An array of current route objects to sync with.
 * @returns {Array} The updated list of routes after synchronization.
 */
const updateRoutes = (appRoutes) => {
  const currentRoutes = existingRoutes()

  // Compare the current routes and app routes
  const currentSet = new Set(currentRoutes.map((r) => `${r.method}:${r.path}`))
  const appSet = new Set(appRoutes.map((r) => `${r.method}:${r.path}`))

  const removed = currentRoutes.find(
    (r) => !appSet.has(`${r.method}:${r.path}`)
  )
  const added = appRoutes.find((r) => !currentSet.has(`${r.method}:${r.path}`))

  const hasOrderChanged =
    JSON.stringify(currentRoutes) !== JSON.stringify(appRoutes)

  if (removed || added || hasOrderChanged) {
    addRoutes(appRoutes) // Overwrite with exact appRoutes in defined order
  }

  return appRoutes
}

module.exports = { updateRoutes }
