export interface IAccesoriosResponse {
  data: IAccesoriosResponseData[]
  success: boolean
  message: string
}

export interface IAccesoriosResponseData {
  id: number
  name: string
  description: string
}
