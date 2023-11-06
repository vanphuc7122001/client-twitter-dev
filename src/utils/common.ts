import http from './http'

type ResData = {
  message: string
  result: {
    access_token: string
    refresh_token: string
  }
}

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token') as string
  const { result } = await http.post<any, ResData>('users/refresh-token', { refresh_token })

  return { ...result }
}
