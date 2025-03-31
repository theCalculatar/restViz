const path = require('path')
const { updateRoutes } = require('./utils')
const { routeExtractor } = require('./lib')

const init = (express, options) => {
  let routeExtracted = false
  routes = []

  return (request, response, next) => {
    if (!routeExtracted) {
      const app = request.app
      // Serve static files from the "public" folder
      app.use(express.static(path.join(__dirname, '../public')))

      // Set EJS as the view engine
      app.set('view engine', 'ejs')

      app.set('views', path.join(__dirname, './views'))

      routes = updateRoutes(routeExtractor(app._router)) // Extract all registered routes

      // Root route for listing endpoints
      app.get('/', (req, res) => {
        res.render('index', {
          title: options ? options.title : 'My API Documentation',
          theme: options ? options.theme : 'light',
          routes,
          page: 'home',
        })
      })
      routeExtracted = true
    }
    next()
  }
}

module.exports = { init }

// Helping to document and make APIs easier to understand
