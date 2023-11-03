import { useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Media from './pages/Media'
import MediaMultiple from './pages/MediaMultiple/MediaMultiple'
import MediaVideo from './pages/MediaVideo'

export default function useRoutesElement() {
  const routesElement = useRoutes([
    {
      path: '/',
      element: <Media />
    },
    {
      path: '/media-images',
      element: <MediaMultiple />
    },
    {
      path: '/media-videos',
      element: <MediaVideo />
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    }
  ])
  return routesElement
}
