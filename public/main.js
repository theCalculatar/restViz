const app = document.querySelector('#app')
console.log(dataV)
// Route mapping
const routes = {
  '/': renderHomePage,
  '/home': renderMarshallPage,
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
  routes.classList.add('hide')
  app.innerHTML = `<div>Not found 404!</div>`
}

function renderHomePage() {
  const routes = document.getElementById('routes')
  const app = document.getElementById('app')
  routes.classList.remove('hide')
  app.innerHTML = ``
}

function renderMarshallPage() {
  const routes = document.getElementById('routes')
  const app = document.getElementById('app')
  routes.classList.add('hide')
  app.innerHTML = ``
  app.innerHTML = `
    <div class="w-screen justify-between items-center gap-2 px-4 py-2 md:px-10">
      <input placeholder="this is an input"/>
      <a href="#/">route</a>
      <button
        class="bg-slate-500 text-white active:bg-slate-600 font-bold text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
      >
        Search
      </button>
    </div>
  `
}
