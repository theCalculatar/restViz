/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

import { ExtractedRoute } from '../utils/routeManager'

/**
 * Extracts all registered routes from an Express router, including nested routes.
 *
 * @param {any} router - The Express router or app instance to extract routes from.
 * @param {string} [basePath=''] - The base path for nested routes (used during recursion).
 * @returns {ExtractedRoute[]} An array of route objects, each containing method and path.
 */
export const routeExtractor = (router: any, basePath = ''): ExtractedRoute[] => {
  const routes: ExtractedRoute[] = []

  if (!router || !router.stack) {
    return routes
  }

  // Iterate through each layer in the router's stack
  router.stack.forEach((layer: any) => {
    if (layer.route) {
      // Direct route found
      const path = basePath + layer.route.path
      const method = Object.keys(layer.route.methods)[0].toUpperCase() // Get the HTTP method
      routes.push({ method, path }) // Add the route to the list
    } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
      // Nested router (like Express.Router)

      let nestedBasePath = layer.path || ''

      // Fallback: extract from regexp if layer.path missing
      if (!nestedBasePath && layer.regexp) {
        nestedBasePath = layer.regexp.source
          .replace(/\\\//g, '/') // Replace escaped slashes (\/) with actual slashes (/)
          .replace(/\^|\$\|\(\?=\.\*\)\?/g, '') // Remove start/end regex markers and lookaheads
          .replace(/\/\?\(\?=\/\|\$\)/g, '') // Clean up optional trailing slash pattern
          .replace(/\/\?$/, '') // Remove trailing optional slash
      }

      if (nestedBasePath && !nestedBasePath.startsWith('/')) {
        nestedBasePath = '/' + nestedBasePath
      }

      // Recursively extract nested routes and merge them into the main list
      routes.push(...routeExtractor(layer.handle, nestedBasePath))
    }
  })

  // Return the final list of extracted routes
  return routes
}
