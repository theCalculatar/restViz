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
  <div class="no-content">
    <div><a class="method post" href="#/">Back </a><p>Nothing to see here. 404!</p></div>
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

// Function to copy response table content to clipboard
function copyResponseTable() {
  let responseText = `Response Messages for ${currentRoute.method.toUpperCase()} ${currentRoute.path}\n\n`
  responseText += 'HTTP Status Code | Reason\n'
  responseText += '-----------------|-------\n'

  for (const statusCode in currentRoute?.responses) {
    responseText += `${statusCode} | ${currentRoute?.responses[statusCode]}\n`
  }

  navigator.clipboard.writeText(responseText).then(() => {
    // Show success feedback
    const copyBtn = document.getElementById('copy-response-btn')
    const originalText = copyBtn.textContent
    copyBtn.textContent = 'Copied!'
    copyBtn.classList.add('copied')

    setTimeout(() => {
      copyBtn.textContent = originalText
      copyBtn.classList.remove('copied')
    }, 2000)
  }).catch(err => {
    console.error('Failed to copy: ', err)
    // Fallback for older browsers
    const textArea = document.createElement('textarea')
    textArea.value = responseText
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    document.body.removeChild(textArea)

    // Show success feedback
    const copyBtn = document.getElementById('copy-response-btn')
    const originalText = copyBtn.textContent
    copyBtn.textContent = 'Copied!'
    copyBtn.classList.add('copied')

    setTimeout(() => {
      copyBtn.textContent = originalText
      copyBtn.classList.remove('copied')
    }, 2000)
  })
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

      <div class="response-section">
        <div class="response-header">
          <h3>Response messages</h3>
          <button id="copy-response-btn" class="btn copy-btn" onclick="copyResponseTable()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 15H4C2.89543 15 2 14.1046 2 13V4C2 2.89543 2.89543 2 4 2H13C14.1046 2 15 2.89543 15 4V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Copy
          </button>
        </div>
        <table id="response-table">
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
    : `<div style="display:flex,justify-content: space-between; align-items: center;">
        <a class="method post" href="#/">Back </a>
        <p>Nothing to see here. 404!</p>
      </div>`
}
