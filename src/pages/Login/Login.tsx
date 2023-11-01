import { Link } from 'react-router-dom'

export default function Login() {
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

        <div className='mt-[30px] flex items-center justify-center border rounded p-2 text-[14px] bg-orange text-white font-semibold'>
          <button type='submit'>Đăng ký</button>
        </div>
      </form>
      <div className='text-[14px] text-colorText mt-[30px] text-center'>
        Bạn chưa có tài khoản?{' '}
        <Link to='/register' className='text-red-400'>
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
