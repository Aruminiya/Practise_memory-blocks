import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { LevelProvider } from './context/LeaverProvider.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LevelProvider>
      <App />
    </LevelProvider>
  </StrictMode>,
)
