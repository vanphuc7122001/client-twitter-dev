import { useState } from 'react'
import http from 'src/utils/http'

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('Chưa gửi email')
  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    http
      .post('users/forgot-password', { email })
      .then(() => {
        setMessage('Hệ thống đã gửi email')
      })
      .catch(() => {
        setMessage('Email của bạn không đúng')
      })
  }
  return (
    <div className='w-full mx-auto text-center'>
      <h3 className='text-red-700'>{message}</h3>
      <h2>Forgot password</h2>
      <form className='mt-4' onSubmit={handleResetPassword}>
        <input
          className='border border-gray-200 rounded p-2 outline-none'
          type='email'
          placeholder='email to reset password'
          onChange={(event) => setEmail(event.target.value)}
        />
        <br />
        <button className='mt-2 rounded p-2 bg-blue-400 text-white text-sm' type='submit'>
          Forgot password
        </button>
      </form>
    </div>
  )
}
