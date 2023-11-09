import { useState } from 'react'
import useQueryParams from 'src/useQueryParams'
import http from 'src/utils/http'

export default function ResetPassword() {
  const { token } = useQueryParams()
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [message, setMessage] = useState<string>('')
  const handleResetPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    http
      .post('users/reset-password', { forgot_password_token: token, password, confirm_password: confirmPassword })
      .then(() => {
        setMessage('Thay đổi mật khẩu thành công')
      })
      .catch((err) => {
        console.log(err)
        setMessage('Có lổi khi thay đổi')
      })
  }
  return (
    <>
      <h1>{message}</h1>
      <form className='text-center' onSubmit={handleResetPassword}>
        <div className='mb-6 text-center'>
          <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900 '>
            password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            id='password'
            className='bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='name@flowbite.com'
            required
          />
        </div>
        <div className='mb-6'>
          <label htmlFor='confirm-password' className='block mb-2 text-sm font-medium text-gray-900 '>
            Confirm password
          </label>
          <input
            onChange={(event) => setConfirmPassword(event.target.value)}
            type='password'
            id='confirm-password'
            className='bg-gray-50 m-auto border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
          />
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </>
  )
}
