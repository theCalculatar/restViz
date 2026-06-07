const routes = [
  {
    id: '1',
    method: 'GET',
    path: '/users',
    description: 'Retrieve a list of all users',
    notes:
      'This endpoint supports pagination. Use ?page and ?limit parameters.',
    group: 'Users',
    url: 'R0VUL3VzZXJz',
    responses: {
      200: 'Success',
      400: 'Bad request',
      401: 'Unauthorized',
    },
  },
  {
    id: '2',
    method: 'POST',
    path: '/users',
    description: 'Create a new user',
    notes:
      'Required fields: name, email. Password will be auto-generated if not provided.',
    group: 'Users',
    url: 'UE9TVC91c2Vycw==',
    body: {
      name: 'John Doe',
      email: 'email',
      password: 'password',
    },
    responses: {
      200: 'Success',
      400: 'Bad request',
      401: 'Unauthorized',
    },
  },
  {
    id: '3',
    method: 'GET',
    path: '/users/{id}',
    description: 'Get a specific user by ID',
    notes: 'Returns 404 if user not found.',
    group: 'Users',
    url: 'R0VUL3VzZXJzL3tpZH0=',
  },
  {
    id: '4',
    method: 'PUT',
    path: '/users/{id}',
    description: 'Update a user completely',
    notes: 'All fields are required for PUT requests.',
    group: 'Users',
    url: 'UFVUL3VzZXJzL3tpZH0=',
  },
  {
    id: '5',
    method: 'PATCH',
    path: '/users/{id}',
    description: 'Partially update a user',
    notes: 'Only provided fields will be updated.',
    group: 'Users',
    url: 'UEFUQ0gvdXNlcnMve2lkfQ==',
  },
  {
    id: '6',
    method: 'DELETE',
    path: '/users/{id}',
    description: 'Delete a user',
    notes: 'This action cannot be undone. Use with caution.',
    group: 'Users',
    url: 'REVMRVRFL3VzZXJzL3tpZH0=',
  },
  {
    id: '7',
    method: 'GET',
    path: '/posts',
    description: 'Get all posts',
    notes: 'Supports filtering by author, category, and date range.',
    group: 'Posts',
    url: 'R0VUL3Bvc3Rz',
  },
  {
    id: '8',
    method: 'POST',
    path: '/posts',
    description: 'Create a new post',
    notes: 'Requires authentication. Author will be set to current user.',
    group: 'Posts',
    url: 'UE9TVC9wb3N0cw==',
  },
  {
    id: '9',
    method: 'GET',
    path: '/auth/login',
    description: 'Authenticate user',
    notes: 'Returns JWT token for subsequent requests.',
    group: 'Authentication',
    url: 'R0VUL2F1dGgvbG9naW4=',
  },
  {
    id: '10',
    method: 'POST',
    path: '/auth/logout',
    description: 'Logout user',
    notes: 'Invalidates the current session token.',
    group: 'Authentication',
    url: 'UE9TVC9hdXRoL2xvZ291dA==',
  },
]

const config = {
  version: '1.0.0',
  hideEmpty: true,
  name: 'My Restaurant API',
  groupBy: 'controller', // "tag" | "path"
  description: 'Api monitoring and documentation tool for RESTful services.',
  environment: 'DEV',

  // UI / Theme
  theme: 'light', // "light" | "dark"
  accentColor: 'blue',

  // Interactive API Testing
  enableTryItOut: true,
  timeout: 5000,
  retries: 3,

  // Advanced
  jsonEndpoint: '/docs.json',
  baseUrl: 'http://localhost:3000',
}

export { routes, config }
