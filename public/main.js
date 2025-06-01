/*!
 * restViz - A custom API documentation middleware
 * Copyright (c) 2025 Mahlane Alpheus Mabetlela
 * Licensed under the MIT License (MIT)
 */

const app = document.querySelector('#app')

const myData = JSON.parse(window.__routes__) // finally a better way to parse data :) why didnt I think of it sooner??

let currentRoute = {}

function routeChecker(path) {
  let __path = path + '*()'

  currentRoute = myData.find((route) => {
    const absolutePath = __path
      .replace('/ge*()', '')
      .replace('/de*()', '')
      .replace('/pa*()', '')
      .replace('/po*()', '')
      .replace('/pu*()', '')

    const isMethodMatching =
      route.method.substring(0, 2).toLowerCase() === path.split('/').at(-1)

    if (route.path === absolutePath && isMethodMatching) {
      return route
    }
  })
  if (currentRoute) {
    renderRoutePage()
    return
  }
  renderNotFoundPage()
}

function jsonFomatter(json) {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2) // pretty-print
  }

  // Escape HTML characters
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  // Highlight JSON syntax
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(?:\s*:)?|\b(true|false|null)\b|[-+]?\d+(\.\d+)?([eE][-+]?\d+)?)/g,
    (match) => {
      let cls = 'number'
      if (/^"/.test(match)) {
        cls = /:$/.test(match) ? 'key' : 'string'
      } else if (/true|false/.test(match)) {
        cls = 'boolean'
      } else if (/null/.test(match)) {
        cls = 'null'
      }
      return `<span class="json-${cls}">${match}</span>`
    }
  )
}

function clearAllHeadersFn() {
  localStorage.setItem('__headers__', '')
  renderHeadersPage()
}

function headerLoaderFn() {
  const headers = localStorage.getItem('__headers__')

  if (!headers || headers === '{}') {
    return '<pre>No saved Headers!</pre>'
  }

  let headerRow = ''
  const objHeaders = JSON.parse(headers)

  for (const header in objHeaders) {
    headerRow += `<tr>
                    <td>${header}</td>
                    <td>${objHeaders[header]}</td>
                    <td><div class="btn action" onclick="deleteHeaderFn('${header}')"></div></td>
                  </tr>`
  }

  return `<table class="header-table">
            <thead>
              <tr>
                <th>Keys</th>
                <th>Values</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${headerRow}
            </tbody>
          </table>`
}

function addHeaderFn() {
  const key = document.querySelector('#key')
  const value = document.querySelector('#value')

  if (!key?.value.trim() || !value?.value.trim()) {
    alert('Enter correct header!')
    return
  }

  const headers = localStorage.getItem('__headers__')
  if (!headers) {
    const header = new Map()
    header.set(key.value, value.value)

    localStorage.setItem(
      '__headers__',
      JSON.stringify(Object.fromEntries(header))
    )
    renderHeadersPage()
    return
  }
  const mapHeader = new Map(Object.entries(JSON.parse(headers)))

  mapHeader.set(key.value, value.value)
  localStorage.setItem(
    '__headers__',
    JSON.stringify(Object.fromEntries(mapHeader))
  )
  renderHeadersPage()
}

function deleteHeaderFn(key) {
  const headers = localStorage.getItem('__headers__')
  if (!headers) {
    renderHeadersPage()
    return
  }
  const mapHeader = new Map(Object.entries(JSON.parse(headers)))

  mapHeader.delete(key)
  localStorage.setItem(
    '__headers__',
    JSON.stringify(Object.fromEntries(mapHeader))
  )
  renderHeadersPage()
}

/////////////////////////////////////<- HTTP API CALL ->///////////////////////////////////

async function apiCall() {
  const __response = {
    status: 200,
    statusText: '',
    timeout: 0,
    timestamp: Date.now(),
  }

  //fetch headers
  const headers = localStorage.getItem('__headers__') || '{}'

  const __headers = JSON.parse(headers)

  const startTime = performance.now()

  const response = await fetch(getPath(), {
    method: currentRoute.method,
    body: JSON.stringify(currentRoute?.body),
    headers: { 'CONTENT-TYPE': 'application/json', ...__headers },
  })

  let endTime = performance.now()
  __response.status = response.status
  __response.timeout = endTime - startTime
  __response.statusText = response.statusText

  try {
    if (response.status === 204) {
      resultsFn({ data: {}, ...__response })
      return
    }
    const data = await response.json()

    resultsFn({ data, ...__response })
  } catch (error) {
    if (response.status === 404 && error.message.includes('is not valid JSON')) {
      resultsFn(null, 'Route not found. Please check the path on server and try again.')
      return
    }
    resultsFn(null, error)
  }
}

function getParamsFn() {
  const paths = currentRoute.path.split('/')
  return paths.filter((path) => path.startsWith(':'))
}

function paramsLoaderFn() {
  return getParamsFn()
    .map((param) => {
      return `<input id="${param}" placeholder="Enter ${param.replace(
        ':',
        ''
      )} param"/>`
    })
    .join('')
}

function getPath() {
  return currentRoute.path
    .split('/')
    .map((param) => {
      if (param.startsWith(':')) {
        const paramValue = document.getElementById(`${param}`)?.value.trim()
        return paramValue ? paramValue : param
      }
      return param
    })
    .join('/')
}

function resultsFn(data, err) {
  const statusColor = Math.floor(data?.status / 100) * 100;

  document.querySelector('.api-block').innerHTML = `
    <div class="api-response blink-border ${err ? 'error' : 'success'}">
      <h3>API response: 
        <code class="status code-${statusColor}">
          ${err ? '' : `${data?.status} ${data.statusText} ---> ${data.timeout.toFixed(2)}ms`}
        </code>
      </h3>
      ${
        err
          ? `<pre class="error">${err}</pre>`
          : `<pre id="responseText">\n${jsonFomatter(data.data)}\n</pre>
              <button id="copy-button" class="copy-button">📋 Copy</button>`
      }
    </div>
  `;

  // Attach the copy button click listener if not error
  if (!err) {
    const copyBtn = document.getElementById('copy-button');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        const responseTextElement = document.getElementById('responseText');
        if (!responseTextElement) {
          alert('No response text to copy!');
          return;
        }
        const textToCopy = responseTextElement.innerText || responseTextElement.textContent;
        navigator.clipboard.writeText(textToCopy)
          .then(() => alert('Response copied to clipboard!'))
          .catch((err) => alert('Failed to copy text: ' + err));
      });
    }
  }
}

function copyResponse() {
  const responseTextElement = document.getElementById('responseText');
  const copyBtn = document.getElementById('copy-response-btn');

  if (!responseTextElement) return;

  let rawJson;
  try {
    rawJson = JSON.parse(responseTextElement.textContent);
  } catch (err) {
    console.error("Invalid JSON in responseText:", err);
    return;
  }

  // Build a table-style string
  let tableText = 'HTTP Status Code    Reason\n';
  tableText += '-----------------   ----------------\n';

  for (const [code, reason] of Object.entries(rawJson)) {
    const codeCol = code.padEnd(18, ' ');
    const reasonCol = reason;
    tableText += `${codeCol}${reasonCol}\n`;
  }

  // Copy to clipboard
  navigator.clipboard.writeText(tableText).then(() => {
    const originalText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');

    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.classList.remove('copied');
    }, 2000);
  }).catch((err) => {
    console.error('Copy failed:', err);
  });
}

//////////////////////////////////////<-PAGES->//////////////////////////////////////////////

const routes = {
  '/': renderHomePage,
  '/headers': renderHeadersPage,
}

// Routing function
function router() {
  const path = window.location.hash.slice(1) || '/'

  const render = routes[path] || (() => routeChecker(path))
  render()
}

// Event listeners for route changes
window.addEventListener('hashchange', router)
window.addEventListener('load', router)

// HEADERS PAGE
function renderHeadersPage() {
  const app = document.getElementById('app')
  const routes = document.getElementById('routes')
  app.classList.remove('hide')
  routes.classList.add('hide')
  app.innerHTML = `
    <div class="notes headers">
      <a class="btn" href="#/"></a>
      <h3>Headers</h3>
      <p>Update your Authorization token header or any additional headers you would like to send to send to your api.</p>
      ${headerLoaderFn()}
      <div class="key-form">
        <h3>New key</h3>
        <div class="fields">
          <input id="key" placeholder="Please enter key"/>
          <input id="value" placeholder="Please enter value"/>
          <button class="method get" onclick="addHeaderFn()">Save</button>
        </div>
      </div>
      <p class="clear" onclick="clearAllHeadersFn()">Clear all keys.</p>
    </div>
  `
}

// page being renderd in html file
function renderNotFoundPage() {
  const app = document.getElementById('app')
  const routes = document.getElementById('routes')
  app.classList.remove('hide')
  routes.classList.add('hide')
  app.innerHTML = `
  <div class="no-content">
    <div><a class="method post" href="#/">Back </a><p>Route does not exists blud!!!</p></div>
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

  if (!currentRoute?.responses) {
    return '<pre>Not provided!</pre>'
  }

  for (const statusCode in currentRoute?.responses) {
    const statusColor = Math.floor(statusCode / 100) * 100 // round down to 100hundred
    status += `<tr>
      <td ><code class="status code-${statusColor}">${statusCode}</code></td>
      <td><code>${currentRoute?.responses[statusCode]}</code></td>
    </tr>`
  }

  return `<table>
            <thead>
              <tr>
                <th>HTTP Status Code</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              ${status}
            </tbody>
          </table>`
}

function renderRoutePage() {
  const routes = document.getElementById('routes')
  const app = document.getElementById('app')
  routes.classList.add('hide')
  app.classList.remove('hide')

  app.innerHTML = currentRoute?.path
    ? `
    <div class="">
      <a class="btn" href="#/"></a>

      <div class="notes">
        <h3>Implementation notes</h3>
        <p>${currentRoute?.notes || ''}</p>
      </div>

      <li class="route-item">
        <div>
          <span class="method ${currentRoute.method.toLowerCase()}" style="cursor:pointer" onclick="apiCall()">
            ${currentRoute.method.toUpperCase()}
            <div class="tooltip">
              <p>
                Click to interact with your API live. Make sure to edit the request body for methods like PUT, POST, and PATCH.              
              </p>
            </div>
          </span>
          <span class="path">${currentRoute.path}</span>
        </div>
        <span class="description">${
          currentRoute?.description || 'Not provided'
        }</span>
      </li>
      ${
        currentRoute.method === 'GET' || currentRoute.method === 'DELETE'
          ? ''
          : `
            <div class="reqest-body-preview">
              <h3>Body</h3>
              <pre>${
                currentRoute.body
                  ? jsonFomatter(currentRoute.body)
                  : 'Not provided!'
              } </pre>
            </div>`
      }
      <div class="params">
        ${paramsLoaderFn()}
      </div>
      <div class="api-block"></div>
      <div class="">
        <h3>Response messages</h3>
          ${getStatus()}
      </div>

    </div>
  `
    : `<div style="display:flex,justify-content: space-between; align-items: center;">
        <a class="btn" href="#/"> </a>
        <p>Nothing to see here. 404!</p>
      </div>`
}
const menuBtn = document.querySelector('.menu-btn')
const menuList = document.querySelector('.menu-list')

menuBtn.addEventListener('click', () => {
  menuList.classList.toggle('hide')
})
