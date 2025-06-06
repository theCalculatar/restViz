/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

const app = document.querySelector('#app')
const container = document.getElementById('routes-data')
const cleanedData = container.dataset.mydata

const myData = JSON.parse(cleanedData.replace(/[()]/g, '')) // just for retriving data, ejs gave me hell trying to pass data direcly :)

let currentRoute = {}

function setPath(path, method) {
  currentRoute = myData.filter(
    (route) => route.method == method && route.path == path
  )[0]
}

const routes = {
  '/': renderHomePage,
  '/home': renderRoutePage,
}

// Routing function
function router() {
  const path = window.location.hash.slice(1) || '/'

  const render = routes[path] || (() => renderNotFoundPage())
  render()
}

// Event listeners for route changes
window.addEventListener('hashchange', router)
window.addEventListener('load', router)

// page being renderd in html file
function renderNotFoundPage() {
  const app = document.getElementById('app')
  const routes = document.getElementById('routes')
  app.classList.remove('hide')
  routes.classList.add('hide')
  app.innerHTML = `
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: linear-gradient(to right, #a1c4fd, #c2e9fb); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1 style="font-size: 8rem; margin: 0; color: #888;">404</h1>
      <h2 style="font-size: 2rem; color: #444; margin: 10px 0;">Oops! This endpoint wandered off.</h2>
      <p style="font-size: 1rem; color: #555; max-width: 400px; margin-bottom: 30px;">
        Looks like the API route you are trying to visualize does not exist or is not mapped in Express. Try refreshing or double-checking your endpoints.
      </p>
      <div style="display: flex; gap: 10px;">
        <button onclick="location.hash='/'" style="padding: 10px 20px; font-size: 1rem; border: none; border-radius: 8px; background-color: #4f9deb; color: white; cursor: pointer;">Return Home</button>
        <button onclick="window.open('https://github.com/theCalculatar/restViz/issues/new', '_blank')" style="padding: 10px 20px; font-size: 14px; background-color: #e0e0e0; color: #333; border: none; border-radius: 6px; cursor: pointer;">Report Issue</button>
      </div>
    </div>
  `
}

function renderHomePage() {
  const routes = document.getElementById('routes')
  const app = document.getElementById('app')
  routes.classList.remove('hide')
  app.classList.add('hide')
}

function getStatus() {
  let status = ''
  for (const statusCode in currentRoute?.responses) {
    status += `<tr>
      <td>${statusCode}</td>
      <td>${currentRoute?.responses[statusCode]}</td>
    </tr>`
  }
  return status
}

function renderRoutePage() {
  const routes = document.getElementById('routes')
  const app = document.getElementById('app')
  routes.classList.add('hide')
  app.classList.remove('hide')

  app.innerHTML = currentRoute?.path
    ? `
    <div class="">
      <a class="btn primary" href="#/">Back </a>

      <div class="notes">
        <h3>Implementation notes</h3>
        <p>${currentRoute?.notes || ''}</p>
      </div>

      <li class="route-item">
        <span class="method ${currentRoute.method.toLowerCase()} ">
          ${currentRoute.method.toUpperCase()}</span
        >
        <span class="path">${currentRoute.path}</span>
        <span class="">${currentRoute?.description || 'Not provided'}</span>
      </li>

      <div class="">
        <h3>Response messages</h3>
        <table>
          <thead>
            <tr>
              <th>HTTP Status Code</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            ${getStatus()}
          </tbody>
        </table>
      </div>

    </div>
  `
    : `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; background: linear-gradient(to right, #a1c4fd, #c2e9fb); font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; text-align: center;">
      <h1 style="font-size: 8rem; margin: 0; color: #888;">404</h1>
      <h2 style="font-size: 2rem; color: #444; margin: 10px 0;">Oops! This endpoint wandered off.</h2>
      <p style="font-size: 1rem; color: #555; max-width: 400px; margin-bottom: 30px;">
        Looks like the API route you are trying to visualize does not exist or is not mapped in Express. Try refreshing or double-checking your endpoints.
      </p>
      <div style="display: flex; gap: 10px;">
        <button onclick="location.hash='/'" style="padding: 10px 20px; font-size: 1rem; border: none; border-radius: 8px; background-color: #4f9deb; color: white; cursor: pointer;">Return Home</button>
        <button onclick="window.open('https://github.com/theCalculatar/restViz/issues/new', '_blank')" style="padding: 10px 20px; font-size: 14px; background-color: #e0e0e0; color: #333; border: none; border-radius: 6px; cursor: pointer;">Report Issue</button>
      </div>
    </div>`
}
