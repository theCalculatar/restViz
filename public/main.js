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
  app.innerHTML = `<div>Not found 404!</div>`
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

  app.innerHTML = `
    <div class="">
      <div class="notes">
        <h3>Implementation notes</h3>
        <p>${currentRoute?.notes || ''}</p>
      </div>

      <li class="route-item">
        <span class="method ${currentRoute.method.toLowerCase()} ">
          ${currentRoute.method.toUpperCase()}</span
        >
        <span class="path">${currentRoute.path}</span>
        <span class="">${currentRoute?.description || 'Not provieded'}</span>
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
}
