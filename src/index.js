const path = require('path')

const init = (express, options) => {
  const app = express()

  // Serve static files from the "public" folder
  app.use(express.static(path.join(__dirname, '../public')))

  // Set EJS as the view engine
  app.set('view engine', 'ejs')

  app.set('views', path.join(__dirname, './views'))

  const routes = []
  routes.length = 0
  const methods = ['get', 'post', 'put', 'delete']

  //custom app func that accepts meta data
  methods.forEach((method) => {
    const original = app[method]
    app[method] = (path, metadata = {}, ...handlers) => {
      if (path.startsWith('/')) {
        routes.push({ ...metadata, path, method })
        // could potentially add multiple middlewares to the stack
        app.use('/', (req, res, n) => {
          req.metadata = routes.slice(1)
          n()
        })
      }
      return original.apply(app, [path, ...handlers])
    }
  })

  // root route for listing endpoints
  app.get('/', {}, (req, res) => {
    // route (optional: serves index.html automatically)
    res.render('index', {
      title: options ? options.title : 'My API Documentation',
      theme: options ? options.theme : 'light',
      routes: req.metadata,
      page: 'home',
    })
  })
  return app
}

module.exports = { init }

// helping to document make api easier for you or other to understand your api
