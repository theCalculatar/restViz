const path = require('path')

const init = (express, options) => {
  const app = express()

  // Serve static files from the "public" folder
  app.use(express.static(path.join(__dirname, '../public')))

  // Set EJS as the view engine
  app.set('view engine', 'ejs')

  app.set('views', path.join(__dirname, './views'))

  const routes = []
  const methods = ['get', 'post', 'put', 'delete']

  // Helper function to extract routes, including nested ones
  const extractRoutes = (router, basePath = '') => {
    router.stack.forEach((layer) => {
      if (layer.route) {
        // Direct route
        const path = basePath + layer.route.path
        const method = Object.keys(layer.route.methods)[0].toUpperCase()
        const hasRoute = routes.find((route) => route.path === path)
        if (hasRoute) {
          return
        }
        routes.push({ method, path })
      } else if (layer.name === 'router' && layer.handle.stack) {
        const nestedBasePath = layer.regexp.source
          .replace(/\\\//g, '/') // Replace escaped slashes
          .replace(/\^|\$\|\(\?=\.\*\)\?/g, '') // Remove start/end regex markers and lookaheads
          .replace(/\/\?\(\?=\/\|\$\)/g, '') // Remove annoying "/?(?=/|$)" pattern
          .replace(/\/\?$/, '')

        extractRoutes(layer.handle, nestedBasePath)
      }
    })
  }

  // Custom app function that supports metadata
  methods.forEach((method) => {
    const original = app[method]
    app[method] = function (...args) {
      if (typeof args[1] === 'object' && !Array.isArray(args[1])) {
        // Option 1: path, metadata, handlers
        const [path, metadata = {}, ...handlers] = args
        if (path.startsWith('/')) {
          routes.push({ method: method.toUpperCase(), path, ...metadata })
        }
        return original.call(app, path, ...handlers)
      } else {
        // Option 2: path, handlers (no metadata)
        const [path, ...handlers] = args
        if (path.startsWith('/')) {
          routes.push({ method: method.toUpperCase(), path })
        }
        return original.call(app, path, ...handlers)
      }
    }
  })

  // Middleware to extract all routes, including from Express.Router()
  app.use((req, res, next) => {
    extractRoutes(app._router) // Extract all registered routes
    next()
  })

  // Root route for listing endpoints
  app.get('/', (req, res) => {
    res.render('index', {
      title: options ? options.title : 'My API Documentation',
      theme: options ? options.theme : 'light',
      routes,
      page: 'home',
    })
  })

  return app
}

module.exports = { init }

// Helping to document and make APIs easier to understand
