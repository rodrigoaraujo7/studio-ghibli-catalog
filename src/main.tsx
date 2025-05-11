import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { FilmProvider } from './context/FilmContext.tsx'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilmProvider>
      <App />
    </FilmProvider>
  </StrictMode>,
)
