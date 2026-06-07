import 'preact/debug'
import App from './App.jsx'
import { render } from 'preact'
import './globals.css'
import '@radix-ui/themes/styles.css' //to be removed and add single files
import { Provider } from './context'
// import '@radix-ui/themes/layout/tokens.css'
// import '@radix-ui/themes/layout/components.css'
// import '@radix-ui/themes/layout/utilities.css'
// console.log()
render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')
)
