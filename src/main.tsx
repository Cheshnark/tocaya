import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App/App'
import './index.css'

import { AuthContextProvider } from './components/context/AuthContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>,
)
