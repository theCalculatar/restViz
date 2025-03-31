/**
 * Extracts all registered routes from an Express router, including nested routes.
 *
 * This function iterates through the router's stack to identify both direct routes
 * and nested routers (like instances of Express.Router). It recursively processes
 * nested routers to extract their routes as well. The extracted routes include the
 * HTTP method (GET, POST, etc.) and the route path.
 *
 * @param {object} router - The Express router or app instance to extract routes from.
 * @param {string} [basePath=''] - The base path for nested routes (used during recursion).
 * @returns {Array<{ method: string, path: string }>} An array of route objects, each containing:
 *   - method: The HTTP method (e.g., "GET", "POST").
 *   - path: The full path of the route.
 */
const routeExtractor = (router, basePath = '') => {
  const routes = []

  // Iterate through each layer in the router's stack
  router.stack.forEach((layer) => {
    if (layer.route) {
      // Direct route found
      const path = basePath + layer.route.path
      const method = Object.keys(layer.route.methods)[0].toUpperCase() // Get the HTTP method
      routes.push({ method, path }) // Add the route to the list
    } else if (layer.name === 'router' && layer.handle.stack) {
      // Nested router (like Express.Router)

      // Extract the base path from the nested router's regex pattern
      const nestedBasePath = layer.regexp.source
        .replace(/\\\//g, '/') // Replace escaped slashes (\/) with actual slashes (/)
        .replace(/\^|\$\|\(\?=\.\*\)\?/g, '') // Remove start/end regex markers and lookaheads
        .replace(/\/\?\(\?=\/\|\$\)/g, '') // Clean up optional trailing slash pattern
        .replace(/\/\?$/, '') // Remove trailing optional slash

      // Recursively extract nested routes and merge them into the main list
      routes.push(...routeExtractor(layer.handle, nestedBasePath))
    }
  })

  // Return the final list of extracted routes
  return routes
}

module.exports = { routeExtractor }
