import { NavLink, Outlet } from 'react-router-dom'
import http from 'src/utils/http'
import { createContext, useMemo } from 'react'

const isActiveLink = ({ isActive }: any) => {
  return {
    color: isActive ? 'blue' : ''
  }
}

interface AuthenType {
  isAuthenticated: string | null
}

export const AuthenticatedContext = createContext<AuthenType>({
  isAuthenticated: null
})

export default function MainLayout() {
  const isAuthenticated = localStorage.getItem('access_token')

  const valueContext = useMemo(() => {
    return { isAuthenticated }
  }, [isAuthenticated])

  // Func to logout system
  const logout = async () => {
    const refresh_token = localStorage.getItem('refresh_token')
    try {
      await http.post('users/logout', { refresh_token })
      // localStorage.clear()
    } catch (error) {
      console.log('error when logging out', error)
    } finally {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      location.reload()
    }
  }
  return (
    <div>
      <nav className='bg-white border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
          <NavLink to='/' className='flex items-center' style={isActiveLink}>
            <img src='https://flowbite.com/docs/images/logo.svg' className='h-8 mr-3' alt='Flowbite Logo' />
            <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Flowbite</span>
          </NavLink>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <li>
                <NavLink
                  to='/home'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  aria-current='page'
                  style={isActiveLink}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to='/media'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                  style={isActiveLink}
                >
                  Media
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={isActiveLink}
                  to='/media-images'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                >
                  Media images
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={isActiveLink}
                  to='/media-videos'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                >
                  Media videos
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={isActiveLink}
                  to='/forgot-password'
                  className='block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'
                >
                  Forgot password
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div>
        <AuthenticatedContext.Provider value={valueContext}>
          <Outlet />
        </AuthenticatedContext.Provider>
      </div>
      {isAuthenticated && (
        <button
          type='button'
          onClick={logout}
          className='m-4 inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none '
        >
          Logout
        </button>
      )}
      {isAuthenticated ? <div>You are login</div> : <div>You are logout</div>}
    </div>
  )
}
