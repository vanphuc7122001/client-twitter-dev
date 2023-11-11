import { useRoutes } from 'react-router-dom'
import RegisterLayout from './layouts/RegisterLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Media from './pages/Media'
import MediaMultiple from './pages/MediaMultiple/MediaMultiple'
import MediaVideo from './pages/MediaVideo'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import VerifyEmail from './pages/VerifyEmail'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword/ResetPassword'
import Chat from './pages/Chat'

export default function useRoutesElement() {
  const routesElement = useRoutes([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'media',
          element: <Media />
        },
        {
          path: 'media-images',
          element: <MediaMultiple />
        },
        {
          path: 'media-videos',
          element: <MediaVideo />
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />
        },
        {
          path: 'reset-password',
          element: <ResetPassword />
        },
        {
          path: 'chat',
          element: <Chat />
        }
      ]
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
    },
    {
      path: '/verify-email',
      element: <VerifyEmail />
    }
  ])
  return routesElement
}
