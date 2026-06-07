/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

const { Validator } = require('jsonschema')

const schema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      method: { type: 'string' },
      path: { type: 'string' },
      decription: { type: 'string' },
      notes: { type: 'string' },
    },
    required: ['method', 'path'],
  },
}

var validator = new Validator()

const isValid = (routes) => {
  try {
    const $routes = JSON.parse(routes)
    return validator.validate($routes, schema).valid
  } catch (error) {
    return false
  }
}

module.exports = { isValid }
