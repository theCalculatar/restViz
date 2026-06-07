# RestViz v4

`restViz` is a lightweight, zero-config API visualization and testing middleware for Express applications. It automatically discovers your Express route hierarchy and renders a beautiful, interactive web interface (built on Preact and Radix UI Themes) directly from your application.

Instead of manually maintaining Swagger/OpenAPI specifications, RestViz automatically discovers your application's route hierarchy and generates a live, interactive API workspace directly from your running code.

Built with Preact and Radix UI Themes, RestViz transforms your Express application into a self-documenting platform where developers can:

- Explore endpoints in real time
- Execute requests directly from the browser
- Test protected routes with custom headers
- Validate responses through automated test suites
- Monitor endpoint performance
- Document API behavior using metadata embedded alongside route definitions

The result is a faster development workflow with documentation that always reflects the current state of your codebase.

---

## What's New in v4?

`RestViz` v4 is a major upgrade over the original version (previously documented at `restviz.mintlify.app`). Key features in this release include:

- **Interactive API Sandbox**: A fully featured client built directly into your documentation UI. Send requests (GET, POST, PUT, DELETE, PATCH), customize request bodies, and view live results.
- **Dynamic Custom Headers**: Add, remove, and toggle custom headers (e.g., authorization tokens or client signatures) inside the Sandbox to test protected endpoints.
- **Integrated Test Suite Runner**: Organize and run automated test suites against your endpoints. Assert response status codes, performance limits, and payload schemas.
- **Live Performance Auditing**: Real-time execution timeout tracking using high-resolution millisecond calculations to benchmark API response times.
- **UI & Bug Fixes**: Fixes and Improvements to the UI and various bug fixes.
- **Rich Route Metadata**: Document expected responses, attach descriptions, and write behavior notes directly in your route registry.

---

## Installation

Install `restViz` using NPM:

```bash
npm install restviz
```

_Note: restViz v4 is optimized and tested for **Express v4**. Support for Express v5 is not guaranteed due to structural changes in router internals._

---

## Getting Started

Integrating `RestViz` is incredibly simple. Import the initializer and use it as an Express middleware:

```javascript
import express from 'express'
import { init } from 'restviz'

const app = express()

// Setup your routes...
app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }])
})

// Initialize restViz middleware (passes the express instance and options)
app.use(
  init(express, {
    title: 'My API Playground',
    theme: 'dark', // Choose 'light' or 'dark'
  })
)

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

Once your application starts, open your browser and navigate to the root route (`http://localhost:3000`) to explore your interactive API documentation.

---

## Configuration Options

You can customize `RestViz` by passing an options object to the `init()` method:

```typescript
interface Options {
  title?: string // Customize the web interface title (default: "API Documentation")
  theme?: 'light' | 'dark' // Initial theme for the interface (default: "light")
}
```

---

## Enriching Route Documentation

You can add rich metadata annotations to your API endpoints to make them easier to understand. `RestViz` automatically parses these fields and renders them in an organized tabbed view:

- **`description`**: A brief explanation of what the endpoint does.
- **`notes`**: Detailed usage information (e.g. permission requirements, rate limits, edge cases).
- **`responses`**: A key-value map describing expected HTTP response codes and their meanings.

### Metadata Schema Example:

```json
"responses": {
  "200": "Successfully fetched the requested resource.",
  "400": "Bad Request. Invalid parameter format.",
  "401": "Unauthorized. Missing or invalid authentication token.",
  "404": "Resource not found."
}
```

---

## Contributing

Contributions are welcome! If you encounter bugs, have feature requests, or want to contribute optimizations:

1.  **Fork the Repository**
2.  **Branch off of `development`**: Always create your feature/fix branch off of the `development` branch rather than `main`.
    ```bash
    git checkout -b feature/your-awesome-feature origin/development
    ```
3.  **Submit a Pull Request**: Target the `development` branch and provide a clear description of your changes.

For more details, check out [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

This project is licensed under the [MIT License](./LICENCE.txt). You are free to use, modify, and distribute this software with proper attribution.
