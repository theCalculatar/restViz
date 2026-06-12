import 'preact/debug'
import App from './App'
import { render } from 'preact'
import './globals.css'
import '@radix-ui/themes/styles.css'
import { Provider } from '@/context'

render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('app')!
)
