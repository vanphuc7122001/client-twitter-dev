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

export const getUserIdFromAccessToken = (access_token: string): string => {
  const payload = access_token.split('.')[1]
  const decode = atob(payload)
  return JSON.parse(decode).user_id
}
