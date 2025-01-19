# restViz

`restViz` is a lightweight library designed to create a dynamic web interface for Express applications. It automatically lists all defined API routes, providing an interactive interface to explore and document your API.

## Features

- **Automatic Route Discovery**: Detects and lists all routes defined in your Express app.
- **Dynamic API Documentation**: No need for manually updating documentation as your app evolves.
- **Seamless Integration**: Works seamlessly with Express without additional configurations.

---

## Installation

Install `restViz` using NPM:

```bash
npm install restviz
```

## How It Works

- Simply replace your express() initialization with restViz.init(express).
- Define your routes as you normally would with Express.
- Run your app, and restViz will generate a dynamic web interface listing all your routes.

Example Output:
After starting your app, visit `http://localhost:your-port-here` in your browser. You’ll see:

A list of all defined routes:

```
GET /
PUT /
POST /
```

Configuration Options
You can customize restViz by passing options to restViz.init():

```js
Copy code
const options = {
  title: "My API Documentation", // Set a custom title for the web interface
  theme: "dark",                 // Choose between "light" or "dark" theme
};
const app = restViz.init(express, options);
```

Available Options
`title`: Customizes the web interface title (`default: "API Documentation"`).
`theme`: Chooses the theme for the interface (`default: "light"`)

## Addtional usage

```js
app.get(
  '/user/:id',
  {
    description: 'Update user details',
    notes:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias totam exercitationem recusandae sit similique eos, consectetur illum sed debitis quibusdam nostrum distinctio at beatae eligendi quam! Blanditiis dicta repellat voluptate!',
    responses: { 201: 'User details', 404: 'User not found' },
  },
  (req, res) => {
    res.json({ title: 'This is a title' })
  }
)
```

Metadata Details

- `Description`: Explains what the endpoint does (e.g., "Update user details").

- `Notes`: Includes any extra details, such as warnings or extended explanations.

- `Responses`: Maps HTTP status codes to their descriptions (e.g., 201: User details).

## Contributing

Contributions are welcome! If you find any bugs or have feature requests, feel free to open an issue or submit a pull request.
