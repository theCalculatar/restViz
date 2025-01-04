const path = require('path')

const init = (express, options) => {
  const app = express()

  // Serve static files from the "public" folder
  app.use(express.static(path.join(__dirname, '../public')))

  // Set EJS as the view engine
  app.set('view engine', 'ejs')

  app.set('views', path.join(__dirname, './views'))

  // root route for listing endpoints
  app.get('/', (req, res) => {
    // route (optional: serves index.html automatically)
    const routes = []
    req.app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        // Routes registered directly on the app
        routes.push({
          method: Object.keys(middleware.route.methods)[0],
          path: middleware.route.path,
        })
      }
    })

    res.render('index', {
      title: options ? options.title : 'My API Documentation',
      theme: options ? options.theme : 'light',
      routes: routes,
      page: 'home',
    })
  })
  return app
}

module.exports = { init }

// helping to document make api easier for you or other to understand your api
