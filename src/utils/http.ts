import axios, { AxiosResponse, type AxiosInstance } from 'axios'
import { refreshToken } from './common'

class Http {
  private instance: AxiosInstance
  private refreshTokenRequest: string | null | boolean | AxiosResponse
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4000/api/',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    this.refreshTokenRequest = null
    this.instance.interceptors.request.use(
      (config) => {
        const access_token = localStorage.getItem('access_token')
        if (access_token) {
          config.headers.Authorization = 'Bearer ' + access_token
        }
        return config
      },
      (err) => Promise.reject(err)
    )

    this.instance.interceptors.response.use(
      (config) => {
        return config.data
      },
      async (err) => {
        if (err.response) {
          if (err.response.status === 401 && err.response.data.message === 'Jwt expired') {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : await refreshToken()
                  .then(async ({ access_token, refresh_token }) => {
                    localStorage.setItem('refresh_token', refresh_token)
                    localStorage.setItem('access_token', access_token)
                    err.response.config.headers.Authorization = 'Bearer ' + access_token
                    if (err.response.config.headers['Content-Type'] === 'multipart/form-data') {
                      err.response.config.headers['Content-Type'] = 'multipart/form-data'
                    }
                    if (err.response.config.data.includes('refresh_token')) {
                      err.response.config.data = {
                        refresh_token
                      }
                    }
                    return this.instance(err.response.config) // goi lai api vua moi error jwt expired
                  })
                  .catch((refreshTokenErr) => {
                    throw refreshTokenErr
                  })
                  .finally(() => {
                    this.refreshTokenRequest = null
                  })
          }
        }

        return Promise.reject(err)
      }
    )
  }

  getInstance(): AxiosInstance {
    return this.instance
  }
}

const http = new Http().getInstance()

export default http
