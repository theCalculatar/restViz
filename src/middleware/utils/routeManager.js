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
 * Updates the routes.json file with new routes that are not already present.
 * Compares existing routes with the new routes and adds only unique ones.
 *
 * @param {Array} appRoutes - An array of new route objects to be merged with existing routes.
 * @returns {Array} The updated list of routes after merging.
 */
const updateRoutes = (appRoutes) => {
  const newRoutes = existingRoutes()
  let routesChanged = false;

  appRoutes.forEach((route) => {
    const routeExist = newRoutes.find(
      (route_) => route_.path === route.path && route_.method === route.method
    )
    if (!routeExist) {
      routesChanged = true; // Mark as changed if a new route is added
      newRoutes.push(route) // Add only if the route doesn't already exist
    }
  })

  if (routesChanged) {
    addRoutes(newRoutes)
  }

  return newRoutes
}

module.exports = { updateRoutes }
