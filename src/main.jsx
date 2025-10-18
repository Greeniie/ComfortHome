import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Loader from './utils/Loader'
import { Suspense, lazy } from 'react'

const App = lazy(() => import('./App.jsx'))

const Loading = () => {
  return (
    <div>
      <Loader />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>,
)
