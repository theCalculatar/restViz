import App from './App.jsx'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Theme } from '@radix-ui/themes'
import './globals.css'
import '@radix-ui/themes/styles.css' //to be removed and add single files
// import '@radix-ui/themes/layout/tokens.css'
// import '@radix-ui/themes/layout/components.css'
// import '@radix-ui/themes/layout/utilities.css'

createRoot(document.getElementById('app')).render(
  <StrictMode>
    <Theme appearance="dark" accentColor="blue" radius="small" scaling="95%">
      <App />
    </Theme>
  </StrictMode>
)
