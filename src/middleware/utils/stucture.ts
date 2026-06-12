/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

import { Validator } from 'jsonschema'

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

const validator = new Validator()

export const isValid = (routes: string): boolean => {
  try {
    const $routes = JSON.parse(routes)
    return validator.validate($routes, schema).valid
  } catch (error) {
    return false
  }
}
