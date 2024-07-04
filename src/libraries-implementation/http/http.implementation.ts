import axios, { AxiosRequestConfig } from 'axios'
import IHttpClient from './http.interface'
import Storage from '../storage'

class HttpClient implements IHttpClient {
  private axios: typeof axios
  static instance: HttpClient
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new HttpClient()
    }
    return this.instance
  }

  constructor() {
    this.axios = axios

    axios.interceptors.request.use(async (requestConfig) => {
      requestConfig.baseURL = 'https://api.app.usmp.pappstest.com/api/v1'
      // const getToken = await Storage.getInstance().get('token')
      const getToken = Storage.getInstance().getFast('token')

      if (getToken) {
        requestConfig.headers.Authorization = `Bearer ${getToken}`
      }

      // TODO: add authentication

      return requestConfig
    })

    this.axios.interceptors.response.use(undefined, (err) => {
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          // TODO: logout
        }
      }

      return Promise.reject(err)
    })
  }

  public get<ResponseType>(url: string, config?: AxiosRequestConfig) {
    return this.axios
      .get<ResponseType>(url, config)
      .then((response) => response.data)
  }

  public post<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig,
  ) {
    return this.axios
      .post<ResponseType>(url, data, config)
      .then((response) => response.data)
  }

  public patch<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig,
  ) {
    return this.axios
      .patch<ResponseType>(url, data, config)
      .then((response) => response.data)
  }

  public put<DataType, ResponseType>(
    url: string,
    data?: DataType,
    config?: AxiosRequestConfig,
  ) {
    return this.axios
      .put<ResponseType>(url, data, config)
      .then((response) => response.data)
  }

  public delete<ResponseType>(url: string, config?: AxiosRequestConfig) {
    return this.axios
      .delete<ResponseType>(url, config)
      .then((response) => response.data)
  }
}

export default HttpClient
