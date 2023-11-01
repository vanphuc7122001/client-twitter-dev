import { FcGoogle } from 'react-icons/fc'
import { Link } from 'react-router-dom'

export default function Register() {
  return (
    <div className='w-[400px] min-h-[250px] bg-white mr-[240px] p-8 rounded'>
      <p className='text-xl'>Đăng ký</p>
      <form className='mt-7 text-colorText'>
        <div>
          <input className='border outline-none w-full p-3 h-[40px] text-[14px]' type='text' placeholder='Nhập tên' />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>
        <div className='mt-3'>
          <input className='border outline-none w-full p-3 h-[40px] text-[14px]' type='text' placeholder='Nhập email' />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>
        <div className='mt-3'>
          <input
            className='border outline-none w-full p-3 h-[40px] text-[14px]'
            type='password'
            placeholder='Nhập password'
          />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>
        <div className='mt-3'>
          <input
            className='border outline-none w-full p-3 h-[40px] text-[14px]'
            type='password'
            placeholder='Xác nhận password'
          />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>
        <div className='mt-3'>
          <input
            type='date'
            id='date'
            className='border outline-none w-full p-3 h-[40px] text-[14px]'
            placeholder='ngày sinh'
          />
          <p className='mt-1 text-[12px] min-h-[13px] text-red-600'></p>
        </div>
        <div className='mt-[30px] flex items-center justify-center border rounded p-2 text-[14px] bg-orange text-white font-semibold'>
          <button type='submit'>Đăng ký</button>
        </div>
      </form>
      <div className='my-[30px] flex items-center justify-center gap-2 mx-[1px]'>
        <span className='w-[100%] h-[1px] bg-[#ccc]'></span>
        <span>Hoặc</span>
        <span className='w-[100%] h-[1px] bg-[#ccc]'></span>
      </div>
      <div className='flex items-center justify-center border border-[#ccc] rounded p-2'>
        <FcGoogle className='w-[22px] h-[22px]' />
        <span>Google</span>
      </div>
      <div className='text-[14px] text-colorText mt-[30px] text-center'>
        Bạn đã có tài khoản?{' '}
        <Link to='/login' className='text-red-400'>
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}
