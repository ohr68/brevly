import { createBrowserRouter } from 'react-router-dom'
import { Home } from './pages'
import { NotFound } from './pages/not-found'
import { Redirect } from './pages/redirect'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/:url-encurtada',
    element: <Redirect />
  },
  {
    path: '*',
    element: <NotFound />
  }
])
