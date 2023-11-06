import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'
const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_REDIRECT_URL } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_REDIRECT_URL,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    ),
    prompt: 'consent'
  }

  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}

const googleOauthUrl = getGoogleAuthUrl()

export default function Login() {
  return (
    <div className='w-[400px] min-h-[250px] bg-white mr-[240px] p-8 rounded'>
      <p className='text-xl'>Đăng nhập</p>
      <form className='mt-7 text-colorText'>
        <div>
          <input className='border outline-none w-full p-3 h-[40px] text-[14px]' type='text' placeholder='Nhập tên' />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>
        <div className='mt-3'>
          <input className='border outline-none w-full p-3 h-[40px] text-[14px]' type='text' placeholder='Nhập email' />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>

        <div className='mt-[30px] flex items-center justify-center border rounded p-2 text-[14px] bg-orange text-white font-semibold'>
          <Link to={googleOauthUrl}>Đăng nhập</Link>
        </div>
      </form>
      <div className='my-[30px] flex items-center justify-center gap-2 mx-[1px]'>
        <span className='w-[100%] h-[1px] bg-[#ccc]'></span>
        <span>Hoặc</span>
        <span className='w-[100%] h-[1px] bg-[#ccc]'></span>
      </div>
      <Link to={googleOauthUrl} className='flex items-center justify-center border border-[#ccc] rounded p-2'>
        <FcGoogle className='w-[22px] h-[22px]' />
        <span>Google</span>
      </Link>
      <div className='text-[14px] text-colorText mt-[30px] text-center'>
        Bạn chưa có tài khoản?{' '}
        <Link to='/register' className='text-red-400'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
