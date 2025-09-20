import App from './App.jsx'
import { render } from 'preact'
import { Theme } from '@radix-ui/themes'
import './globals.css'
import '@radix-ui/themes/styles.css' //to be removed and add single files
import { Provider } from './context'
// import '@radix-ui/themes/layout/tokens.css'
// import '@radix-ui/themes/layout/components.css'
// import '@radix-ui/themes/layout/utilities.css'
import 'preact/devtools'

render(
  <Provider>
    <Theme appearance="dark" accentColor="blue" radius="small" scaling="95%">
      <App />
    </Theme>
  </Provider>,
  document.getElementById('app')
)
