import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'

export default function Home() {
  const navigate = useNavigate()
  const [query] = useSearchParams()
  const access_token = query.get('access_token')
  const refresh_token = query.get('refresh_token')
  const newUser = query.get('new_user')
  useEffect(() => {
    if (newUser) {
      localStorage.setItem('access_token', access_token as string)
      localStorage.setItem('refresh_token', refresh_token as string)
      navigate('/home')
    }
  }, [newUser, access_token, refresh_token, navigate])

  return (
    <div>
      <Link
        to='/login'
        className='m-4 inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2  focus:outline-none '
      >
        Login With Google
      </Link>
    </div>
  )
}
