import { useEffect } from 'react'
import useQueryParams from 'src/useQueryParams'
import http from 'src/utils/http'
import { toast } from 'react-toastify'
import { CanceledError } from 'axios'

interface ResponseVerify {
  message: string
  result?: {
    access_token: string
    refresh_token: string
  }
}

export default function VerifyEmail() {
  const { token } = useQueryParams()
  useEffect(() => {
    const controller = new AbortController()
    if (token) {
      http
        .post<string, ResponseVerify>(
          'users/verify-email',
          { email_verify_token: token },
          {
            signal: controller.signal
          }
        )
        .then((res) => {
          toast.success(res.message, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })

          if (res.result) {
            localStorage.setItem('access_token', res.result.access_token)
            localStorage.setItem('refresh_token', res.result.refresh_token)
          }
        })
        .catch(
          (err: {
            response: {
              data: {
                message: string
              }
            }
          }) => {
            if (!(err instanceof CanceledError)) {
              toast.error(err.response.data.message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light'
              })
            }
          }
        )
    }
    return () => {
      controller.abort()
    }
  }, [token])
  return <div className='flex items-center justify-center h-[100vh]'>VerifyEmail</div>
}
