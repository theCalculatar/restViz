const fs = require('fs')

const { isValid } = require('./stucture.js')

const existingRoutes = () => {
  try {
    let routes = fs.readFileSync('routes.json', 'utf-8')
    if (isValid(routes)) {
      return JSON.parse(routes)
    }
  } catch (error) {
    createFile()
    return []
  }
}

const createFile = () => {
  fs.writeFileSync('routes.json', '[]', 'utf8')
}

const addRoutes = (routes) => {
  fs.writeFileSync('routes.json', JSON.stringify(routes))
}

module.exports = { existingRoutes, addRoutes }
